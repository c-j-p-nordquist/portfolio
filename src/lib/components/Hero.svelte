<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white"
>
	<div class="absolute inset-0 opacity-20">
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
	<div class="relative z-10 max-w-4xl w-full px-4">
		{#if mounted}
			<h1
				class="text-6xl md:text-9xl font-bold mb-4 tracking-tighter"
				in:fly={{ y: -50, duration: 1000, delay: 300, easing: cubicOut }}
			>
				<span class="block font-thin">PHILIP</span>
				<span class="block italic font-black">NORDQUIST</span>
			</h1>
			<h2
				class="text-xl md:text-3xl mb-12 tracking-wide font-light"
				in:fade={{ duration: 1000, delay: 800 }}
			>
				DevSecOps Engineer crafting
				<span class="font-semibold text-emerald-500">secure, scalable, and observable systems</span>
			</h2>
			<div
				class="flex flex-wrap items-center gap-8 mb-12"
				in:fly={{ y: 50, duration: 1000, delay: 1200, easing: cubicOut }}
			>
				<a
					href="https://github.com/nordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="group"
				>
					<IconGithub class="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
				</a>
				<a
					href="https://linkedin.com/in/philipnordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="group"
				>
					<IconLinkedin class="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
				</a>
				<a href="mailto:philip@nordquist.me" class="group">
					<IconEmail class="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
				</a>
			</div>
			<div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
				<a
					href="/posts"
					class="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
					in:fade={{ duration: 800, delay: 1600 }}
				>
					Explore My Projects
				</a>
				<a
					href="/about"
					class="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-emerald-500 text-emerald-500 font-bold rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
					in:fade={{ duration: 800, delay: 1700 }}
				>
					Learn About My Experience
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
