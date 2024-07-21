<script>
	import { formatDate } from '$lib/utils/formatDate';
	import { page } from '$app/stores';

	let { children, title, date, topics } = $props();

	let currentPath = $derived($page.url.pathname);
	let pathSegments = $derived(currentPath.split('/').filter(Boolean));
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="container mx-auto px-4 py-8 max-w-3xl">
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
	<p class="text-base-content text-opacity-60 mb-4">Published on {formatDate(date)}</p>
	{#if topics && topics.length > 0}
		<div class="mb-8">
			{#each topics as topic}
				<span class="badge badge-outline mr-2">{topic}</span>
			{/each}
		</div>
	{/if}
	<div class="prose lg:prose-xl font-sans">
		{@render children()}
	</div>
</article>
