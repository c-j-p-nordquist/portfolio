<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Badge from '$lib/components/Badge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { goto } from '$app/navigation';
	import IconGithub from '~icons/mdi/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import ReadingEnhancements from '$lib/components/ReadingEnhancements.svelte';
	import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

	let {
		title,
		date,
		lastUpdated,
		topics,
		type,
		imageBasePath,
		githubUrl,
		liveUrl,
		summary,
		readingTime,
		children
	} = $props();

	console.log('Post props:', { title, imageBasePath, type });

	function formatDates(publishedDate, lastUpdatedDate) {
		let dateString = `Published on ${formatDate(publishedDate)}`;
		if (lastUpdatedDate && lastUpdatedDate !== publishedDate) {
			dateString += ` • Last updated on ${formatDate(lastUpdatedDate)}`;
		}
		return dateString;
	}

	function filterByType(type) {
		goto(`/posts?type=${type}`);
	}

	function filterByTopic(topic) {
		goto(`/posts?topic=${encodeURIComponent(topic)}`);
	}

	function goBack() {
		history.back();
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<ReadingEnhancements />

<article class="container mx-auto px-4 py-8 max-w-3xl">
	<button
		onclick={goBack}
		class="mb-8 flex items-center text-primary hover:text-primary-focus transition-colors duration-200"
		in:fly={{ x: -20, duration: 500, delay: 200, easing: cubicOut }}
	>
		<IconArrowLeft class="w-4 h-4 mr-2" /> Back
	</button>

	{#if imageBasePath}
		<div class="mb-8 overflow-hidden rounded-lg">
			<ResponsiveImage {imageBasePath} imageType="full" aspectRatio="16/9" alt={title} />
		</div>
	{:else}
		<p>No image available for this post</p>
	{/if}

	<h1
		class="text-4xl md:text-5xl font-display font-bold mb-6 text-base-content leading-tight"
		in:fly={{ y: 20, duration: 500, delay: 400, easing: cubicOut }}
	>
		{title}
	</h1>

	<div
		class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-base-content/70 mb-8"
		in:fade={{ duration: 500, delay: 600 }}
	>
		<div class="flex items-center">
			<IconCalendar class="w-4 h-4 mr-2" />
			<span>{formatDates(date, lastUpdated)}</span>
		</div>
		{#if readingTime}
			<div class="flex items-center">
				<IconClock class="w-4 h-4 mr-2" />
				<span>{readingTime} min read</span>
			</div>
		{/if}
	</div>

	<div
		class="flex flex-wrap gap-3 mb-8"
		in:fly={{ y: 20, duration: 500, delay: 1000, easing: cubicOut }}
	>
		<Badge {type} variant="type" onclick={() => filterByType(type)} />
		{#if topics && topics.length > 0}
			{#each topics as topic}
				<Badge {topic} variant="topic" onclick={() => filterByTopic(topic)} />
			{/each}
		{/if}
	</div>

	{#if summary}
		<div
			class="mb-12 text-lg text-base-content/90 leading-relaxed"
			in:fade={{ duration: 500, delay: 1200 }}
		>
			<p>{summary}</p>
		</div>
	{/if}

	{#if type === 'project' && (githubUrl || liveUrl)}
		<div
			class="flex flex-wrap gap-4 mb-12"
			in:fly={{ y: 20, duration: 500, delay: 1400, easing: cubicOut }}
		>
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline btn-primary"
				>
					<IconGithub class="w-5 h-5 mr-2" /> View on GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a href={liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
					<IconExternalLink class="w-5 h-5 mr-2" /> Live Demo
				</a>
			{/if}
		</div>
	{/if}

	<div
		class="prose prose-lg prose-base-content max-w-none space-y-6"
		in:fade={{ duration: 500, delay: 1600 }}
	>
		{@render children()}
	</div>
</article>
