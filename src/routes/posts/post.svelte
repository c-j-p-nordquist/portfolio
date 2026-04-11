<script>
	import { formatDate } from '$lib/utils/formatDate';
	import { calculateReadingTime } from '$lib/utils/readingTime';

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
		children
	} = $props();

	let contentElement = $state(null);
	let readingTime = $state(0);

	$effect(() => {
		if (contentElement) {
			const content = contentElement.textContent || contentElement.innerText;
			readingTime = calculateReadingTime(content);
		}
	});
</script>

<svelte:head>
	<title>{title} – Philip Nordquist</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<header class="mb-12">
		<a
			href="/posts"
			class="inline-block mb-8 text-sm text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
		>
			&larr; Back to posts
		</a>

		<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight mb-4">
			{title}
		</h1>

		<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-400 dark:text-stone-600 mb-4">
			<span>{formatDate(date)}</span>
			{#if lastUpdated && lastUpdated !== date}
				<span>Updated {formatDate(lastUpdated)}</span>
			{/if}
			{#if readingTime > 0}
				<span>{readingTime} min read</span>
			{/if}
		</div>

		{#if topics && topics.length > 0}
			<div class="flex flex-wrap gap-2 mb-6">
				{#each topics as topic}
					<span class="text-xs text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
						{topic}
					</span>
				{/each}
			</div>
		{/if}

		{#if summary}
			<p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
				{summary}
			</p>
		{/if}

		{#if type === 'project' && (githubUrl || liveUrl)}
			<div class="flex gap-4 mt-6">
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
					>
						View on GitHub
					</a>
				{/if}
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
					>
						Live demo
					</a>
				{/if}
			</div>
		{/if}
	</header>

	<div
		bind:this={contentElement}
		class="prose prose-stone dark:prose-invert max-w-none
			prose-headings:tracking-tight prose-headings:font-semibold
			prose-a:underline-offset-4 prose-a:decoration-stone-300 dark:prose-a:decoration-stone-700
			prose-a:hover:decoration-stone-500
			prose-pre:rounded-lg prose-pre:border prose-pre:border-stone-200 dark:prose-pre:border-stone-800
			prose-code:text-sm prose-code:font-normal
			prose-img:rounded-lg"
	>
		{@render children()}
	</div>
</article>
