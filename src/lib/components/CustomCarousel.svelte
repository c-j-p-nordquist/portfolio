<script>
	import { spring } from 'svelte/motion';

	let { items, children } = $props();

	let container = $state(null);
	let scrollPosition = spring(0, {
		stiffness: 0.1,
		damping: 0.7
	});

	let itemWidth = $state(0);
	let containerWidth = $state(0);

	$effect(() => {
		if (container) {
			updateDimensions();
		}
	});

	function updateDimensions() {
		if (container) {
			itemWidth = container.children[0].offsetWidth;
			containerWidth = container.offsetWidth;
		}
	}

	function handleScroll(event) {
		scrollPosition.set(event.target.scrollLeft);
	}

	function scrollTo(index) {
		const targetScroll = index * itemWidth;
		container.scrollTo({ left: targetScroll, behavior: 'smooth' });
	}

	let visibleItems = $derived(Math.floor(containerWidth / itemWidth) || 1);
	let totalSlides = $derived(Math.ceil(items.length / visibleItems));
	let currentSlide = $derived(Math.round($scrollPosition / itemWidth / visibleItems));

	$effect(() => {
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});
</script>

<div class="relative">
	<div
		bind:this={container}
		class="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
		onscroll={handleScroll}
	>
		{#each items as item, i}
			<div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start">
				{@render children({ item, index: i })}
			</div>
		{/each}
	</div>

	<div class="flex justify-center mt-4 space-x-2">
		{#each Array(totalSlides) as _, i}
			<button
				class="w-3 h-3 rounded-full transition-all duration-300 {i === currentSlide
					? 'bg-blue-400 scale-125'
					: 'bg-gray-400 hover:bg-blue-200'}"
				onclick={() => scrollTo(i * visibleItems)}
			></button>
		{/each}
	</div>
</div>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
