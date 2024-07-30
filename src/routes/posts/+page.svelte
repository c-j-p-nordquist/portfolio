<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils/formatDate';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import IconFilter from '~icons/lucide/filter';
	import Badge from '$lib/components/Badge.svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';

	let { data } = $props();

	let isFilterOpen = $state(false);
	let selectedTopics = $state([]);
	let selectedType = $state('all');
	let allTopics = $state([]);
	let filteredItems = $state([]);

	let items = data.posts || [];

	$effect(() => {
		allTopics = [...new Set(items.flatMap((item) => item.topics || []))];
	});

	$effect(() => {
		filteredItems = items.filter((item) => {
			const topicMatch =
				selectedTopics.length === 0 ||
				(item.topics && item.topics.some((topic) => selectedTopics.includes(topic)));
			const typeMatch = selectedType === 'all' || item.type === selectedType;
			return topicMatch && typeMatch;
		});
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
		selectedType = 'all';
	}

	function formatDates(publishedDate, lastUpdatedDate) {
		let dateString = `Published on ${formatDate(publishedDate)}`;
		if (lastUpdatedDate && lastUpdatedDate !== publishedDate) {
			dateString += ` • Last updated on ${formatDate(lastUpdatedDate)}`;
		}
		return dateString;
	}

	$effect(() => {
		document.title = 'Blog & Projects - Philip Nordquist';
	});
</script>

<div class="flex min-h-screen">
	<main class="flex-grow p-8 pt-20 max-w-4xl mx-auto">
		<div class="text-sm breadcrumbs mb-4">
			<ul>
				<li>
					<a href="/" class="text-secondary hover:text-primary transition-colors duration-200"
						>Home</a
					>
				</li>
				<li class="text-primary">Blog & Projects</li>
			</ul>
		</div>

		<div class="flex justify-between items-center mb-8">
			<h1 class="text-4xl font-serif font-bold text-primary">Blog & Projects</h1>
			<button
				class="text-secondary hover:text-primary transition-colors duration-200"
				onclick={toggleFilter}
				aria-label="Filter content"
			>
				<IconFilter class="w-6 h-6" />
			</button>
		</div>

		<div class="space-y-12">
			{#each filteredItems as item (item.slug)}
				<article
					class="border-b border-secondary/20 pb-8 last:border-b-0"
					transition:fade={{ duration: 300 }}
				>
					<div class="flex flex-col md:flex-row gap-6">
						{#if item.type === 'project' && item.imageUrl}
							<div class="w-full md:w-1/3 h-48 bg-secondary/10 rounded overflow-hidden">
								<img
									src={item.imageUrl}
									alt={item.title}
									class="w-full h-full object-cover"
									loading="lazy"
									decoding="async"
								/>
							</div>
						{/if}
						<div class="flex-1">
							<h2 class="text-2xl font-serif font-bold mb-2">
								<a
									href={item.path}
									class="text-primary hover:text-accent transition-colors duration-200"
								>
									{item.title}
								</a>
							</h2>
							<p class="text-sm text-secondary mb-2">
								{formatDates(item.date, item.lastUpdated)}
							</p>
							{#if item.description}
								<p class="text-base text-secondary mb-4">{item.description}</p>
							{/if}
							<div class="flex flex-wrap gap-2 mb-4">
								<Badge type={item.type} />
								{#if item.topics}
									{#each item.topics as topic}
										<Badge {topic} />
									{/each}
								{/if}
							</div>
							{#if item.type === 'project'}
								<div class="flex gap-4">
									{#if item.githubUrl}
										<a
											href={item.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="text-secondary hover:text-primary transition-colors duration-200"
										>
											<IconGithub class="inline mr-1" /> GitHub
										</a>
									{/if}
									{#if item.liveUrl}
										<a
											href={item.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="text-secondary hover:text-primary transition-colors duration-200"
										>
											<IconExternalLink class="inline mr-1" /> Live Demo
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if filteredItems.length === 0}
			<p class="text-center text-xl mt-8 text-secondary">
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
	onChangeType={(type) => (selectedType = type)}
	onClearFilters={clearFilters}
/>
