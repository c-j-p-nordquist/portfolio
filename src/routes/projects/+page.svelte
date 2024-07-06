<script>
	import { onMount } from 'svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projectData.js';

	let filteredProjects = $state(projects);
	let selectedTag = $state('All');

	$effect(() => {
		if (selectedTag === 'All') {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((project) => project.tags.includes(selectedTag));
		}
	});

	let allTags = $derived(['All', ...new Set(projects.flatMap((project) => project.tags))]);

	function selectTag(tag) {
		selectedTag = tag;
	}

	onMount(() => {
		document.title = 'My Projects - Portfolio';
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">My Projects</h1>

	<div class="mb-6 flex flex-wrap gap-2">
		{#each allTags as tag}
			<button
				class="btn btn-sm"
				classList={{ 'btn-primary': selectedTag === tag }}
				onclick={() => selectTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredProjects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
</main>
