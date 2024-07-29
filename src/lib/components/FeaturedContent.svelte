<script>
	import { formatDate } from '$lib/utils/formatDate';
	import Badge from '$lib/components/Badge.svelte';

	let { featuredPosts } = $props();
</script>

<div class="h-full p-8 flex flex-col justify-center" data-theme="dark">
	<h2 class="text-3xl font-serif font-bold mb-8 text-primary">Featured Work</h2>
	{#each featuredPosts as post}
		<article class="mb-8 pb-6 border-b border-neutral/20 last:border-b-0">
			<h3 class="text-xl font-serif font-bold mb-2">
				<a
					href={`/posts/${post.slug}`}
					class="text-primary hover:text-accent transition-colors duration-200"
				>
					{post.title}
				</a>
			</h3>
			<p class="text-sm mb-2 text-secondary">{formatDate(post.date)}</p>
			<p class="mb-3 text-neutral">{post.description}</p>
			<div class="flex flex-wrap gap-2">
				{#each post.topics || [] as topic}
					<Badge {topic} />
				{/each}
			</div>
		</article>
	{/each}
</div>
