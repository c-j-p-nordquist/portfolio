<script>
	import { onMount } from 'svelte';

	const COLS = 9;
	const ROWS = 5;
	const START = { r: 2, c: 0 };
	const GOAL = { r: 2, c: COLS - 1 };

	let tool = $state('tower'); // 'firepot' | 'tower'

	// Initial layout that already shows foes bending around lantern light
	let firepots = $state(new Set(['1,2', '2,2', '2,6', '3,6']));
	let towers = $state(new Set(['1,4']));
	let waveActive = $state(false);
	let foeStep = $state(0);
	let statusNote = $state('Click any tile on the Moor to place or remove a tower or firepot.');

	function key(r, c) {
		return `${r},${c}`;
	}

	function isEndpoint(r, c) {
		return (r === START.r && c === START.c) || (r === GOAL.r && c === GOAL.c);
	}

	function getLitTiles(towerSet) {
		const lit = new Map();
		for (const item of towerSet) {
			const [tr, tc] = item.split(',').map(Number);
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr === 0 && dc === 0) continue;
					const nr = tr + dr;
					const nc = tc + dc;
					if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
						const k = key(nr, nc);
						const dist = Math.abs(dr) + Math.abs(dc);
						const intensity = dist === 1 ? 2 : 1;
						lit.set(k, Math.max(lit.get(k) ?? 0, intensity));
					}
				}
			}
		}
		return lit;
	}

	function findPath(potSet, towerSet) {
		const lit = getLitTiles(towerSet);
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
				if (potSet.has(k) || towerSet.has(k)) continue;

				// Foes strongly prefer dark tiles over lit tiles
				const lightLevel = lit.get(k) ?? 0;
				const stepCost = 1 + lightLevel * 3.2;
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

	let litMap = $derived(getLitTiles(towers));
	let currentPath = $derived(findPath(firepots, towers) ?? []);
	let pathSet = $derived(new Set(currentPath.map((p) => key(p.r, p.c))));
	let litStepsCount = $derived(
		currentPath.filter((p) => (litMap.get(key(p.r, p.c)) ?? 0) > 0).length
	);

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
			statusNote = 'Cleared tile — path recalculated.';
			return;
		}

		if (tool === 'firepot') {
			nextPots.add(k);
		} else {
			nextTowers.add(k);
		}

		const testPath = findPath(nextPots, nextTowers);
		if (!testPath) {
			statusNote = 'Foes need at least one open lane across the Moor.';
			return;
		}

		firepots = nextPots;
		towers = nextTowers;
		statusNote =
			tool === 'tower'
				? 'Placed lantern tower — foes bend away from its lamplight.'
				: 'Placed firepot wall — lane blocked.';
	}

	function sendWave() {
		if (waveActive || currentPath.length === 0) return;
		waveActive = true;
		foeStep = 0;
	}

	function resetBoard() {
		firepots = new Set(['1,2', '2,2', '2,6', '3,6']);
		towers = new Set(['1,4']);
		waveActive = false;
		foeStep = 0;
		statusNote = 'Reset to default lane.';
	}

	onMount(() => {
		const id = setInterval(() => {
			if (!waveActive) return;
			if (foeStep < currentPath.length + 2) {
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
				Try it <span aria-hidden="true">/</span> Light-avoidant pathfinding
			</p>
			<p class="specimen-sub">
				Foes never cross firepots and detour around lamplight unless walled in.
			</p>
		</div>
		<div class="specimen-controls">
			<button
				type="button"
				class="spec-chip"
				class:active={tool === 'tower'}
				onclick={() => (tool = 'tower')}
			>
				<span class="dot tower-dot" aria-hidden="true"></span> Lantern tower
			</button>
			<button
				type="button"
				class="spec-chip"
				class:active={tool === 'firepot'}
				onclick={() => (tool = 'firepot')}
			>
				<span class="dot pot-dot" aria-hidden="true"></span> Firepot wall
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
				{@const light = litMap.get(k) ?? 0}
				{@const onPath = pathSet.has(k)}
				{@const pathIdx = currentPath.findIndex((p) => p.r === r && p.c === c)}
				{@const hasFoe =
					waveActive &&
					pathIdx !== -1 &&
					(pathIdx === foeStep || pathIdx === foeStep - 2 || pathIdx === foeStep - 4)}
				<button
					type="button"
					class="moor-tile"
					class:lit-1={light === 1}
					class:lit-2={light === 2}
					class:on-path={onPath}
					class:has-pot={hasPot}
					class:has-tower={hasTower}
					disabled={isStart || isGoal}
					onclick={() => toggleTile(r, c)}
					aria-label="Row {r + 1}, Column {c + 1}{hasTower
						? ', Lantern tower'
						: hasPot
							? ', Firepot'
							: onPath
								? ', Foe path'
								: ''}"
				>
					{#if isStart}
						<span class="tile-tag">SPAWN</span>
					{:else if isGoal}
						<span class="tile-tag">HOLD</span>
					{:else if hasTower}
						<span class="tower-glyph" aria-hidden="true">✦</span>
					{:else if hasPot}
						<span class="pot-glyph" aria-hidden="true">▪</span>
					{/if}

					{#if hasFoe}
						<span class="foe-silhouette" aria-hidden="true">
							<span class="foe-eye"></span><span class="foe-eye"></span>
						</span>
					{:else if onPath && !isStart && !isGoal}
						<span class="path-crumb" aria-hidden="true"></span>
					{/if}
				</button>
			{/each}
		{/each}
	</div>

	<div class="specimen-footer">
		<span class="eyebrow">{statusNote}</span>
		<span class="eyebrow">
			Route: {currentPath.length} tiles <span aria-hidden="true">/</span> Lit exposure: {litStepsCount}
			{litStepsCount === 1 ? 'tile' : 'tiles'}
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
		background: #f5b942;
		box-shadow: 0 0 6px #f5b942;
	}
	.pot-dot {
		background: #d96b43;
	}
	.moor-board {
		background: #141716;
		padding: 18px;
		display: grid;
		grid-template-columns: repeat(9, minmax(0, 1fr));
		gap: 5px;
	}
	.moor-tile {
		aspect-ratio: 1.25 / 1;
		min-height: 40px;
		border-radius: 4px;
		border: 1px solid #252b28;
		background: #1b201e;
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
		border-color: #5b6861;
	}
	.moor-tile.lit-1 {
		background: radial-gradient(circle, rgba(245, 185, 66, 0.22), rgba(27, 32, 30, 0.95));
		border-color: rgba(245, 185, 66, 0.35);
	}
	.moor-tile.lit-2 {
		background: radial-gradient(circle, rgba(245, 185, 66, 0.38), rgba(35, 34, 24, 0.95));
		border-color: rgba(245, 185, 66, 0.55);
	}
	.moor-tile.has-tower {
		background: radial-gradient(circle, rgba(251, 205, 92, 0.55), #252218);
		border-color: #f5b942;
	}
	.moor-tile.has-pot {
		background: #271f1c;
		border-color: #9e5236;
	}
	.tile-tag {
		font:
			9px/1 'Geist Mono',
			ui-monospace,
			monospace;
		letter-spacing: 0.08em;
		color: #9aa59e;
	}
	.tower-glyph {
		color: #ffd670;
		font-size: 16px;
		text-shadow: 0 0 10px #f5b942;
	}
	.pot-glyph {
		color: #e0744a;
		font-size: 15px;
	}
	.path-crumb {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: #7da2ff;
		opacity: 0.75;
	}
	.foe-silhouette {
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: #090b0a;
		border: 1.5px solid #8eabff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 3px;
		box-shadow: 0 0 10px rgba(142, 171, 255, 0.5);
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
