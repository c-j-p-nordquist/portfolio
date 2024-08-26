<script>
	let { data } = $props();
	const projects = data.projects;

	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head>
	<title>Projects | Philip Nordquist</title>
	<meta name="description" content="Browse all projects" />
</svelte:head>

<div class="container mx-auto">
	<h1 class="text-4xl font-heading text-center mb-12">Projects</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</div>
