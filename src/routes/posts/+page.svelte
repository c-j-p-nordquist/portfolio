<script>
	import { formatDate } from '$lib/utils/formatDate';

	let { data } = $props();
</script>

<svelte:head>
	<title>Writing – Philip Nordquist</title>
	<meta
		name="description"
		content="Projects and posts about infrastructure, DevOps, and things I've built."
	/>
	<meta property="og:title" content="Writing – Philip Nordquist" />
	<meta property="og:description" content="Projects and notes on infrastructure, DevOps tooling, and side projects." />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-4">
		Writing
	</h1>
	<p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-10">
		Projects and notes on things I've been working on.
	</p>

	{#if data.posts.length > 0}
		<div class="space-y-1">
			{#each data.posts as post}
				<a href={post.path} class="block group -mx-4 px-4 py-4 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors">
					<article>
						<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
							<h2 class="font-medium flex items-center gap-1.5 text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
								{post.title}
								<svg class="w-3.5 h-3.5 shrink-0 text-stone-300 dark:text-stone-700 group-hover:text-stone-500 dark:group-hover:text-stone-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
							</h2>
							<span class="text-sm text-stone-400 dark:text-stone-600 shrink-0">
								{formatDate(post.date)}
							</span>
						</div>
						<p class="text-sm text-stone-500 dark:text-stone-500 leading-relaxed">
							{post.description}
						</p>
					</article>
				</a>
			{/each}
		</div>
	{:else}
		<p class="text-stone-400 dark:text-stone-600">
			Nothing here yet.
		</p>
	{/if}
</div>
