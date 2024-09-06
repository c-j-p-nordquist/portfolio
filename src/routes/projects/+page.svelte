<script>
	let { data } = $props();
	const projects = data.projects;

	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head>
	<title>Projects | Philip Nordquist</title>
	<meta
		name="description"
		content="Explore Philip Nordquist's portfolio of projects in DevSecOps, cloud architecture, and IT infrastructure management."
	/>
</svelte:head>

<section class="bg-background dark:bg-darkBackground text-text dark:text-darkText py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h1
			class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-primary dark:text-darkText"
		>
			Projects
		</h1>
		<p
			class="text-lg text-center max-w-3xl mx-auto mb-16 text-subtitleText dark:text-darkSubtitleText"
		>
			Discover a collection of innovative solutions and implementations in DevSecOps, cloud
			architecture, and IT infrastructure management.
		</p>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
