<script>
	import { formatDate } from '$lib/utils/formatDate';
	import Badge from '$lib/components/Badge.svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
	import { toggleTopic, toggleType } from '$lib/utils/filter.svelte.js';
	import { spring } from 'svelte/motion';
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

	function handleReadMore() {
		goto(post.path);
	}

	let truncatedDescription = $derived(truncate(post.description, 120));
</script>

<article
	bind:this={cardElement}
	class="bg-base-200/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 border border-base-300 relative group h-[28rem] flex flex-col"
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

	{#if post.imageUrl}
		<div class="relative h-48 overflow-hidden">
			<img
				src={post.imageUrl}
				alt={post.title}
				class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-base-200/50 to-transparent"></div>
		</div>
	{/if}

	<div class="p-6 flex flex-col flex-grow">
		<div class="flex-grow space-y-4">
			<h3 class="text-xl font-semibold text-base-content font-sans line-clamp-2">{post.title}</h3>

			{#if post.description}
				<p class="text-base text-base-content/70 line-clamp-3">
					{truncatedDescription}
				</p>
			{/if}

			<div class="flex items-center space-x-4 text-sm text-base-content/60">
				<div class="flex items-center">
					<IconCalendar class="w-4 h-4 mr-1" />
					<span>{formatDate(post.date)}</span>
				</div>
				{#if post.readingTime}
					<div class="flex items-center">
						<IconClock class="w-4 h-4 mr-1" />
						<span>{post.readingTime} min read</span>
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-4 space-y-4">
			<div class="flex flex-wrap gap-2">
				<Badge type={post.type} onclick={() => toggleType(post.type)} variant="type" />
				{#if post.topics}
					{#each post.topics.slice(0, 3) as topic}
						<Badge {topic} onclick={() => toggleTopic(topic)} variant="topic" />
					{/each}
				{/if}
			</div>

			<div class="flex justify-between items-center">
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

				{#if post.type === 'project' && (post.githubUrl || post.liveUrl)}
					<div class="flex space-x-4">
						{#if post.githubUrl}
							<a
								href={post.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-base-content opacity-70 hover:text-primary transition-colors duration-200 flex items-center"
							>
								<IconGithub class="w-4 h-4" />
							</a>
						{/if}
						{#if post.liveUrl}
							<a
								href={post.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-primary hover:text-primary-focus transition-colors duration-200 flex items-center"
							>
								<IconExternalLink class="w-4 h-4" />
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</article>

<style>
	article {
		--tw-gradient-from: theme('colors.accent');
		transition: transform 0.1s ease-out;
	}
</style>
