<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import IconChevronDown from '~icons/lucide/chevron-down';
	import DotPattern from './DotPattern.svelte';

	let { name = 'PHILIP NORDQUIST', subtitle = 'PERSONAL PORTFOLIO', dispatch = {} } = $props();

	let visible = $state(false);
	let y = spring(50, { stiffness: 0.1, damping: 0.15 });

	$effect(() => {
		const timer = setTimeout(() => {
			visible = true;
			y.set(0);
		}, 100);

		return () => clearTimeout(timer);
	});

	function scrollToContent() {
		if (typeof dispatch.scrollToContent === 'function') {
			dispatch.scrollToContent();
		}
	}
</script>

<section
	class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary"
>
	<DotPattern
		width={20}
		height={20}
		cx={10}
		cy={10}
		cr={1}
		fillColor="currentColor"
		class="text-primary-content/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
	/>

	<div class="text-center text-primary-content z-10 px-4">
		{#if visible}
			<div class="flex flex-col items-center space-y-8" in:fade={{ duration: 1000, delay: 300 }}>
				<img
					src="/images/logo.svg"
					alt="Logo"
					class="w-32 h-32 mb-4"
					in:scale={{ duration: 1000, delay: 300 }}
				/>
				<h1
					class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
					style="transform: translateY({$y}px)"
				>
					{name}
				</h1>
				<p
					class="font-serif text-xl sm:text-2xl lg:text-3xl font-light tracking-wide"
					in:fly={{ y: 50, duration: 1000, delay: 900 }}
				>
					{subtitle}
				</p>
				<button
					onclick={scrollToContent}
					class="btn btn-ghost btn-lg text-primary-content mt-8 animate-bounce"
					in:fade={{ duration: 1000, delay: 1200 }}
				>
					<IconChevronDown class="w-8 h-8" />
				</button>
			</div>
		{/if}
	</div>
</section>
