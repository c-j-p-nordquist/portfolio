<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div
	class="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary relative"
>
	<div class="absolute inset-0 z-0 opacity-5 mix-blend-overlay">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<filter id="noiseFilter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.65"
					numOctaves="3"
					stitchTiles="stitch"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#noiseFilter)" />
		</svg>
	</div>

	<Nav />

	<main class="flex-grow relative z-10" in:fade={{ duration: 300 }}>
		{@render children()}
	</main>

	<Footer />
</div>
