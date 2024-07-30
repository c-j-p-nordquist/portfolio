<script>
	import Badge from '$lib/components/Badge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { page } from '$app/stores';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';

	let { children, title, date, lastUpdated, topics, type, imageUrl, githubUrl, liveUrl, summary } =
		$props();

	let currentPath = $derived($page.url.pathname);
	let pathSegments = $derived(currentPath.split('/').filter(Boolean));

	function formatDates(publishedDate, lastUpdatedDate) {
		let dateString = `Published on ${formatDate(publishedDate)}`;
		if (lastUpdatedDate && lastUpdatedDate !== publishedDate) {
			dateString += ` • Last updated on ${formatDate(lastUpdatedDate)}`;
		}
		return dateString;
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="container mx-auto px-4 py-8 max-w-3xl pt-20">
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/">Home</a></li>
			{#each pathSegments as segment, index}
				<li>
					{#if index === pathSegments.length - 1}
						{segment}
					{:else}
						<a href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
							{segment}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<h1 class="text-4xl font-serif font-bold mb-4">{title}</h1>
	<p class="text-base-content text-opacity-60 mb-4">
		{formatDates(date, lastUpdated)}
	</p>

	{#if type === 'project' && imageUrl}
		<img src={imageUrl} alt={title} class="w-full h-64 object-cover rounded-lg mb-6" />
	{/if}

	<div class="flex flex-wrap gap-2 mb-4">
		<Badge {type} />
		{#if topics && topics.length > 0}
			{#each topics as topic}
				<Badge {topic} />
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
					class="text-secondary hover:text-primary transition-colors duration-200"
				>
					<IconGithub class="inline mr-1" /> GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-secondary hover:text-primary transition-colors duration-200"
				>
					<IconExternalLink class="inline mr-1" /> Live Demo
				</a>
			{/if}
		</div>
	{/if}

	{#if type === 'project' && summary}
		<p class="text-lg font-semibold mb-4">{summary}</p>
	{/if}

	<div class="prose lg:prose-xl font-sans">
		{@render children()}
	</div>
</article>
