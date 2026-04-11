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

	let metaItems = $derived.by(() => {
		const items = [formatDate(date)];
		if (lastUpdated && lastUpdated !== date) items.push(`Updated ${formatDate(lastUpdated)}`);
		if (readingTime > 0) items.push(`${readingTime} min read`);
		return items;
	});
</script>

<svelte:head>
	<title>{title} – Philip Nordquist</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	{#if summary}
		<meta property="og:description" content={summary} />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
</svelte:head>

<article class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<header class="mb-12">
		<a
			href="/posts"
			class="group inline-flex items-center gap-1 mb-8 text-sm text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
		>
			<svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
			Posts
		</a>

		<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight mb-4">
			{title}
		</h1>

		<div class="text-sm text-stone-400 dark:text-stone-600 mb-4">
			{#each metaItems as item, i}
				{#if i > 0}<span class="mx-1.5">·</span>{/if}
				<span>{item}</span>
			{/each}
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
						class="group inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
					>
						GitHub
						<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
					</a>
				{/if}
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="group inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
					>
						Live demo
						<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
					</a>
				{/if}
			</div>
		{/if}

		<hr class="border-stone-200 dark:border-stone-800 mt-8" />
	</header>

	<div
		bind:this={contentElement}
		class="prose prose-stone dark:prose-invert max-w-none
			prose-headings:tracking-tight prose-headings:font-semibold
			prose-a:underline-offset-4 prose-a:decoration-stone-300 dark:prose-a:decoration-stone-700
			prose-a:hover:decoration-stone-500
			prose-pre:rounded-lg prose-pre:border prose-pre:border-stone-200 dark:prose-pre:border-stone-800
			prose-pre:font-mono
			prose-code:text-sm prose-code:font-normal prose-code:font-mono
			prose-img:rounded-lg
			prose-hr:border-stone-200 dark:prose-hr:border-stone-800"
	>
		{@render children()}
	</div>
</article>
