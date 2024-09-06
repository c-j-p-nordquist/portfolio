<script>
	import ReadingEnhancements from '$lib/components/ReadingEnhancements.svelte';
	let { title, date, description, topics, githubUrl, liveUrl, children } = $props();
</script>

<svelte:head>
	<title>{title} | Your Projects</title>
	<meta name="description" content={description} />
</svelte:head>

<article class="prose prose-invert lg:prose-xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
	<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{title}</h1>
	<p class="text-sm text-gray-400 mb-4">Last updated: {new Date(date).toLocaleDateString()}</p>
	<div class="flex flex-wrap gap-2 mb-8">
		{#each topics as topic}
			<span class="bg-primary bg-opacity-20 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
				{topic}
			</span>
		{/each}
	</div>
	{#if githubUrl || liveUrl}
		<div class="flex flex-wrap gap-4 mb-8">
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block bg-accent text-background font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
				>
					View on GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block border border-accent text-accent font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 hover:bg-accent hover:text-background"
				>
					Live Demo
				</a>
			{/if}
		</div>
	{/if}
	<div class="prose prose-lg dark:prose-invert">
		{@render children()}
	</div>
	<ReadingEnhancements />
</article>

<style>
	/* Add any project-specific styles here */
	:global(.prose-invert) {
		--tw-prose-body: theme('colors.text');
		--tw-prose-headings: theme('colors.text');
		--tw-prose-links: theme('colors.accent');
		--tw-prose-bold: theme('colors.text');
		--tw-prose-counters: theme('colors.text');
		--tw-prose-bullets: theme('colors.text');
		--tw-prose-hr: theme('colors.secondary');
		--tw-prose-quotes: theme('colors.text');
		--tw-prose-quote-borders: theme('colors.primary');
		--tw-prose-captions: theme('colors.text');
		--tw-prose-code: theme('colors.primary');
		--tw-prose-pre-code: theme('colors.text');
		--tw-prose-pre-bg: theme('colors.background');
		--tw-prose-th-borders: theme('colors.secondary');
		--tw-prose-td-borders: theme('colors.secondary');
	}
</style>
