<script>
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { services } from '$lib/data/services';
	import { onMount } from 'svelte';
	import { useIntersectionObserver } from '$lib/utils/useIntersectionObserver.svelte.js';
	import { fade } from 'svelte/transition';

	let observers = services.map(() => useIntersectionObserver({ threshold: 0.1 }));

	let y;

	onMount(() => {
		const parallax = () => {
			y = window.scrollY;
		};
		window.addEventListener('scroll', parallax);
		return () => window.removeEventListener('scroll', parallax);
	});
</script>

<div class="bg-background dark:bg-darkBackground relative">
	<div class="absolute inset-0 z-0 pointer-events-none" style="transform: translateY({y * 0.3}px)">
		<div class="absolute inset-0 z-0 pointer-events-none flex justify-center items-start">
			<div
				in:fade={{ duration: 1000 }}
				class="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-secondary/30 via-accent/50 to-transparent rounded-full blur-3xl opacity-40 dark:opacity-30"
			></div>
		</div>
	</div>
	<div class="container mx-auto px-4 py-16 relative z-10">
		<div class="mb-16">
			<div>
				<h1
					class="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 font-heading text-primary dark:text-darkText"
				>
					Get Features to Market <span class="text-accent">Faster </span> and Safer
				</h1>
				<p
					class="text-lg sm:text-xl text-center text-subtitleText dark:text-darkSubtitleText max-w-3xl mx-auto font-sans"
				>
					Our solutions are designed to streamline your delivery process, secure your code, and keep
					your systems resilient. Explore how we can help you ship software quickly and reliably.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
			{#each services as service, index}
				<div bind:this={observers[index].ref}>
					<ServiceCard {service} observed={observers[index].observed} />
				</div>
			{/each}
		</div>

		<div class="text-center">
			<Button href="/contact" variant="primary">Get Started</Button>
		</div>
	</div>
</div>
