<script>
	import ReadingEnhancements from '$lib/components/ReadingEnhancements.svelte';
	let { title, date, description, topics, children } = $props();
</script>

<svelte:head>
	<title>{title} | Your Blog Name</title>
	<meta name="description" content={description} />
</svelte:head>

<article class="prose dark:prose-invert lg:prose-xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
	<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{title}</h1>
	<p class="text-sm text-gray-400 mb-4">Published on {new Date(date).toLocaleDateString()}</p>
	<div class="flex flex-wrap gap-2 mb-8">
		{#each topics as topic}
			<span class="bg-accent bg-opacity-20 text-accent text-xs font-medium px-2.5 py-0.5 rounded">
				{topic}
			</span>
		{/each}
	</div>
	<div class="prose prose-lg dark:prose-invert">
		{@render children()}
	</div>
	<ReadingEnhancements />
</article>

<style>
	/* Add any blog-specific styles here */
	:global(.prose-invert) {
		--tw-prose-body: theme('colors.text');
		--tw-prose-headings: theme('colors.text');
		--tw-prose-links: theme('colors.accent');
		--tw-prose-bold: theme('colors.text');
		--tw-prose-counters: theme('colors.text');
		--tw-prose-bullets: theme('colors.text');
		--tw-prose-hr: theme('colors.secondary');
		--tw-prose-quotes: theme('colors.text');
		--tw-prose-quote-borders: theme('colors.accent');
		--tw-prose-captions: theme('colors.text');
		--tw-prose-code: theme('colors.accent');
		--tw-prose-pre-code: theme('colors.text');
		--tw-prose-pre-bg: theme('colors.background');
		--tw-prose-th-borders: theme('colors.secondary');
		--tw-prose-td-borders: theme('colors.secondary');
	}
</style>
