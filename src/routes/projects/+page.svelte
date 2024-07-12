<script>
	import { fade, fly } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projectData.js';
	import IconSearch from '~icons/lucide/search';
	import IconLoader from '~icons/lucide/loader';

	let filteredProjects = $state([]);
	let selectedTag = $state('All');
	let searchQuery = $state('');
	let allTags = $state(['All']);
	let loading = $state(true);

	$effect(() => {
		allTags = ['All', ...new Set(projects.flatMap((project) => project.tags))];
		setTimeout(() => {
			loading = false;
		}, 500); // Simulating a loading delay
	});

	$effect(() => {
		filteredProjects = projects.filter((project) => {
			const matchesTag = selectedTag === 'All' || project.tags.includes(selectedTag);
			const matchesSearch =
				project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				project.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesTag && matchesSearch;
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
	<h1 class="text-4xl font-bold mb-6 text-primary">My Projects</h1>

	<div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
		<div class="flex flex-wrap gap-2">
			{#each allTags as tag}
				<button
					class="btn btn-sm btn-outline font-mono"
					class:btn-primary={selectedTag === tag}
					onclick={() => selectTag(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
		<div class="relative w-full sm:w-64">
			<input
				type="text"
				placeholder="Search projects..."
				class="input input-bordered w-full pr-10"
				bind:value={searchQuery}
			/>
			<IconSearch class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
		</div>
	</div>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<IconLoader class="animate-spin text-primary w-12 h-12" />
		</div>
	{:else if filteredProjects.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project, index (project.id)}
				<div in:fly={{ y: 50, duration: 300, delay: index * 100 }} out:fade={{ duration: 200 }}>
					<ProjectCard {...project} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center text-xl mt-8 text-accent">No projects found matching your criteria.</p>
	{/if}
</main>
