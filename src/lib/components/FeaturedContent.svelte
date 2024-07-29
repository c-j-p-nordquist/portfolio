<script>
	import { formatDate } from '$lib/utils/formatDate';
	import Badge from '$lib/components/Badge.svelte';

	let { featuredPosts } = $props();
</script>

<div class="h-full p-8 flex flex-col justify-center">
	<h2 class="text-3xl font-serif font-bold mb-8">Featured Work</h2>
	{#each featuredPosts as post}
		<article class="mb-8 pb-6 border-b border-white/20 last:border-b-0">
			<h3 class="text-xl font-serif font-bold mb-2">
				<a href={`/posts/${post.slug}`} class="hover:text-accent transition-colors duration-200">
					{post.title}
				</a>
			</h3>
			<p class="text-sm mb-2 text-white/70">{formatDate(post.date)}</p>
			<p class="mb-3 text-white/90">{post.description}</p>
			<div class="flex flex-wrap gap-2">
				{#each post.topics || [] as topic}
					<Badge {topic} />
				{/each}
			</div>
		</article>
	{/each}
</div>
