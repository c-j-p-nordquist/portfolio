<script>
	const CHARACTERS = [
		{
			char: '山',
			pinyin: 'shān',
			jyutping: 'saan1',
			meaning: 'Mountain',
			strokes: ['M 100 38 L 100 152', 'M 48 92 L 48 154 L 152 154', 'M 152 86 L 152 162'],
			notes: [261.63, 329.63, 392.0], // C4, E4, G4
			drawing: [
				'M 24 156 L 72 74 L 104 122 L 136 56 L 178 156 Z',
				'M 56 102 L 72 74 L 86 96',
				'M 118 88 L 136 56 L 154 90'
			],
			accent: '#304fe5',
			words: [
				{ hanzi: '高山', reading: 'gāoshān · gou1 saan1', gloss: 'high mountain' },
				{ hanzi: '火山', reading: 'huǒshān · fo2 saan1', gloss: 'volcano' }
			],
			sentence: '山上有高高的樹。 (Tall trees grow on the mountain.)'
		},
		{
			char: '火',
			pinyin: 'huǒ',
			jyutping: 'fo2',
			meaning: 'Fire',
			strokes: [
				'M 56 76 L 74 102',
				'M 148 72 L 124 100',
				'M 100 36 C 100 96, 82 138, 42 166',
				'M 98 98 C 118 128, 138 150, 162 164'
			],
			notes: [293.66, 329.63, 392.0, 440.0], // D4, E4, G4, A4
			drawing: [
				'M 100 32 C 134 68, 156 102, 140 142 C 130 162, 70 162, 60 142 C 44 102, 66 68, 100 32 Z',
				'M 100 78 C 116 98, 122 118, 112 140 C 106 150, 94 150, 88 140 C 78 118, 84 98, 100 78 Z'
			],
			accent: '#d9532f',
			words: [
				{ hanzi: '火花', reading: 'huǒhuā · fo2 faa1', gloss: 'spark' },
				{ hanzi: '火車', reading: 'huǒchē · fo2 ce1', gloss: 'train' }
			],
			sentence: '小小火花亮晶晶。 (Tiny sparks shine brightly.)'
		},
		{
			char: '木',
			pinyin: 'mù',
			jyutping: 'muk6',
			meaning: 'Tree / Wood',
			strokes: [
				'M 42 82 L 158 82',
				'M 100 34 L 100 168',
				'M 98 82 C 82 114, 62 138, 38 156',
				'M 102 82 C 118 114, 138 138, 162 156'
			],
			notes: [261.63, 293.66, 392.0, 523.25], // C4, D4, G4, C5
			drawing: [
				'M 100 84 L 100 164 M 84 164 L 116 164',
				'M 100 112 L 74 90 M 100 104 L 128 84',
				'M 100 34 C 64 34, 48 64, 64 90 C 48 106, 70 126, 100 120 C 130 126, 152 106, 136 90 C 152 64, 136 34, 100 34 Z'
			],
			accent: '#2b7a4b',
			words: [
				{ hanzi: '樹木', reading: 'shùmù · syu6 muk6', gloss: 'trees' },
				{ hanzi: '木頭', reading: 'mùtou · muk6 tau4', gloss: 'wood / log' }
			],
			sentence: '小鳥在木頭上唱歌。 (A little bird sings on the log.)'
		}
	];

	let selectedIdx = $state(0);
	let strokeStep = $state(0);
	let soundEnabled = $state(true);

	let active = $derived(CHARACTERS[selectedIdx]);
	let isRevealed = $derived(strokeStep >= active.strokes.length);

	function playNote(freq, isChord = false) {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			if (!Ctx) return;
			const ctx = new Ctx();
			const freqs = isChord ? [freq, freq * 1.25, freq * 1.5] : [freq];

			freqs.forEach((f, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = 'sine';
				osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.06);
				gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.06);
				gain.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + idx * 0.06 + 0.03);
				gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.55);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + idx * 0.06);
				osc.stop(ctx.currentTime + idx * 0.06 + 0.58);
			});
		} catch {
			// Ignore audio context restrictions
		}
	}

	function selectCharacter(idx) {
		selectedIdx = idx;
		strokeStep = 0;
	}

	function advanceStroke() {
		if (strokeStep < active.strokes.length) {
			const note = active.notes[strokeStep] ?? 329.63;
			strokeStep += 1;
			playNote(note, strokeStep === active.strokes.length);
		} else {
			strokeStep = 0;
		}
	}
</script>

<div
	class="ink-specimen"
	role="region"
	aria-label="Interactive stroke-to-meaning demo for Ink Magic"
>
	<div class="ink-header">
		<div>
			<p class="eyebrow">
				Interactive specimen <span aria-hidden="true">/</span> Practice grid &amp; reveal
			</p>
			<p class="ink-sub">
				Tap the 米字格 grid to trace each stroke and trigger the pictograph reveal.
			</p>
		</div>
		<div class="ink-tabs">
			{#each CHARACTERS as item, idx}
				<button
					type="button"
					class="char-tab"
					class:active={selectedIdx === idx}
					onclick={() => selectCharacter(idx)}
				>
					<span class="tab-hanzi">{item.char}</span>
					<span class="tab-meaning">{item.meaning}</span>
				</button>
			{/each}
			<button
				type="button"
				class="char-tab audio-toggle"
				aria-pressed={soundEnabled}
				onclick={() => (soundEnabled = !soundEnabled)}
			>
				{soundEnabled ? 'Sound: On' : 'Sound: Muted'}
			</button>
		</div>
	</div>

	<div class="ink-body">
		<button
			type="button"
			class="mizige-stage"
			onclick={advanceStroke}
			aria-label={isRevealed
				? `Reset ${active.char}`
				: `Draw stroke ${strokeStep + 1} of ${active.strokes.length} for ${active.char}`}
		>
			<svg viewBox="0 0 200 200" class="mizige-svg" aria-hidden="true">
				<!-- Classic 米字格 practice guide lines -->
				<rect x="6" y="6" width="188" height="188" rx="6" class="grid-border" />
				<line x1="6" y1="100" x2="194" y2="100" class="grid-guide" />
				<line x1="100" y1="6" x2="100" y2="194" class="grid-guide" />
				<line x1="6" y1="6" x2="194" y2="194" class="grid-guide diagonal" />
				<line x1="194" y1="6" x2="6" y2="194" class="grid-guide diagonal" />

				<!-- Ghost guide strokes -->
				{#each active.strokes as d, sIdx}
					<path
						{d}
						class="ghost-stroke"
						class:next-hint={sIdx === strokeStep && !isRevealed}
						class:faded={isRevealed}
					/>
				{/each}

				<!-- Drawn ink strokes -->
				{#each active.strokes.slice(0, strokeStep) as d}
					<path {d} class="drawn-stroke" class:morphed={isRevealed} />
				{/each}

				<!-- Pictographic line drawing reveal -->
				{#if isRevealed}
					<g class="reveal-drawing" style="--char-accent: {active.accent}">
						{#each active.drawing as d}
							<path {d} class="meaning-path" />
						{/each}
					</g>
				{/if}
			</svg>
			<span class="stage-prompt eyebrow">
				{#if isRevealed}
					★ Revealed {active.meaning} · Tap to trace again
				{:else}
					Stroke {strokeStep} / {active.strokes.length} · Tap grid to write next stroke
				{/if}
			</span>
		</button>

		<div class="ink-details">
			<div class="char-meta">
				<span class="big-char">{active.char}</span>
				<div>
					<h4>{active.meaning}</h4>
					<p class="eyebrow">
						Mandarin: {active.pinyin} <span aria-hidden="true">/</span> Cantonese: {active.jyutping}
					</p>
				</div>
			</div>

			<div class="vocab-list">
				<p class="eyebrow">Example words unlocked on reveal</p>
				<div class="vocab-cards">
					{#each active.words as w}
						<div class="vocab-card" class:unlocked={isRevealed}>
							<span class="vocab-hanzi">{w.hanzi}</span>
							<div>
								<div class="vocab-gloss">{w.gloss}</div>
								<div class="vocab-reading">{w.reading}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<p class="example-sentence">{active.sentence}</p>

			<div class="ink-actions">
				<button type="button" class="stroke-btn" onclick={advanceStroke}>
					{#if isRevealed}
						Practice {active.char} again ↺
					{:else}
						Write stroke {strokeStep + 1} of {active.strokes.length} →
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.ink-specimen {
		margin-block: 2.2em;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: var(--panel);
		overflow: hidden;
	}
	.ink-header {
		padding: 18px 20px;
		border-bottom: 1px solid var(--line);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
	}
	.ink-sub {
		font-size: 14px;
		color: var(--muted);
		margin-top: 2px !important;
	}
	.ink-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.char-tab {
		font:
			12px/1 'Geist Mono',
			ui-monospace,
			monospace;
		padding: 7px 11px;
		border-radius: 4px;
		border: 1px solid var(--line);
		background: var(--paper);
		color: var(--ink);
		display: inline-flex;
		align-items: center;
		gap: 7px;
		cursor: pointer;
	}
	.char-tab:hover {
		border-color: var(--ink);
	}
	.char-tab.active {
		border-color: var(--blue);
		background: color-mix(in srgb, var(--blue) 12%, var(--paper));
	}
	.char-tab.audio-toggle {
		color: var(--muted);
	}
	.tab-hanzi {
		font-size: 15px;
		font-weight: 600;
	}
	.ink-body {
		padding: 22px 20px;
		display: grid;
		grid-template-columns: 220px minmax(0, 1fr);
		gap: 26px;
		align-items: center;
	}
	.mizige-stage {
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		transition: border-color 0.2s;
	}
	.mizige-stage:hover {
		border-color: var(--blue);
	}
	.mizige-svg {
		width: 100%;
		max-width: 190px;
		height: auto;
	}
	.grid-border {
		fill: none;
		stroke: var(--line);
		stroke-width: 1.5;
	}
	.grid-guide {
		stroke: var(--line);
		stroke-width: 1;
		stroke-dasharray: 4 4;
	}
	.grid-guide.diagonal {
		opacity: 0.55;
	}
	.ghost-stroke {
		fill: none;
		stroke: color-mix(in srgb, var(--muted) 25%, transparent);
		stroke-width: 13;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition:
			opacity 0.3s,
			stroke 0.3s;
	}
	.ghost-stroke.next-hint {
		stroke: color-mix(in srgb, var(--blue) 35%, transparent);
	}
	.ghost-stroke.faded {
		opacity: 0.1;
	}
	.drawn-stroke {
		fill: none;
		stroke: var(--ink);
		stroke-width: 13;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition:
			opacity 0.35s,
			transform 0.35s;
		transform-origin: center;
	}
	.drawn-stroke.morphed {
		opacity: 0.14;
		transform: scale(0.92);
	}
	.meaning-path {
		fill: color-mix(in srgb, var(--char-accent) 14%, transparent);
		stroke: var(--char-accent);
		stroke-width: 5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.stage-prompt {
		font-size: 10px;
		text-align: center;
	}
	.ink-details {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.char-meta {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.big-char {
		font-size: 38px;
		line-height: 1;
		font-weight: 600;
		color: var(--blue);
	}
	.char-meta h4 {
		font-size: 18px;
		font-weight: 500;
		margin: 0 0 2px;
	}
	.vocab-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
		margin-top: 6px;
	}
	.vocab-card {
		padding: 10px 12px;
		border-radius: 4px;
		border: 1px solid var(--line);
		background: var(--paper);
		display: flex;
		align-items: center;
		gap: 12px;
		opacity: 0.65;
		transition:
			opacity 0.25s,
			border-color 0.25s;
	}
	.vocab-card.unlocked {
		opacity: 1;
		border-color: var(--blue);
	}
	.vocab-hanzi {
		font-size: 20px;
		font-weight: 600;
	}
	.vocab-gloss {
		font-size: 13px;
		font-weight: 500;
	}
	.vocab-reading {
		font:
			11px/1.3 'Geist Mono',
			ui-monospace,
			monospace;
		color: var(--muted);
	}
	.example-sentence {
		font-size: 14px !important;
		color: var(--muted);
		margin: 0 !important;
	}
	.stroke-btn {
		font:
			12px/1 'Geist Mono',
			ui-monospace,
			monospace;
		padding: 10px 14px;
		border-radius: 4px;
		background: var(--blue);
		color: #fff;
		border: 0;
		cursor: pointer;
	}
	@media (max-width: 640px) {
		.ink-body {
			grid-template-columns: 1fr;
		}
		.vocab-cards {
			grid-template-columns: 1fr;
		}
	}
</style>
