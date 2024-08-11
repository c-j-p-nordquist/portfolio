<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

	let { post } = $props();
	let isHovered = $state(false);

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	function handleClick() {
		goto(post.path);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<button
	class="relative overflow-hidden group cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	<ResponsiveImage
		imageBasePath={post.imageBasePath}
		imageType="card"
		aspectRatio="4/3"
		alt={post.title}
		class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
	/>
	<div class="flex flex-col justify-end p-6 text-white">
		<h3
			class="text-lg font-bold mb-2 transition-transform duration-300 leading-tight {isHovered
				? '-translate-y-2'
				: ''}"
		>
			{post.title}
		</h3>
		<p
			class="text-sm mb-4 text-white text-opacity-70 transition-all duration-300 ease-out opacity-100"
		>
			{post.description}
		</p>
	</div>
</button>
