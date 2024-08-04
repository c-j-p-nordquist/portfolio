<script>
	import { fade, fly } from 'svelte/transition';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconFilter from '~icons/lucide/filter';
	import IconX from '~icons/lucide/x';
	import PostCard from '$lib/components/PostCard.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import {
		initializeFilters,
		toggleTopic,
		toggleType,
		clearFilters,
		getSelectedTopics,
		getSelectedType,
		getAllTopics,
		getFilteredItems
	} from '$lib/utils/filter.svelte.js';

	let { data } = $props();

	let isFilterOpen = $state(false);

	$effect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		initializeFilters(data.posts, urlParams);
	});

	function toggleFilter() {
		isFilterOpen = !isFilterOpen;
	}

	$effect(() => {
		document.title = 'Blog & Projects - Philip Nordquist';
	});
</script>

<div class="min-h-screen bg-base-100 text-base-content">
	<main class="container mx-auto px-4 py-8">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-4xl font-bold text-base-content">Blog & Projects</h1>
			<button class="btn btn-primary btn-sm" onclick={toggleFilter} aria-label="Filter content">
				<IconFilter class="w-4 h-4 mr-2" /> Filter
			</button>
		</div>

		{#if getSelectedTopics().length > 0 || getSelectedType() !== 'all'}
			<div
				class="bg-base-200 border border-base-300 p-2 rounded-lg mb-4 shadow-sm flex items-center flex-wrap gap-2"
				transition:fade={{ duration: 300 }}
			>
				<span class="text-sm font-semibold text-base-content mr-2">Active Filters:</span>
				{#if getSelectedType() !== 'all'}
					<Badge
						type={getSelectedType()}
						onclick={() => toggleType(getSelectedType())}
						variant="type"
					/>
				{/if}
				{#each getSelectedTopics() as topic}
					<Badge {topic} onclick={() => toggleTopic(topic)} variant="topic" />
				{/each}
				<button
					onclick={clearFilters}
					class="btn btn-ghost btn-xs text-primary hover:text-primary-focus"
				>
					<IconX class="w-4 h-4 mr-1" /> Clear All
				</button>
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each getFilteredItems() as item, index (item.slug)}
				<div in:fly={{ y: 50, duration: 500, delay: index * 150 }}>
					<PostCard post={item} />
				</div>
			{/each}
		</div>

		{#if getFilteredItems().length === 0}
			<p class="text-center text-xl mt-8 text-base-content opacity-80">
				No items found for the selected filters.
			</p>
		{/if}
	</main>
</div>

<FilterModal
	isOpen={isFilterOpen}
	allTopics={getAllTopics()}
	selectedTopics={getSelectedTopics()}
	selectedType={getSelectedType()}
	onClose={toggleFilter}
	{toggleTopic}
	{toggleType}
	{clearFilters}
/>
