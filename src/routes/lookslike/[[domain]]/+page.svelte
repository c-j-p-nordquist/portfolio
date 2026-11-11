<script>
	import { page } from '$app/stores';
	import { SITE_URL, OG_IMAGE, NAME } from '$lib/site.js';
	import { TECHNIQUES, generate, parseDomain } from '$lib/lookalike/variants.js';
	import {
		check,
		query,
		level,
		isFinding,
		toCsv,
		LEVEL_TEXT,
		LEVEL_ORDER
	} from '$lib/lookalike/dns.js';

	const title = 'Lookalike domain scanner';
	const description =
		'Find registered typo and homoglyph variants of your domain, and which of them are set up for email. Runs in your browser over DNS-over-HTTPS, or from a terminal with curl.';
	const host = SITE_URL.replace(/^https?:\/\//, '');

	// /lookslike/example.se, /lookslike?domain=example.se and /lookslike?example.se all prefill.
	function preset(url, params) {
		if (params.domain) return params.domain;
		const named = url.searchParams.get('domain');
		if (named) return named;
		for (const [key, value] of url.searchParams) if (value === '' && key.includes('.')) return key;
		return '';
	}

	let input = $state(preset($page.url, $page.params));
	let provider = $state('cf');
	let enabled = $state(Object.fromEntries(TECHNIQUES.map((t) => [t.id, t.on])));
	let showAll = $state(false);
	let error = $state('');
	let rows = $state([]);
	let running = $state(false);
	let scanned = $state(false);
	let target = $state('');
	let copyLabel = $state('Copy as CSV');
	let stop = false;

	let enabledIds = $derived(new Set(TECHNIQUES.filter((t) => enabled[t.id]).map((t) => t.id)));
	let parsed = $derived(parseDomain(input));
	let estimate = $derived(parsed.error ? 0 : generate(parsed, enabledIds).length);
	let curlTarget = $derived(parsed.error ? 'example.se' : parsed.ascii);

	let finished = $derived(rows.filter((v) => v.status !== 'pending'));
	let counts = $derived({
		registered: rows.filter((v) => v.status === 'registered' || v.status === 'broken').length,
		web: rows.filter((v) => v.a.length).length,
		mail: rows.filter((v) => v.mx.length).length
	});
	let exportable = $derived(rows.filter((v) => (showAll ? v.status !== 'pending' : isFinding(v))));
	let visible = $derived(
		[...exportable].sort(
			(x, y) =>
				LEVEL_ORDER.indexOf(level(x)) - LEVEL_ORDER.indexOf(level(y)) ||
				x.ascii.localeCompare(y.ascii)
		)
	);

	const short = (list) =>
		list.slice(0, 2).join(', ') + (list.length > 2 ? ` +${list.length - 2}` : '');

	async function scan(event) {
		event.preventDefault();
		if (running) return;
		error = '';
		if (parsed.error) return void (error = parsed.error);
		if (!enabledIds.size) return void (error = 'Pick at least one technique.');

		const chosen = provider;
		const domain = parsed;
		running = true;
		stop = false;
		try {
			await query(chosen, domain.ascii, 'NS');
		} catch {
			error =
				'Could not reach a DNS resolver. A browser extension, VPN or company network may be blocking DNS-over-HTTPS.';
			running = false;
			return;
		}

		rows = generate(domain, enabledIds);
		target = domain.domain;
		scanned = true;
		let next = 0;
		const worker = async () => {
			while (!stop && next < rows.length) await check(chosen, rows[next++]);
		};
		await Promise.all(Array.from({ length: 8 }, worker));
		if (stop) rows = rows.filter((v) => v.status !== 'pending');
		running = false;
	}

	async function copyCsv() {
		try {
			await navigator.clipboard.writeText(toCsv(exportable));
			copyLabel = 'Copied';
		} catch {
			copyLabel = 'Copy blocked';
		}
		setTimeout(() => (copyLabel = 'Copy as CSV'), 1500);
	}

	function downloadCsv() {
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([toCsv(exportable)], { type: 'text/csv' }));
		a.download = `lookalikes-${target}.csv`;
		a.click();
		URL.revokeObjectURL(a.href);
	}
</script>

<svelte:head>
	<title>{title} · {NAME}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{SITE_URL}/lookslike" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{SITE_URL}/lookslike" />
	<meta property="og:image" content={OG_IMAGE} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="site-container lookslike">
	<header class="ll-hero fade-up">
		<p class="eyebrow">
			Tool <span aria-hidden="true">/</span> DNS <span aria-hidden="true">/</span> Phishing defence
		</p>
		<h1>Who else looks<br /><span class="accent">like your domain?</span></h1>
		<p class="ll-lede">
			Enter a domain to see which typo and lookalike versions of it are already registered, and
			which of those can send or receive email. The scan runs in your browser; the only requests go
			to a public DNS resolver.
		</p>
	</header>

	<form class="ll-form" onsubmit={scan} novalidate>
		<div class="ll-row">
			<label class="ll-field">
				<span class="eyebrow">Domain or email address</span>
				<input
					type="text"
					bind:value={input}
					placeholder="example.se"
					autocomplete="off"
					autocapitalize="none"
					spellcheck="false"
				/>
			</label>
			<select bind:value={provider} aria-label="DNS resolver">
				<option value="cf">Cloudflare DNS</option>
				<option value="google">Google DNS</option>
			</select>
			{#if running}
				<button type="button" class="button secondary" onclick={() => (stop = true)}>Stop</button>
			{:else}
				<button type="submit" class="button primary">Scan <span aria-hidden="true">→</span></button>
			{/if}
		</div>
		<p class="ll-error" role="alert">{error}</p>

		<fieldset>
			<legend class="eyebrow">
				Techniques to check{#if estimate}<span aria-hidden="true">/</span>{estimate} variants{/if}
			</legend>
			<div class="ll-chips">
				{#each TECHNIQUES as t}
					<label class="ll-chip">
						<input type="checkbox" bind:checked={enabled[t.id]} />
						<span>{t.label}</span>
					</label>
				{/each}
			</div>
		</fieldset>
	</form>

	{#if scanned}
		<section class="ll-results" aria-label="Scan results">
			<dl class="ll-counts">
				<div>
					<dt class="eyebrow">Variants checked</dt>
					<dd>
						{finished.length}{#if running}<small>/{rows.length}</small>{/if}
					</dd>
				</div>
				<div>
					<dt class="eyebrow">Registered</dt>
					<dd>{counts.registered}</dd>
				</div>
				<div>
					<dt class="eyebrow">Point to a server</dt>
					<dd class="web">{counts.web}</dd>
				</div>
				<div>
					<dt class="eyebrow">Set up for email</dt>
					<dd class="mail">{counts.mail}</dd>
				</div>
			</dl>
			<div class="ll-bar" aria-hidden="true">
				<i style:width="{rows.length ? (100 * finished.length) / rows.length : 0}%"></i>
			</div>

			<div class="ll-toolbar">
				<label
					><input type="checkbox" bind:checked={showAll} /> Show unregistered variants too</label
				>
				<div>
					<button type="button" class="card-pill" onclick={copyCsv}>{copyLabel}</button>
					<button type="button" class="card-pill" onclick={downloadCsv}>Download CSV</button>
				</div>
			</div>

			<div class="ll-table">
				{#if visible.length}
					<table>
						<thead>
							<tr>
								<th>Domain</th><th>Status</th><th>Technique</th><th>IP address</th><th
									>Mail server</th
								>
							</tr>
						</thead>
						<tbody>
							{#each visible as v (v.ascii)}
								{@const lv = level(v)}
								<tr class="lvl-{lv}">
									<td class="dom">
										{v.domain}{#if v.ascii !== v.domain}<small>{v.ascii}</small>{/if}
									</td>
									<td><span class="ll-pill {lv}">{LEVEL_TEXT[lv]}</span></td>
									<td class="tech">{v.technique}</td>
									<td class="rec">{short(v.a)}</td>
									<td class="rec">{short(v.mx)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p class="ll-empty">
						{running
							? `Checking ${rows.length} variants of ${target}…`
							: `None of the ${rows.length} variants of ${target} are registered.`}
					</p>
				{/if}
			</div>

			<div class="ll-legend">
				<p>
					<span class="ll-pill mail">Email ready</span> has MX records, so it can send and receive mail
					as that name
				</p>
				<p><span class="ll-pill web">Live</span> points to a server</p>
				<p><span class="ll-pill parked">Registered</span> taken, but points nowhere yet</p>
			</div>
		</section>
	{/if}

	<section class="ll-notes">
		<div>
			<p class="eyebrow">From a terminal</p>
			<h2>Works with curl</h2>
			<p>
				The same address answers in plain text when the request does not come from a browser. Add
				<code>?format=json</code> for JSON, or call it with no domain for the options.
			</p>
			<pre><code>curl {host}/lookslike/{curlTarget}</code></pre>
			<p>
				The terminal version runs the lookups on this site's server instead of in your browser, so
				the domain you ask about passes through it. Nothing is stored either way.
			</p>
		</div>
		<div>
			<p class="eyebrow">Method</p>
			<h2>How it works, and where it falls short</h2>
			<ul>
				<li>
					It builds variants of your name (dropped, doubled, swapped and neighbouring-key letters,
					lookalike characters such as <code>rn</code> for <code>m</code> or Cyrillic
					<code>а</code> for <code>a</code>, single bit flips, other endings) and asks a DNS
					resolver for each one's name servers.
				</li>
				<li>
					A registered domain is not proof of bad intent. Many are parked by resellers, or belong to
					an unrelated company with a similar name.
				</li>
				<li>
					A domain can be registered without name servers, in which case it shows as unregistered
					here. Treat the list as a lower bound.
				</li>
				<li>
					Some registries refuse mixed-script names, so many of the international variants can never
					be registered at all.
				</li>
			</ul>
		</div>
	</section>
</div>

<style>
	.lookslike {
		--mail: #b3261a;
		--mail-bg: #f6e1dc;
		--web: #8a5200;
		--web-bg: #f3e6cc;
		--free: #1f6f47;
		--free-bg: #dfeee3;
		padding: 64px 0 96px;
	}
	:global(:root[data-theme='dark']) .lookslike {
		--mail: #ff9684;
		--mail-bg: #3b1f1a;
		--web: #efb65c;
		--web-bg: #33290f;
		--free: #7fd3a4;
		--free-bg: #17301f;
	}
	code,
	pre,
	input[type='text'],
	.dom,
	.rec,
	dd {
		font-family: 'Geist Mono', ui-monospace, monospace;
	}

	.ll-hero h1 {
		margin: 14px 0 24px;
	}
	.ll-lede {
		max-width: 62ch;
		font-size: 17px;
		line-height: 1.65;
		color: var(--muted);
	}

	.ll-form {
		margin-top: 44px;
		padding: 28px 0;
		border-block: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.ll-row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 12px;
	}
	.ll-field {
		flex: 1 1 280px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	input[type='text'],
	select {
		height: 46px;
		padding: 0 14px;
		border: 1px solid var(--line);
		border-radius: 4px;
		background: var(--panel);
		color: var(--ink);
		font-size: 15px;
	}
	input[type='text'] {
		width: 100%;
		font-size: 16px;
	}
	input[type='text']:hover,
	select:hover {
		border-color: var(--muted);
	}
	.ll-row .button {
		height: 46px;
		cursor: pointer;
	}
	.ll-error {
		color: var(--mail);
		font-size: 14px;
	}
	.ll-error:empty {
		display: none;
	}
	legend {
		margin-bottom: 12px;
	}
	.ll-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.ll-chip {
		position: relative;
	}
	.ll-chip input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}
	.ll-chip span {
		display: inline-block;
		padding: 6px 12px;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 13px;
		color: var(--muted);
	}
	.ll-chip input:checked + span {
		border-color: var(--blue);
		color: var(--blue);
	}
	.ll-chip input:focus-visible + span {
		outline: 2px solid var(--blue);
		outline-offset: 3px;
	}

	.ll-results {
		margin-top: 36px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.ll-counts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}
	.ll-counts dd {
		font-size: 34px;
		line-height: 1.2;
		font-variant-numeric: tabular-nums;
	}
	.ll-counts dd small {
		font-size: 16px;
		color: var(--muted);
	}
	.ll-counts .web {
		color: var(--web);
	}
	.ll-counts .mail {
		color: var(--mail);
	}
	.ll-bar {
		height: 2px;
		background: var(--line);
	}
	.ll-bar i {
		display: block;
		height: 100%;
		background: var(--blue);
		transition: width 0.2s;
	}
	.ll-toolbar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		color: var(--muted);
	}
	.ll-toolbar label {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.ll-toolbar input {
		accent-color: var(--blue);
	}
	.ll-toolbar div {
		display: flex;
		gap: 8px;
	}
	.ll-toolbar button {
		cursor: pointer;
	}

	.ll-table {
		overflow-x: auto;
		border-block: 1px solid var(--line);
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}
	th,
	td {
		padding: 11px 16px 11px 0;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid var(--line);
	}
	th {
		font:
			500 11px/1.6 'Geist Mono',
			ui-monospace,
			monospace;
		text-transform: uppercase;
		letter-spacing: 1.1px;
		color: var(--muted);
		white-space: nowrap;
	}
	th:first-child,
	td:first-child {
		padding-left: 14px;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	.dom {
		min-width: 200px;
		word-break: break-all;
	}
	.dom small {
		display: block;
		color: var(--muted);
	}
	.rec {
		font-size: 13px;
		color: var(--muted);
		word-break: break-all;
	}
	.tech {
		color: var(--muted);
		white-space: nowrap;
	}
	.lvl-mail td:first-child {
		box-shadow: inset 3px 0 0 var(--mail);
	}
	.lvl-web td:first-child {
		box-shadow: inset 3px 0 0 var(--web);
	}
	.ll-pill {
		display: inline-block;
		padding: 2px 9px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 500;
		white-space: nowrap;
		color: var(--muted);
		background: var(--panel);
	}
	.ll-pill.mail {
		color: var(--mail);
		background: var(--mail-bg);
	}
	.ll-pill.web {
		color: var(--web);
		background: var(--web-bg);
	}
	.ll-pill.available {
		color: var(--free);
		background: var(--free-bg);
	}
	.ll-empty {
		padding: 28px 14px;
		color: var(--muted);
	}
	.ll-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		font-size: 13px;
		color: var(--muted);
	}
	.ll-legend .ll-pill {
		margin-right: 6px;
	}

	.ll-notes {
		margin-top: 72px;
		padding-top: 48px;
		border-top: 1px solid var(--line);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		font-size: 15px;
		line-height: 1.65;
		color: var(--muted);
	}
	.ll-notes h2 {
		margin: 6px 0 18px;
		font-size: 26px;
		color: var(--ink);
	}
	.ll-notes p + p {
		margin-top: 14px;
	}
	.ll-notes pre {
		margin: 18px 0;
		padding: 14px 16px;
		border: 1px solid var(--line);
		border-radius: 4px;
		background: var(--panel);
		color: var(--ink);
		font-size: 13px;
		overflow-x: auto;
	}
	.ll-notes :not(pre) > code {
		font-size: 0.9em;
		color: var(--ink);
	}
	.ll-notes ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding-left: 18px;
		list-style: square;
	}

	@media (max-width: 860px) {
		.ll-notes {
			grid-template-columns: 1fr;
			gap: 44px;
		}
	}
	@media (max-width: 720px) {
		.lookslike {
			padding: 40px 0 64px;
		}
		.ll-counts {
			grid-template-columns: repeat(2, 1fr);
		}
		.ll-counts dd {
			font-size: 28px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.ll-bar i {
			transition: none;
		}
	}
</style>
