<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Hero from '$lib/components/Hero.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import CustomCarousel from '$lib/components/CustomCarousel.svelte';

	let { data } = $props();
	let featuredWorks = $derived(
		data.posts.filter((post) => post.featured).slice(0, 6) || data.posts.slice(0, 6) || []
	);

	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Philip Nordquist - DevSecOps Engineer</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Raleway:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="bg-[#0c0f1a] text-white relative">
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

		<section class="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0f1a] to-[#1c2028]">
			<div class="max-w-7xl mx-auto">
				{#if mounted}
					<h2
						class="text-5xl md:text-7xl font-display mb-16 text-center tracking-tighter"
						in:fly={{ y: 20, duration: 800, delay: 200, easing: cubicOut }}
					>
						Explore My <span class="text-blue-400 font-black italic">Projects</span>
					</h2>
					<div in:fade={{ duration: 800, delay: 400 }} class="w-full max-w-6xl mx-auto">
						<CustomCarousel items={featuredWorks}>
							{#snippet children({ item })}
								<div class="p-4">
									<PostCard post={item} />
								</div>
							{/snippet}
						</CustomCarousel>
					</div>
					<div class="text-center mt-16">
						<a
							href="/posts"
							class="inline-block px-8 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
							in:fly={{ y: 20, duration: 500, delay: 1200, easing: cubicOut }}
						>
							VIEW ALL WORKS
						</a>
					</div>
				{/if}
			</div>
		</section>
	</div>
</main>
