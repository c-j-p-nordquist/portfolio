<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { SITE_URL, OG_IMAGE } from '$lib/site.js';

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

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	let metaItems = $derived.by(() => {
		const items = [formatDate(date)];
		if (lastUpdated && lastUpdated !== date) items.push(`Updated ${formatDate(lastUpdated)}`);
		if (readingTime > 0) items.push(`${readingTime} min read`);
		return items;
	});
</script>

<svelte:head>
	<title>{title} – Philip Nordquist</title>
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	{#if summary}
		<meta property="og:description" content={summary} />
	{/if}
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Philip Nordquist — Platform & DevSecOps Engineer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if summary}
		<meta name="twitter:description" content={summary} />
	{/if}
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<article class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<header class="mb-12">
		<a
			href="/posts"
			class="group inline-flex items-center gap-1 mb-8 text-sm text-muted dark:text-muted-dark hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
		>
			<svg
				class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
				focusable="false"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/></svg
			>
			Posts
		</a>

		<h1
			class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 leading-tight mb-4"
		>
			{title}
		</h1>

		<div class="text-sm text-muted dark:text-muted-dark mb-4">
			{#each metaItems as item, i}
				{#if i > 0}<span class="mx-1.5">·</span>{/if}
				<span>{item}</span>
			{/each}
		</div>

		{#if topics && topics.length > 0}
			<div class="flex flex-wrap gap-2 mb-6">
				{#each topics as topic}
					<span
						class="text-xs text-muted dark:text-muted-dark bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded"
					>
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
						class="group inline-flex items-center gap-1 text-sm text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
					>
						GitHub
						<svg
							class="w-3 h-3 text-muted dark:text-muted-dark group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							focusable="false"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
							/></svg
						>
					</a>
				{/if}
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="group inline-flex items-center gap-1 text-sm text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
					>
						Live demo
						<svg
							class="w-3 h-3 text-muted dark:text-muted-dark group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							focusable="false"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
							/></svg
						>
					</a>
				{/if}
			</div>
		{/if}

		<hr class="border-stone-200 dark:border-stone-800 mt-8" />
	</header>

	<div
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
