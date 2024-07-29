<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils/formatDate';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconFilter from '~icons/lucide/filter';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();

	let isFilterOpen = $state(false);
	let selectedTopics = $state([]);
	let allTopics = $state([]);
	let filteredPosts = $state([]);

	$effect(() => {
		allTopics = [...new Set(data.posts.flatMap((post) => post.topics || []))];
	});

	$effect(() => {
		filteredPosts =
			selectedTopics.length === 0
				? data.posts
				: data.posts.filter(
						(post) => post.topics && post.topics.some((topic) => selectedTopics.includes(topic))
					);
	});

	function toggleFilter() {
		isFilterOpen = !isFilterOpen;
	}

	function toggleTopic(topic) {
		selectedTopics = selectedTopics.includes(topic)
			? selectedTopics.filter((t) => t !== topic)
			: [...selectedTopics, topic];
	}

	function clearFilters() {
		selectedTopics = [];
	}

	$effect(() => {
		document.title = 'Blog - Philip Nordquist';
	});
</script>

<div class="flex min-h-screen">
	<main class="flex-grow p-8 pt-20 max-w-3xl mx-auto">
		<div class="text-sm breadcrumbs mb-4">
			<ul>
				<li>
					<a href="/" class="text-secondary hover:text-primary transition-colors duration-200"
						>Home</a
					>
				</li>
				<li class="text-primary">Blog</li>
			</ul>
		</div>

		<div class="flex justify-between items-center mb-8">
			<h1 class="text-4xl font-serif font-bold text-primary">Blog Posts</h1>
			<button
				class="text-secondary hover:text-primary transition-colors duration-200"
				onclick={toggleFilter}
				aria-label="Filter blog posts"
			>
				<IconFilter class="w-6 h-6" />
			</button>
		</div>

		<div class="space-y-8">
			{#each filteredPosts as post}
				<article
					class="border-b border-secondary/20 pb-8 last:border-b-0"
					transition:fade={{ duration: 300 }}
				>
					<h2 class="text-2xl font-serif font-bold mb-2">
						<a
							href={post.path}
							class="text-primary hover:text-accent transition-colors duration-200"
						>
							{post.title}
						</a>
					</h2>
					<p class="text-sm text-secondary mb-2">
						Published on {formatDate(post.date)}
					</p>
					{#if post.description}
						<p class="text-base text-secondary mb-4">{post.description}</p>
					{/if}
					{#if post.topics}
						<div class="flex flex-wrap gap-2">
							{#each post.topics as topic}
								<Badge {topic} />
							{/each}
						</div>
					{/if}
				</article>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<p class="text-center text-xl mt-8 text-secondary">No posts found for the selected topics.</p>
		{/if}
	</main>
</div>

<FilterModal
	isOpen={isFilterOpen}
	{allTopics}
	{selectedTopics}
	onClose={toggleFilter}
	onToggleTopic={toggleTopic}
	onClearFilters={clearFilters}
/>
