<script>
	import { fade } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import FilterModal from '$lib/components/FilterModal.svelte';
	import { projects } from '$lib/data/projectData.js';
	import IconFilter from '~icons/lucide/filter';
	import LazyImage from '$lib/components/LazyImage.svelte';

	let isFilterOpen = $state(false);
	let selectedTopics = $state([]);
	let allTopics = $state([]);
	let filteredProjects = $state([]);

	$effect(() => {
		allTopics = [...new Set(projects.flatMap((project) => project.tags))];
	});

	$effect(() => {
		filteredProjects =
			selectedTopics.length === 0
				? projects
				: projects.filter((project) => project.tags.some((tag) => selectedTopics.includes(tag)));
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
		document.title = 'My Projects - Philip Nordquist';
	});
</script>

<div class="flex min-h-screen">
	<main class="flex-grow p-8 pt-20">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-4xl font-bold text-primary">My Projects</h1>
			<button class="btn btn-primary" onclick={toggleFilter}>
				<IconFilter class="mr-2" /> Filter
			</button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project (project.id)}
				<div transition:fade={{ duration: 300 }}>
					<ProjectCard {...project}>
						{#snippet image()}
							<LazyImage
								src={project.imageUrl}
								alt={project.title}
								class="w-full h-48 object-cover"
							/>
						{/snippet}
					</ProjectCard>
				</div>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<p class="text-center text-xl mt-8">No projects found matching your criteria.</p>
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
