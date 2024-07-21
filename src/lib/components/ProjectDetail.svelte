<script>
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projectData.js';

	let { id, title, description, imageUrl, tags, githubUrl, liveUrl } = $props();

	let relatedProjects = $derived(
		projects.filter((p) => p.id !== id && p.tags.some((tag) => tags.includes(tag))).slice(0, 3)
	);
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/projects">Projects</a></li>
			<li>{title}</li>
		</ul>
	</div>

	<article>
		<h1 class="text-4xl font-bold mb-4">{title}</h1>

		<LazyImage src={imageUrl} alt={title} class="w-full h-64 object-cover rounded-lg mb-6" />

		<p class="text-lg mb-6">{description}</p>

		<div class="flex flex-wrap gap-2 mb-6">
			{#each tags as tag}
				<span class="badge badge-outline">{tag}</span>
			{/each}
		</div>

		<div class="flex gap-4 mb-8">
			{#if githubUrl}
				<a href={githubUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
					<IconGithub class="mr-2" /> View on GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a href={liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
					<IconExternalLink class="mr-2" /> Live Demo
				</a>
			{/if}
		</div>
	</article>

	{#if relatedProjects.length > 0}
		<section class="mt-12">
			<h2 class="text-2xl font-bold mb-4">Related Projects</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each relatedProjects as project (project.id)}
					<ProjectCard {...project}>
						{#snippet image()}
							<LazyImage
								src={project.imageUrl}
								alt={project.title}
								class="w-full h-48 object-cover"
							/>
						{/snippet}
					</ProjectCard>
				{/each}
			</div>
		</section>
	{/if}
</div>
