<script>
	import Badge from '$lib/components/Badge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
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

	let currentPath = $derived($page.url.pathname);
	let pathSegments = $derived(currentPath.split('/').filter(Boolean));

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
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<ReadingEnhancements />

<article class="container mx-auto px-4 py-8 max-w-3xl pt-20">
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li>
				<a
					href="/"
					class="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
					>Home</a
				>
			</li>
			{#each pathSegments as segment, index}
				<li>
					{#if index === pathSegments.length - 1}
						<span class="text-secondary-500 dark:text-secondary-400">{segment}</span>
					{:else}
						<a
							href={`/${pathSegments.slice(0, index + 1).join('/')}`}
							class="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
						>
							{segment}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<h1 class="text-4xl font-display font-bold mb-4 text-base-content">{title}</h1>

	<div class="flex items-center space-x-4 text-sm text-secondary-500 dark:text-secondary-400 mb-4">
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
		<img src={imageUrl} alt={title} class="w-full h-64 object-cover rounded-lg mb-6 shadow-md" />
	{/if}

	<div class="flex flex-wrap gap-2 mb-4">
		<Badge {type} variant="type" onclick={() => filterByType(type)} />
		{#if topics && topics.length > 0}
			{#each topics as topic}
				<Badge {topic} variant="topic" onclick={() => filterByTopic(topic)} />
			{/each}
		{/if}
	</div>

	{#if type === 'project' && (githubUrl || liveUrl)}
		<div class="flex space-x-4 mb-6">
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
				>
					<IconGithub class="w-5 h-5 mr-1" /> GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
				>
					<IconExternalLink class="w-5 h-5 mr-1" /> Live Demo
				</a>
			{/if}
		</div>
	{/if}

	{#if type === 'project' && summary}
		<p class="text-lg font-semibold mb-4 text-secondary-700 dark:text-secondary-300">{summary}</p>
	{/if}

	<div class="prose dark:prose-invert prose-primary font-body">
		{@render children()}
	</div>
</article>
