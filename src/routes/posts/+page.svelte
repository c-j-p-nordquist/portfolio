<script>
	import { fade, fly } from 'svelte/transition';
	import { formatDate } from '$lib/utils/formatDate';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconFilter from '~icons/lucide/filter';
	import Badge from '$lib/components/Badge.svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';

	let { data } = $props();

	let isFilterOpen = $state(false);
	let selectedTopics = $state([]);
	let selectedType = $state('all');
	let allTopics = $state([]);
	let filteredItems = $state([]);

	let items = data.posts || [];

	function initializeFilters() {
		untrack(() => {
			const urlParams = new URLSearchParams($page.url.searchParams);
			selectedType = urlParams.get('type') || 'all';
			selectedTopics = urlParams.getAll('topic');
			allTopics = [...new Set(items.flatMap((item) => item.topics || []))];
		});
	}

	function applyFilters() {
		untrack(() => {
			filteredItems = items.filter((item) => {
				const topicMatch =
					selectedTopics.length === 0 ||
					(item.topics && item.topics.some((topic) => selectedTopics.includes(topic)));
				const typeMatch = selectedType === 'all' || item.type === selectedType;
				return topicMatch && typeMatch;
			});
		});
	}

	$effect(() => {
		initializeFilters();
		applyFilters();
	});

	function toggleFilter() {
		isFilterOpen = !isFilterOpen;
	}

	function toggleTopic(topic) {
		untrack(() => {
			selectedTopics = selectedTopics.includes(topic)
				? selectedTopics.filter((t) => t !== topic)
				: [...selectedTopics, topic];
			applyFilters();
			updateUrl();
		});
	}

	function toggleType(type) {
		untrack(() => {
			selectedType = type === selectedType ? 'all' : type;
			applyFilters();
			updateUrl();
		});
	}

	function clearFilters() {
		untrack(() => {
			selectedTopics = [];
			selectedType = 'all';
			applyFilters();
			updateUrl();
		});
	}

	function updateUrl() {
		const params = new URLSearchParams();
		if (selectedType !== 'all') params.append('type', selectedType);
		selectedTopics.forEach((t) => params.append('topic', t));
		goto(`?${params.toString()}`, { replaceState: true, noscroll: true, keepfocus: true });
	}

	$effect(() => {
		document.title = 'Blog & Projects - Philip Nordquist';
	});
</script>

<div class="min-h-screen bg-base-100 text-base-content">
	<main class="container mx-auto px-4 py-8 pt-20">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-4xl font-bold text-primary">Blog & Projects</h1>
			<button class="btn btn-accent btn-sm" onclick={toggleFilter} aria-label="Filter content">
				<IconFilter class="w-4 h-4 mr-2" /> Filter
			</button>
		</div>

		{#if selectedTopics.length > 0 || selectedType !== 'all'}
			<div class="bg-base-200 p-4 rounded-lg mb-8" transition:fade={{ duration: 300 }}>
				<div class="flex justify-between items-center mb-2">
					<h2 class="text-lg font-semibold text-primary">Active Filters</h2>
					<button
						onclick={clearFilters}
						class="text-accent hover:text-accent-focus transition-colors duration-200"
					>
						Clear All
					</button>
				</div>
				<div class="flex flex-wrap gap-2">
					{#if selectedType !== 'all'}
						<Badge type={selectedType} onclick={() => toggleType(selectedType)} variant="type" />
					{/if}
					{#each selectedTopics as topic}
						<Badge {topic} onclick={() => toggleTopic(topic)} variant="topic" />
					{/each}
				</div>
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredItems as item, index (item.slug)}
				<article
					class="bg-base-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-rotate-1"
					in:fly={{ y: 50, duration: 500, delay: index * 150 }}
				>
					{#if item.imageUrl}
						<div class="relative h-48 overflow-hidden">
							<img
								src={item.imageUrl}
								alt={item.title}
								class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent"></div>
						</div>
					{/if}
					<div class="p-6 relative">
						<h2 class="text-xl font-display font-bold mb-2 text-primary">
							<a href={item.path} class="hover:text-primary-focus transition-colors duration-200">
								{item.title}
							</a>
						</h2>
						<div class="flex items-center space-x-4 text-sm text-base-content mb-2">
							<div class="flex items-center">
								<IconCalendar class="w-4 h-4 mr-1" />
								<span>{formatDate(item.date)}</span>
							</div>
							{#if item.readingTime}
								<div class="flex items-center">
									<IconClock class="w-4 h-4 mr-1" />
									<span>{item.readingTime} min read</span>
								</div>
							{/if}
						</div>
						{#if item.description}
							<p class="text-base-content mb-4">{item.description}</p>
						{/if}
						<div class="flex flex-wrap gap-2 mb-4">
							<Badge type={item.type} onclick={() => toggleType(item.type)} variant="type" />
							{#if item.topics}
								{#each item.topics as topic}
									<Badge {topic} onclick={() => toggleTopic(topic)} variant="topic" />
								{/each}
							{/if}
						</div>
						{#if item.type === 'project'}
							<div class="flex gap-4 mt-4">
								{#if item.githubUrl}
									<a
										href={item.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-primary hover:text-primary-focus transition-colors duration-200 flex items-center"
									>
										<IconGithub class="w-5 h-5 mr-1" /> GitHub
									</a>
								{/if}
								{#if item.liveUrl}
									<a
										href={item.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-primary hover:text-primary-focus transition-colors duration-200 flex items-center"
									>
										<IconExternalLink class="w-5 h-5 mr-1" /> Live Demo
									</a>
								{/if}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		{#if filteredItems.length === 0}
			<p class="text-center text-xl mt-8 text-base-content">
				No items found for the selected filters.
			</p>
		{/if}
	</main>
</div>

<FilterModal
	isOpen={isFilterOpen}
	{allTopics}
	{selectedTopics}
	{selectedType}
	onClose={toggleFilter}
	onToggleTopic={toggleTopic}
	onChangeType={toggleType}
	onClearFilters={clearFilters}
/>
