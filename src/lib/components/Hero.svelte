<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Button from '$lib/components/Button.svelte';

	let y = $state(0);

	function handleScroll() {
		y = window.scrollY;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:window on:scroll={handleScroll} />

<div class="relative bg-background dark:bg-darkBackground flex items-center justify-center py-16">
	<div class="container mx-auto px-8 lg:px-8 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="mb-8 flex justify-center items-center" in:fade={{ duration: 600, delay: 100 }}>
				{@html `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="40" cy="40" r="38" stroke="currentColor" stroke-width="2" class="animate-draw-outer-circle" />
				<circle cx="40" cy="40" r="28" stroke="#3B82F6" stroke-width="2" class="animate-draw-inner-circle" />
				<path d="M 40,20 C 35,25 25,30 22,35 L 40,50" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-draw-path path1" />
				<path d="M 38,35 L 56,50 C 52,55 45,60 38,65" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-draw-path path2" />
				<line x1="40" y1="2" x2="40" y2="10" stroke="#3B82F6" stroke-width="2" class="animate-draw-line line1" />
				<line x1="40" y1="70" x2="40" y2="78" stroke="#3B82F6" stroke-width="2" class="animate-draw-line line2" />
				<line x1="2" y1="40" x2="10" y2="40" stroke="#3B82F6" stroke-width="2" class="animate-draw-line line3" />
				<line x1="70" y1="40" x2="78" y2="40" stroke="#3B82F6" stroke-width="2" class="animate-draw-line line4" />
			  </svg>`}
			</div>
			<h1
				in:fly={{ y: -10, duration: 600, delay: 200, easing: cubicOut }}
				class="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-wider mb-4 text-primary dark:text-darkText"
			>
				Transform your cloud with AI, DevOps, and security.
			</h1>
			<h2
				in:fly={{ y: 10, duration: 600, delay: 400, easing: cubicOut }}
				class="text-lg md:text-xl font-sans font-light mb-8 text-subtitleText dark:text-darkSubtitleText"
			>
				More than just cloud consulting—I integrate the critical elements of modern infrastructure:
				DevOps for speed and reliability, AI for innovation, and cybersecurity for protection.
				Together, we build a cohesive solution that helps you operate efficiently today and prepare
				for the opportunities of tomorrow.
			</h2>
			<div
				in:fly={{ y: 10, duration: 400, delay: 800, easing: cubicOut }}
				class="flex justify-center items-center flex-row gap-4 mb-16"
			>
				<Button href="#featured-services" variant="primary" animate={true} delay={900}
					>Learn More</Button
				>
				<Button href="/contact" variant="secondary" animate={true} delay={1000}>
					Book a Consultation
				</Button>
			</div>
			<div
				in:fade={{ duration: 400, delay: 1100 }}
				class="text-sm text-mutedText dark:text-darkMutedText font-light italic"
			>
				A decade of elevating tech operations across global markets.
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes drawCircle {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes drawPath {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes drawLine {
		from {
			stroke-dashoffset: 8;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	:global(.animate-draw-outer-circle) {
		stroke-dasharray: 239;
		stroke-dashoffset: 239;
		animation: drawCircle 1s ease forwards;
	}

	:global(.animate-draw-inner-circle) {
		stroke-dasharray: 176;
		stroke-dashoffset: 176;
		animation: drawCircle 0.8s ease forwards 0.2s;
	}

	:global(.animate-draw-path) {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation: drawPath 0.6s ease forwards;
	}

	:global(.path1) {
		animation-delay: 0.4s;
	}

	:global(.path2) {
		animation-delay: 0.6s;
	}

	:global(.animate-draw-line) {
		stroke-dasharray: 8;
		stroke-dashoffset: 8;
		animation: drawLine 0.3s ease forwards;
	}

	:global(.line1) {
		animation-delay: 0.8s;
	}

	:global(.line2) {
		animation-delay: 0.9s;
	}

	:global(.line3) {
		animation-delay: 1s;
	}

	:global(.line4) {
		animation-delay: 1.1s;
	}
</style>
