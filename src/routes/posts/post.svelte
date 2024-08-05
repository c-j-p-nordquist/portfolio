<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Badge from '$lib/components/Badge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import ReadingEnhancements from '$lib/components/ReadingEnhancements.svelte';

	let {
		children,
		title,
		date,
		lastUpdated,
		topics,
		type,
		imageUrl,
		githubUrl,
		liveUrl,
		summary,
		readingTime
	} = $props();

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
		class="mb-6 flex items-center text-primary hover:text-primary-focus transition-colors duration-200"
		in:fly={{ x: -20, duration: 500, delay: 200, easing: cubicOut }}
	>
		<IconArrowLeft class="w-4 h-4 mr-2" /> Back
	</button>

	<h1
		class="text-4xl font-display font-bold mb-4 text-base-content"
		in:fly={{ y: 20, duration: 500, delay: 400, easing: cubicOut }}
	>
		{title}
	</h1>

	<div
		class="flex items-center space-x-4 text-sm text-base-content opacity-80 mb-6"
		in:fade={{ duration: 500, delay: 600 }}
	>
		<div class="flex items-center">
			<IconCalendar class="w-4 h-4 mr-1" />
			<span>{formatDates(date, lastUpdated)}</span>
		</div>
		{#if readingTime}
			<div class="flex items-center">
				<IconClock class="w-4 h-4 mr-1" />
				<span>{readingTime} min read</span>
			</div>
		{/if}
	</div>

	{#if type === 'project' && imageUrl}
		<div class="mb-8 overflow-hidden rounded-lg shadow-lg" in:fade={{ duration: 500, delay: 800 }}>
			<img
				src={imageUrl}
				alt={title}
				class="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
			/>
		</div>
	{/if}

	<div
		class="flex flex-wrap gap-2 mb-6"
		in:fly={{ y: 20, duration: 500, delay: 1000, easing: cubicOut }}
	>
		<Badge {type} variant="type" onclick={() => filterByType(type)} />
		{#if topics && topics.length > 0}
			{#each topics as topic}
				<Badge {topic} variant="topic" onclick={() => filterByTopic(topic)} />
			{/each}
		{/if}
	</div>

	{#if type === 'project' && summary}
		<div class="mb-8 text-lg text-base-content" in:fade={{ duration: 500, delay: 1200 }}>
			<p class="leading-relaxed">{summary}</p>
		</div>
	{/if}

	{#if type === 'project' && (githubUrl || liveUrl)}
		<div
			class="flex flex-wrap gap-4 mb-8"
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
		class="prose prose-lg prose-base-content max-w-none"
		in:fade={{ duration: 500, delay: 1600 }}
	>
		{@render children()}
	</div>
</article>
