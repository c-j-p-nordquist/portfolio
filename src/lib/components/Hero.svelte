<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconBriefcase from '~icons/mdi/briefcase';
	import IconUser from '~icons/mdi/user';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary px-4 sm:px-6 lg:px-8"
>
	<div class="absolute inset-0 opacity-20 dark:opacity-10">
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
	<div class="relative z-10 max-w-4xl w-full text-center">
		{#if mounted}
			<h1
				class="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter"
				in:fly={{ y: -30, duration: 600, delay: 150, easing: cubicOut }}
			>
				<span class="block font-serif font-thin">PHILIP</span>
				<span class="block font-serif italic font-black">NORDQUIST</span>
			</h1>
			<h2
				class="text-xl sm:text-2xl md:text-3xl mb-12 tracking-wide font-light max-w-3xl mx-auto"
				in:fade={{ duration: 600, delay: 300 }}
			>
				DevSecOps Engineer crafting
				<span class="font-semibold text-emerald-500 dark:text-dark-primary"
					>secure, scalable, and observable systems</span
				>
			</h2>

			<div
				class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
				in:fly={{ y: 30, duration: 600, delay: 450, easing: cubicOut }}
			>
				<a
					href="/posts"
					class="w-full sm:w-auto px-8 py-4 bg-emerald-500 dark:bg-dark-primary text-white dark:text-dark-bg font-sans font-bold rounded-full hover:bg-emerald-400 dark:hover:bg-dark-primary/90 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
				>
					<IconBriefcase class="w-5 h-5 mr-2" />
					View My Projects
				</a>
				<a
					href="/about"
					class="w-full sm:w-auto px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-sans font-bold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
				>
					<IconUser class="w-5 h-5 mr-2" />
					Learn About Me
				</a>
			</div>

			<div
				class="flex justify-center items-center space-x-6"
				in:fade={{ duration: 600, delay: 600 }}
			>
				<SocialLinks size="lg" />
			</div>
		{/if}
	</div>
</div>
