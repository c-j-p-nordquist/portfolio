<script>
	import { fade } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projectData.js';

	let filteredProjects = $state([]);
	let selectedTag = $state('All');
	let allTags = $state(['All']);

	$effect(() => {
		allTags = ['All', ...new Set(projects.flatMap((project) => project.tags))];
	});

	$effect(() => {
		filteredProjects = projects.filter((project) => {
			return selectedTag === 'All' || project.tags.includes(selectedTag);
		});
	});

	function selectTag(tag) {
		selectedTag = tag;
	}

	$effect(() => {
		document.title = 'My Projects - Philip Nordquist';
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">My Projects</h1>

	<div class="mb-6 flex flex-col gap-4">
		<h2 class="text-2xl font-semibold">Filters</h2>
		<div class="flex flex-wrap gap-2">
			{#each allTags as tag}
				<button
					class="btn btn-sm"
					class:btn-primary={selectedTag === tag}
					onclick={() => selectTag(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>

	{#if filteredProjects.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project (project.id)}
				<div in:fade={{ duration: 300 }}>
					<ProjectCard {...project} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center text-xl mt-8">No projects found matching your criteria.</p>
	{/if}
</main>
