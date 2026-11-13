<script>
	import { onMount } from 'svelte';

	const COLS = 9;
	const ROWS = 5;
	const START = { r: 2, c: 0 };
	const GOAL = { r: 2, c: COLS - 1 };
	/** What a leap over one firepot costs a jumper, in steps. */
	const LEAP_COST = 3;

	const DEFAULT_POTS = ['0,3', '1,3', '2,3', '3,3', '1,6', '3,6', '4,6'];
	const DEFAULT_TOWERS = ['2,6'];

	let tool = $state('firepot'); // 'firepot' | 'tower'

	// Two firepot walls with a tower set into the second one: walkers wind round both,
	// jumpers leap the first and have to find a firepot to leap in the second.
	let firepots = $state(new Set(DEFAULT_POTS));
	let towers = $state(new Set(DEFAULT_TOWERS));
	let waveActive = $state(false);
	let foeStep = $state(0);
	let statusNote = $state('Click any tile to place or remove a firepot or a tower.');

	function key(r, c) {
		return `${r},${c}`;
	}

	function isEndpoint(r, c) {
		return (r === START.r && c === START.c) || (r === GOAL.r && c === GOAL.c);
	}

	/** Cheapest way across. Towers block everyone; firepots block walkers and cost jumpers a leap. */
	function findPath(potSet, towerSet, jumper) {
		const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
		const prev = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
		const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

		dist[START.r][START.c] = 0;

		while (true) {
			let bestR = -1;
			let bestC = -1;
			let bestD = Infinity;

			for (let r = 0; r < ROWS; r++) {
				for (let c = 0; c < COLS; c++) {
					if (!visited[r][c] && dist[r][c] < bestD) {
						bestD = dist[r][c];
						bestR = r;
						bestC = c;
					}
				}
			}

			if (bestR === -1 || (bestR === GOAL.r && bestC === GOAL.c)) break;
			visited[bestR][bestC] = true;

			const dirs = [
				[0, 1],
				[1, 0],
				[-1, 0],
				[0, -1]
			];
			for (const [dr, dc] of dirs) {
				const nr = bestR + dr;
				const nc = bestC + dc;
				if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
				const k = key(nr, nc);
				if (towerSet.has(k)) continue;
				if (potSet.has(k) && !jumper) continue;

				const stepCost = potSet.has(k) ? LEAP_COST : 1;
				const cand = dist[bestR][bestC] + stepCost;
				if (cand < dist[nr][nc]) {
					dist[nr][nc] = cand;
					prev[nr][nc] = { r: bestR, c: bestC };
				}
			}
		}

		if (dist[GOAL.r][GOAL.c] === Infinity) return null;

		const path = [];
		let curr = { r: GOAL.r, c: GOAL.c };
		while (curr) {
			path.push(curr);
			curr = prev[curr.r][curr.c];
		}
		return path.reverse();
	}

	let walkPath = $derived(findPath(firepots, towers, false) ?? []);
	let leapPath = $derived(findPath(firepots, towers, true) ?? []);
	let walkIndex = $derived(new Map(walkPath.map((p, i) => [key(p.r, p.c), i])));
	let leapIndex = $derived(new Map(leapPath.map((p, i) => [key(p.r, p.c), i])));
	let leaps = $derived(leapPath.filter((p) => firepots.has(key(p.r, p.c))).length);

	function toggleTile(r, c) {
		if (isEndpoint(r, c)) return;
		const k = key(r, c);

		const nextPots = new Set(firepots);
		const nextTowers = new Set(towers);

		if (nextPots.has(k) || nextTowers.has(k)) {
			nextPots.delete(k);
			nextTowers.delete(k);
			firepots = nextPots;
			towers = nextTowers;
			statusNote = 'Cleared the tile.';
			return;
		}

		if (tool === 'firepot') {
			nextPots.add(k);
		} else {
			nextTowers.add(k);
		}

		if (!findPath(nextPots, nextTowers, false)) {
			statusNote = 'Walkers need one open way to the hall.';
			return;
		}

		firepots = nextPots;
		towers = nextTowers;
		statusNote =
			tool === 'tower'
				? 'Placed a tower. Nothing gets past it.'
				: 'Placed a firepot. Walkers go round; jumpers may leap it.';
	}

	function sendWave() {
		if (waveActive || walkPath.length === 0) return;
		waveActive = true;
		foeStep = 0;
	}

	function resetBoard() {
		firepots = new Set(DEFAULT_POTS);
		towers = new Set(DEFAULT_TOWERS);
		waveActive = false;
		foeStep = 0;
		statusNote = 'Reset.';
	}

	onMount(() => {
		const id = setInterval(() => {
			if (!waveActive) return;
			if (foeStep < Math.max(walkPath.length, leapPath.length) + 2) {
				foeStep += 1;
			} else {
				waveActive = false;
				foeStep = 0;
			}
		}, 240);
		return () => clearInterval(id);
	});
</script>

<div
	class="specimen-card"
	role="region"
	aria-label="Interactive pathfinding demo for Where the Light Holds"
>
	<div class="specimen-header">
		<div>
			<p class="eyebrow">
				Try it <span aria-hidden="true">/</span> Walkers and jumpers
			</p>
			<p class="specimen-sub">
				Walkers go round firepots. Jumpers leap them when the way round is longer. Only a tower
				stops both.
			</p>
		</div>
		<div class="specimen-controls">
			<button
				type="button"
				class="spec-chip"
				class:active={tool === 'firepot'}
				onclick={() => (tool = 'firepot')}
			>
				<span class="dot pot-dot" aria-hidden="true"></span> Firepot
			</button>
			<button
				type="button"
				class="spec-chip"
				class:active={tool === 'tower'}
				onclick={() => (tool = 'tower')}
			>
				<span class="dot tower-dot" aria-hidden="true"></span> Tower
			</button>
			<button type="button" class="spec-chip action" onclick={sendWave} disabled={waveActive}>
				{waveActive ? 'Wave in motion…' : 'Send wave →'}
			</button>
			<button type="button" class="spec-chip subtle" onclick={resetBoard}>Reset</button>
		</div>
	</div>

	<div class="moor-board">
		{#each { length: ROWS } as _, r}
			{#each { length: COLS } as _, c}
				{@const k = key(r, c)}
				{@const isStart = r === START.r && c === START.c}
				{@const isGoal = r === GOAL.r && c === GOAL.c}
				{@const hasPot = firepots.has(k)}
				{@const hasTower = towers.has(k)}
				{@const walkIdx = walkIndex.get(k) ?? -1}
				{@const leapIdx = leapIndex.get(k) ?? -1}
				{@const hasWalker = waveActive && walkIdx !== -1 && walkIdx === foeStep}
				{@const hasJumper = waveActive && leapIdx !== -1 && leapIdx === foeStep}
				<button
					type="button"
					class="moor-tile"
					class:has-pot={hasPot}
					class:has-tower={hasTower}
					disabled={isStart || isGoal}
					onclick={() => toggleTile(r, c)}
					aria-label="Row {r + 1}, Column {c + 1}{hasTower
						? ', Tower'
						: hasPot
							? leapIdx !== -1
								? ', Firepot, jumpers leap here'
								: ', Firepot'
							: walkIdx !== -1
								? ', Walker path'
								: leapIdx !== -1
									? ', Jumper path'
									: ''}"
				>
					{#if isStart}
						<span class="tile-tag">GATE</span>
					{:else if isGoal}
						<span class="tile-tag">HALL</span>
					{:else if hasTower}
						<span class="tower-glyph" aria-hidden="true">✦</span>
					{:else if hasPot}
						<span class="pot-glyph" aria-hidden="true">▪</span>
					{/if}

					{#if hasJumper}
						<span class="foe-silhouette jumper" class:leaping={hasPot} aria-hidden="true">
							<span class="foe-eye"></span><span class="foe-eye"></span>
						</span>
					{:else if hasWalker}
						<span class="foe-silhouette" aria-hidden="true">
							<span class="foe-eye"></span><span class="foe-eye"></span>
						</span>
					{:else if !isStart && !isGoal && (walkIdx !== -1 || leapIdx !== -1)}
						<span class="crumbs" aria-hidden="true">
							{#if walkIdx !== -1}<span class="path-crumb"></span>{/if}
							{#if leapIdx !== -1}<span class="path-crumb leap"></span>{/if}
						</span>
					{/if}
				</button>
			{/each}
		{/each}
	</div>

	<div class="specimen-footer">
		<span class="eyebrow">{statusNote}</span>
		<span class="eyebrow">
			<span class="legend walk" aria-hidden="true"></span> Walkers: {walkPath.length} tiles
			<span aria-hidden="true">/</span>
			<span class="legend leap" aria-hidden="true"></span> Jumpers: {leapPath.length} tiles, {leaps}
			{leaps === 1 ? 'leap' : 'leaps'}
		</span>
	</div>
</div>

<style>
	.specimen-card {
		margin-block: 2.2em;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: var(--panel);
		overflow: hidden;
	}
	.specimen-header {
		padding: 18px 20px;
		border-bottom: 1px solid var(--line);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
	}
	.specimen-sub {
		font-size: 14px;
		color: var(--muted);
		margin-top: 2px !important;
	}
	.specimen-controls {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.spec-chip {
		font:
			12px/1 'Geist Mono',
			ui-monospace,
			monospace;
		padding: 8px 11px;
		border-radius: 4px;
		border: 1px solid var(--line);
		background: var(--paper);
		color: var(--ink);
		display: inline-flex;
		align-items: center;
		gap: 7px;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background 0.15s;
	}
	.spec-chip:hover:not(:disabled) {
		border-color: var(--ink);
	}
	.spec-chip.active {
		border-color: var(--blue);
		background: color-mix(in srgb, var(--blue) 12%, var(--paper));
	}
	.spec-chip.action {
		background: var(--blue);
		border-color: var(--blue);
		color: #fff;
	}
	.spec-chip.action:disabled {
		opacity: 0.65;
		cursor: default;
	}
	.spec-chip.subtle {
		color: var(--muted);
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
	}
	.tower-dot {
		background: #9aa6b1;
	}
	.pot-dot {
		background: #d96b43;
	}
	.moor-board {
		background: #3d5a3a;
		padding: 18px;
		display: grid;
		grid-template-columns: repeat(9, minmax(0, 1fr));
		gap: 5px;
	}
	.moor-tile {
		aspect-ratio: 1.25 / 1;
		min-height: 40px;
		border-radius: 4px;
		border: 1px solid #4f7049;
		background: #557a4d;
		position: relative;
		display: grid;
		place-items: center;
		cursor: pointer;
		padding: 0;
		transition:
			background 0.2s,
			border-color 0.2s,
			transform 0.1s;
	}
	.moor-tile:hover:not(:disabled) {
		border-color: #dfe9d2;
	}
	.moor-tile.has-tower {
		background: #7b8791;
		border-color: #c9d2da;
	}
	.moor-tile.has-pot {
		background: #4a6a44;
		border-color: #c8693f;
	}
	.tile-tag {
		font:
			9px/1 'Geist Mono',
			ui-monospace,
			monospace;
		letter-spacing: 0.08em;
		color: #eef3e6;
	}
	.tower-glyph {
		color: #fff3cf;
		font-size: 16px;
	}
	.pot-glyph {
		color: #ff9a5c;
		font-size: 15px;
	}
	.crumbs {
		position: absolute;
		inset: auto 0 5px 0;
		display: flex;
		justify-content: center;
		gap: 4px;
	}
	.moor-tile:not(.has-pot) .crumbs {
		inset: 0;
		align-items: center;
	}
	.path-crumb,
	.legend {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: #f4e7b0;
	}
	.path-crumb.leap,
	.legend.leap {
		background: #f4a03c;
	}
	.legend {
		display: inline-block;
		vertical-align: middle;
	}
	.foe-silhouette {
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: #090b0a;
		border: 1.5px solid #f4e7b0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 3px;
		position: relative;
		z-index: 1;
	}
	.foe-silhouette.jumper {
		border-color: #f4a03c;
	}
	.foe-silhouette.leaping {
		transform: translateY(-7px) scale(1.1);
		box-shadow: 0 9px 6px -4px rgba(0, 0, 0, 0.45);
	}
	.foe-eye {
		width: 3px;
		height: 3px;
		border-radius: 999px;
		background: #e8f0ff;
	}
	.specimen-footer {
		padding: 12px 20px;
		border-top: 1px solid var(--line);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 10px;
	}
	@media (max-width: 640px) {
		.moor-board {
			padding: 10px;
			gap: 3px;
		}
		.moor-tile {
			min-height: 32px;
		}
		.tile-tag {
			font-size: 7px;
		}
	}
</style>
