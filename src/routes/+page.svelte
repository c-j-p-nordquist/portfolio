<script>
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Philip Nordquist - DevSecOps Engineer</title>
	<meta
		name="description"
		content="Philip Nordquist is a DevSecOps Engineer specializing in secure, scalable, and observable systems. Explore his projects and experience."
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary relative">
	<div class="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
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
	<div class="relative z-10">
		<Hero />
	</div>
</main>
