<script>
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import Badge from '$lib/components/Badge.svelte';
	import { goto } from '$app/navigation';

	let { post } = $props();

	let isHovered = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let cardElement;

	const tiltSpring = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);

	function handleMouseMove(event) {
		if (!cardElement) return;
		const { clientX, clientY } = event;
		const { left, top, width, height } = cardElement.getBoundingClientRect();
		mouseX = (clientX - left) / width;
		mouseY = (clientY - top) / height;

		const tiltX = (mouseY - 0.5) * 10;
		const tiltY = (mouseX - 0.5) * -10;
		tiltSpring.set({ x: tiltX, y: tiltY });
	}

	function handleMouseLeave() {
		isHovered = false;
		tiltSpring.set({ x: 0, y: 0 });
	}

	function truncate(text, length) {
		if (text.length <= length) return text;
		return text.slice(0, length) + '...';
	}

	function highlightText(text, highlight) {
		if (!highlight || !text.includes(highlight)) return text;
		const parts = text.split(highlight);
		return parts
			.map((part, index) =>
				index === 0
					? part
					: `<span class="font-semibold text-base-content">${highlight}</span>${part}`
			)
			.join('');
	}

	let truncatedDescription = $derived(truncate(post.description, 150));
	let highlightedDescription = $derived(highlightText(truncatedDescription, post.highlight));

	function handleTypeClick() {
		goto('/posts?type=' + post.type.toLowerCase());
	}

	function handleReadMore() {
		goto(post.path);
	}
</script>

<article
	bind:this={cardElement}
	class="bg-base-200/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 border border-base-300 relative group p-6 h-full flex flex-col justify-between"
	class:hover:shadow-lg={isHovered}
	style="transform: perspective(1000px) rotateX({$tiltSpring.x}deg) rotateY({$tiltSpring.y}deg);"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={handleMouseLeave}
	onmousemove={handleMouseMove}
>
	{#if isHovered}
		<div
			class="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
			style="background: radial-gradient(circle at {mouseX * 100}% {mouseY *
				100}%, var(--tw-gradient-from) 0%, transparent 70%)"
		></div>
	{/if}

	<div class="absolute top-2 right-2">
		<Badge type={post.type} onclick={handleTypeClick} variant="type" />
	</div>

	<div class="space-y-4 mt-6">
		<p class="text-base text-base-content/70 leading-relaxed">
			{@html highlightedDescription}
		</p>
	</div>

	<div class="mt-4">
		<button
			onclick={handleReadMore}
			class="text-primary hover:text-primary-focus transition-all duration-300 inline-block relative"
		>
			Read more
			<span
				class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 origin-left"
				class:scale-x-100={isHovered}
			></span>
		</button>
	</div>
</article>

<style>
	article {
		--tw-gradient-from: theme('colors.accent');
		transition: transform 0.1s ease-out;
	}
</style>
