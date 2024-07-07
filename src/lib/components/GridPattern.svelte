<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let width = 40;
	export let height = 40;
	export let x = -1;
	export let y = -1;
	export let strokeDashArray = '';
	export let squareCount = 6;
	export let columns = 16;
	export let rows = 16;
	let className = '';
	export { className as class };
	let id = crypto.randomUUID().toString().slice(0, 8);
	export let fillColor = 'currentColor';
	export let squareColor = 'rgba(156, 163, 175, 0.2)';

	let squares = [];
	let mounted = false;

	function generateSquares() {
		squares = Array(squareCount)
			.fill(null)
			.map(() => ({
				x: Math.floor(Math.random() * columns),
				y: Math.floor(Math.random() * rows),
				opacity: spring(0)
			}));
	}

	onMount(() => {
		generateSquares();
		mounted = true;
		squares.forEach((square) => {
			setTimeout(() => {
				square.opacity.set(1);
			}, Math.random() * 1000);
		});
	});
</script>

<svg aria-hidden="true" class={className} {...$$restProps}>
	<defs>
		<pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
			<path
				d="M.5 {height}V.5H{width}"
				fill="none"
				stroke={fillColor}
				stroke-opacity="0.1"
				stroke-dasharray={strokeDashArray}
			/>
		</pattern>
	</defs>
	<rect width="100%" height="100%" stroke-width={0} fill="url(#{id})" />
	{#if squares.length}
		<svg {x} {y} class="overflow-visible">
			{#each squares as square}
				<rect
					stroke-width="0"
					width={width - 1}
					height={height - 1}
					x={square.x * width + 1}
					y={square.y * height + 1}
					fill={squareColor}
					opacity={mounted ? square.opacity : 0}
				/>
			{/each}
		</svg>
	{/if}
</svg>
