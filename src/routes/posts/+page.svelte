<script>
	import { formatDate } from '$lib/utils/formatDate';

	let { data } = $props();
	let activeTab = $state('all');

	let filteredPosts = $derived.by(() => {
		if (activeTab === 'all') return data.posts;
		return data.posts.filter((post) => post.type === activeTab);
	});
</script>

<svelte:head>
	<title>Writing – Philip Nordquist</title>
	<meta
		name="description"
		content="Posts about infrastructure, DevOps, and things I've built."
	/>
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-4">
		Writing
	</h1>
	<p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-10">
		Notes on infrastructure, DevOps tooling, and side projects.
	</p>

	<div class="flex gap-4 mb-12 border-b border-stone-200 dark:border-stone-800">
		{#each ['all', 'project', 'blog'] as tab}
			<button
				type="button"
				class="pb-2 text-sm transition-colors border-b-2 -mb-px {activeTab === tab
					? 'border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
					: 'border-transparent text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400'}"
				onclick={() => (activeTab = tab)}
			>
				{tab === 'all' ? 'All' : tab === 'project' ? 'Projects' : 'Articles'}
			</button>
		{/each}
	</div>

	{#if filteredPosts.length > 0}
		<div class="space-y-8">
			{#each filteredPosts as post}
				<a href={post.path} class="block group">
					<article>
						<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
							<h2 class="font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
								{post.title}
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
