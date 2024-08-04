<script>
	import PostCard from './PostCard.svelte';
	import { goto } from '$app/navigation';

	export let featuredPosts;

	function handleTopicClick(topic) {
		goto(`/posts?topic=${encodeURIComponent(topic)}`);
	}

	function handleTypeClick(type) {
		goto(`/posts?type=${encodeURIComponent(type)}`);
	}
</script>

<div class="space-y-12">
	<h2 class="text-3xl font-bold text-center mb-8 text-base-content">Featured Work</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each featuredPosts as post (post.slug)}
			<PostCard {post} onTopicClick={handleTopicClick} onTypeClick={handleTypeClick} />
		{/each}
	</div>
</div>
