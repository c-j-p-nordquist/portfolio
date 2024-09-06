<script>
	let { size = 100, animated = true, clickable = false, href = '/' } = $props();
</script>

{#if clickable}
	<a {href} class="inline-block hover:scale-105" aria-label="Go to homepage">
		{@render LogoSVG(size, animated)}
	</a>
{:else}
	<div>
		{@render LogoSVG(size, animated)}
	</div>
{/if}

{#snippet LogoSVG(size, animated)}
	<svg
		width={size}
		height={size}
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
		class={`${animated ? 'animate-logo' : ''} text-darkText dark:text-text`}
	>
		<g class="cube">
			<path
				d="M50 10 L90 30 L50 50 L10 30 Z"
				class="cube-face top-face fill-gray-700 dark:fill-gray-300"
			/>
			<path
				d="M10 30 L50 50 L50 90 L10 70 Z"
				class="cube-face left-face fill-gray-800 dark:fill-gray-400"
			/>
			<path
				d="M50 50 L90 30 L90 70 L50 90 Z"
				class="cube-face right-face fill-gray-600 dark:fill-gray-200"
			/>
		</g>

		<text
			x="30"
			y="60"
			font-family="IBM Plex Sans, sans-serif"
			font-size="16"
			font-weight="bold"
			class="cube-letter c fill-current"
			text-anchor="middle"
			dominant-baseline="middle">C</text
		>
		<text
			x="50"
			y="35"
			font-family="IBM Plex Sans, sans-serif"
			font-size="16"
			font-weight="bold"
			class="cube-letter j fill-current"
			text-anchor="middle"
			dominant-baseline="middle">J</text
		>
		<text
			x="70"
			y="60"
			font-family="IBM Plex Sans, sans-serif"
			font-size="16"
			font-weight="bold"
			class="cube-letter p fill-current"
			text-anchor="middle"
			dominant-baseline="middle">P</text
		>
	</svg>
{/snippet}

<style>
	.animate-logo .cube {
		animation: rotateCube 1s ease-out forwards;
		transform-origin: center;
		transform-box: fill-box;
	}
	.animate-logo .cube-face {
		opacity: 0;
		animation: fadeFace 0.3s ease-out forwards;
	}
	.animate-logo .top-face {
		animation-delay: 0.1s;
	}
	.animate-logo .left-face {
		animation-delay: 0.2s;
	}
	.animate-logo .right-face {
		animation-delay: 0.3s;
	}
	.animate-logo .cube-letter {
		opacity: 0;
		animation: fadeLetter 0.3s ease-out forwards;
	}
	.animate-logo .c {
		animation-delay: 0.4s;
	}
	.animate-logo .j {
		animation-delay: 0.5s;
	}
	.animate-logo .p {
		animation-delay: 0.6s;
	}
	@keyframes rotateCube {
		0% {
			transform: rotate3d(1, 1, 0, -20deg) scale(0.8);
		}
		100% {
			transform: rotate3d(1, 1, 0, 0deg) scale(1);
		}
	}
	@keyframes fadeFace {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes fadeLetter {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
