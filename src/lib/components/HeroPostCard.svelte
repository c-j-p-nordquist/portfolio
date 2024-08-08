<script>
	import { spring } from 'svelte/motion';
	import Badge from '$lib/components/Badge.svelte';
	import { goto } from '$app/navigation';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

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

		const tiltX = (mouseY - 0.5) * 5;
		const tiltY = (mouseX - 0.5) * -5;
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

	let truncatedDescription = $derived(truncate(post.description, 100));

	function handleTypeClick() {
		goto('/posts?type=' + post.type.toLowerCase());
	}

	function handleReadMore() {
		goto(post.path);
	}
</script>

<article
	bind:this={cardElement}
	class="bg-base-200/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 border border-primary/20 relative group h-full flex flex-col justify-between"
	class:hover:shadow-lg={isHovered}
	class:hover:border-primary={isHovered}
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

	<ResponsiveImage imageBasePath={post.imageBasePath} imageType="hero" aspectRatio="4/3" />

	<div class="p-4 flex flex-col flex-grow">
		<div class="mb-2">
			<Badge type={post.type} onclick={handleTypeClick} variant="type" />
		</div>

		<h3
			class="text-lg font-display font-semibold mb-2 text-base-content leading-tight line-clamp-2"
		>
			{post.title}
		</h3>

		<p class="text-sm font-body text-base-content/70 mb-4 flex-grow leading-relaxed line-clamp-3">
			{truncatedDescription}
		</p>

		<button
			onclick={handleReadMore}
			class="text-primary hover:text-primary-focus transition-all duration-300 inline-block relative text-sm font-medium font-display mt-auto"
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
		--tw-gradient-from: theme('colors.primary');
		transition: transform 0.1s ease-out;
	}
</style>
