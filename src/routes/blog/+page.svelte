<script>
	let { data } = $props();
	const blogPosts = data.blogPosts;

	import BlogCard from '$lib/components/BlogCard.svelte';
</script>

<svelte:head>
	<title>Blog | Philip Nordquist</title>
	<meta name="description" content="Browse all blog posts" />
</svelte:head>

<div class="container mx-auto">
	<h1 class="text-4xl font-heading text-center mb-12">Blog Posts</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each blogPosts as post}
			<BlogCard {post} />
		{/each}
	</div>
</div>
