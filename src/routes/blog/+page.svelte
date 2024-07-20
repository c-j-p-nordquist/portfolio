<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils/formatDate';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconFilter from '~icons/lucide/filter';

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
		if (selectedTopics.includes(topic)) {
			selectedTopics = selectedTopics.filter((t) => t !== topic);
		} else {
			selectedTopics = [...selectedTopics, topic];
		}
	}

	function clearFilters() {
		selectedTopics = [];
	}

	$effect(() => {
		document.title = 'Blog - Philip Nordquist';
	});
</script>

<main class="container mx-auto px-4 py-8 max-w-3xl">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-4xl font-bold">Blog Posts</h1>
		<button class="btn btn-primary" onclick={toggleFilter}>
			<IconFilter class="mr-2" /> Filter
		</button>
	</div>

	<div class="space-y-6">
		{#each filteredPosts as post}
			<div class="card bg-base-100 shadow-xl" transition:fade={{ duration: 300 }}>
				<div class="card-body">
					<h2 class="card-title font-serif">
						<a href={post.path} class="hover:text-primary transition-colors duration-200">
							{post.title}
						</a>
					</h2>
					<p class="text-base-content font-sans text-opacity-60">
						Published on {formatDate(post.date)}
					</p>
					{#if post.description}
						<p class="font-sans">{post.description}</p>
					{/if}
					{#if post.topics}
						<div class="card-actions justify-end mt-4">
							{#each post.topics as topic}
								<div class="badge badge-outline">{topic}</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if filteredPosts.length === 0}
		<p class="text-center text-xl mt-8">No posts found for the selected topics.</p>
	{/if}
</main>

<FilterModal
	isOpen={isFilterOpen}
	{allTopics}
	{selectedTopics}
	onClose={toggleFilter}
	onToggleTopic={toggleTopic}
	onClearFilters={clearFilters}
/>
