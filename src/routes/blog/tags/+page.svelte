<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let { data } = $props();
	let visible = $state(false);
	let selectedTag = $derived($page.url.searchParams.get('tag') || '');

	let allTags = $derived([...new Set(data.posts.flatMap((post) => post.topics))]);
	let filteredPosts = $derived(
		selectedTag ? data.posts.filter((post) => post.topics.includes(selectedTag)) : data.posts
	);

	$effect(() => {
		document.title = selectedTag
			? `Posts tagged with "${selectedTag}" - Philip Nordquist's Blog`
			: "All Tags - Philip Nordquist's Blog";
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center">
				{selectedTag ? `Posts tagged with "${selectedTag}"` : 'All Tags'}
			</h1>

			<div class="mb-8 flex flex-wrap gap-2">
				{#each allTags as tag}
					<a
						href={`/blog/tags?tag=${encodeURIComponent(tag)}`}
						class="btn btn-sm {selectedTag === tag ? 'btn-primary' : 'btn-outline'}"
					>
						{tag}
					</a>
				{/each}
			</div>

			<div class="space-y-8">
				{#each filteredPosts as post}
					<article class="card bg-base-200 shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl">
								<a href={`/blog/${post.slug}`} class="hover:underline">{post.title}</a>
							</h2>
							<p class="mb-4">{post.excerpt}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}
</main>
