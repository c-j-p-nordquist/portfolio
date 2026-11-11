<script>
	const TOOLS = [
		{
			id: 'portfolio',
			label: '01 · portfolio()',
			kind: 'Read-only context',
			call: `mcp.call("portfolio", {
  include_positions: true,
  include_risk_metrics: true
})`,
			checks: [
				{ ok: true, label: 'Read-only tool — no mutation possible' },
				{ ok: true, label: 'Aggregates account cash, exposure & open legs' }
			],
			responseDemo: `{
  "mode": "demo",
  "net_liquidation": "$125,400.00",
  "buying_power": "$84,200.00",
  "open_positions": 4,
  "portfolio_beta_spy": 0.68
}`,
			responseLive: `{
  "mode": "live_read",
  "net_liquidation": "$125,400.00",
  "buying_power": "$84,200.00",
  "open_positions": 4,
  "portfolio_beta_spy": 0.68
}`,
			gateNote: 'No approval needed: read-only snapshot.'
		},
		{
			id: 'position_size',
			label: '02 · position_size()',
			kind: 'Advisory calculation',
			call: `mcp.call("position_size", {
  symbol: "MSFT",
  entry_price: 422.50,
  stop_price: 408.00,
  max_account_risk_pct: 0.75
})`,
			checks: [
				{ ok: true, label: 'Enforces explicit stop distance before sizing' },
				{ ok: true, label: 'Caps single-position notional & account risk %' }
			],
			responseDemo: `{
  "recommended_shares": 64,
  "notional_value": "$27,040.00",
  "max_loss_at_stop": "$928.00 (0.74% NLV)",
  "status": "advisory_only"
}`,
			responseLive: `{
  "recommended_shares": 64,
  "notional_value": "$27,040.00",
  "max_loss_at_stop": "$928.00 (0.74% NLV)",
  "status": "advisory_only"
}`,
			gateNote: 'Pure calculation: returns sizing bounds without touching IBKR orders.'
		},
		{
			id: 'submit_order',
			label: '03 · submit_order()',
			kind: 'Guarded mutation',
			call: `mcp.call("submit_order", {
  symbol: "MSFT",
  side: "BUY",
  qty: 64,
  limit_price: 422.50,
  stop_loss: 408.00,
  take_profit: 451.00
})`,
			checks: [
				{ ok: true, label: 'Bracket legs (stop_loss + take_profit) validated' },
				{ ok: true, label: 'Appended to local SQLite audit log (row #042)' },
				{ ok: true, label: 'Dry-run preview returned before any wire transmit' }
			],
			responseDemo: `{
  "mode": "demo_dry_run",
  "transmitted": false,
  "audit_id": "audit_20260507_042",
  "preview": "BUY 64 MSFT @ 422.50 LMT (SL 408.00 / TP 451.00)",
  "estimated_commission": "$1.00"
}`,
			responseLive: `{
  "mode": "live_staged",
  "transmitted": false,
  "audit_id": "audit_20260507_042",
  "requires_human_confirmation": true,
  "prompt": "Approve staging BUY 64 MSFT bracket in TWS?"
}`,
			gateNote: 'Even in live mode, agent calls stage a preview behind human confirmation.'
		}
	];

	let activeIdx = $state(2);
	let mode = $state('demo'); // 'demo' | 'live'
	let active = $derived(TOOLS[activeIdx]);
</script>

<div class="mcp-specimen" role="region" aria-label="Interactive MCP tool boundary inspector">
	<div class="mcp-header">
		<div>
			<p class="eyebrow">
				Try it <span aria-hidden="true">/</span> Tool boundary &amp; dry-run gate
			</p>
			<p class="mcp-sub">
				Compare how the 12-tool surface handles read context, risk sizing, and order submission.
			</p>
		</div>
		<div class="mode-switch" role="group" aria-label="Broker mode">
			<button
				type="button"
				class="mode-btn"
				class:active={mode === 'demo'}
				onclick={() => (mode = 'demo')}
			>
				MODE=demo
			</button>
			<button
				type="button"
				class="mode-btn"
				class:active={mode === 'live'}
				onclick={() => (mode = 'live')}
			>
				MODE=live
			</button>
		</div>
	</div>

	<div class="tool-tabs">
		{#each TOOLS as t, idx}
			<button
				type="button"
				class="tool-tab"
				class:active={activeIdx === idx}
				onclick={() => (activeIdx = idx)}
			>
				<span class="tool-name">{t.label}</span>
				<span class="tool-kind">{t.kind}</span>
			</button>
		{/each}
	</div>

	<div class="mcp-grid">
		<div class="mcp-pane">
			<p class="eyebrow pane-label">1. Agent tool call</p>
			<pre class="mcp-code"><code>{active.call}</code></pre>
			<div class="checks-box">
				<p class="eyebrow pane-label">2. Server boundary checks</p>
				<ul class="check-list">
					{#each active.checks as c}
						<li><span class="check-mark" aria-hidden="true">✓</span> {c.label}</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mcp-pane">
			<p class="eyebrow pane-label">
				3. Returned payload ({mode === 'demo' ? 'Synthetic demo feed' : 'Live human-gated'})
			</p>
			<pre class="mcp-code"><code
					>{mode === 'demo' ? active.responseDemo : active.responseLive}</code
				></pre>
			<p class="gate-banner">
				<span class="gate-dot" class:live={mode === 'live'} aria-hidden="true"></span>
				{active.gateNote}
			</p>
		</div>
	</div>
</div>

<style>
	.mcp-specimen {
		margin-block: 2.2em;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: var(--panel);
		overflow: hidden;
	}
	.mcp-header {
		padding: 18px 20px;
		border-bottom: 1px solid var(--line);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
	}
	.mcp-sub {
		font-size: 14px;
		color: var(--muted);
		margin-top: 2px !important;
	}
	.mode-switch {
		display: inline-flex;
		border: 1px solid var(--line);
		border-radius: 4px;
		overflow: hidden;
		background: var(--paper);
	}
	.mode-btn {
		font:
			11px/1 'Geist Mono',
			ui-monospace,
			monospace;
		padding: 8px 11px;
		border: 0;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
	}
	.mode-btn.active {
		background: var(--blue);
		color: #fff;
	}
	.tool-tabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-bottom: 1px solid var(--line);
		background: var(--paper);
	}
	.tool-tab {
		padding: 12px 16px;
		border: 0;
		border-right: 1px solid var(--line);
		background: transparent;
		color: var(--ink);
		text-align: left;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 3px;
		transition: background 0.15s;
	}
	.tool-tab:last-child {
		border-right: 0;
	}
	.tool-tab:hover {
		background: color-mix(in srgb, var(--panel) 60%, transparent);
	}
	.tool-tab.active {
		background: color-mix(in srgb, var(--blue) 10%, var(--paper));
		box-shadow: inset 0 -2px 0 var(--blue);
	}
	.tool-name {
		font:
			500 13px/1.3 'Geist Mono',
			ui-monospace,
			monospace;
	}
	.tool-kind {
		font-size: 12px;
		color: var(--muted);
	}
	.mcp-grid {
		padding: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
	.mcp-pane {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}
	.pane-label {
		font-size: 10px;
	}
	.mcp-code {
		margin: 0 !important;
		padding: 14px 16px !important;
		border-radius: 4px !important;
		border: 1px solid var(--line);
		background: var(--paper) !important;
		color: var(--ink) !important;
		font:
			12.5px/1.55 'Geist Mono',
			ui-monospace,
			monospace !important;
		overflow-x: auto;
	}
	.checks-box {
		margin-top: 4px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.check-list {
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 13.5px;
		line-height: 1.5;
	}
	.check-list li {
		padding-left: 0 !important;
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.check-list li::before {
		content: none !important;
	}
	.check-list li + li {
		margin-top: 6px;
	}
	.check-mark {
		color: var(--blue);
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-weight: 600;
	}
	.gate-banner {
		margin: 4px 0 0 !important;
		padding: 10px 12px;
		border-radius: 4px;
		border: 1px solid var(--line);
		background: var(--paper);
		font-size: 13px !important;
		line-height: 1.45 !important;
		color: var(--muted);
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.gate-dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--blue);
		flex-shrink: 0;
	}
	.gate-dot.live {
		background: #d96b43;
	}
	@media (max-width: 720px) {
		.tool-tabs {
			grid-template-columns: 1fr;
		}
		.tool-tab {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}
		.mcp-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
