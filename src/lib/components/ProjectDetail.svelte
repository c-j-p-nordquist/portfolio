<script>
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { projects } from '$lib/data/projectData.js';

	let { id, title, description, imageUrl, tags, githubUrl, liveUrl } = $props();

	let relatedProjects = $derived(
		projects.filter((p) => p.id !== id && p.tags.some((tag) => tags.includes(tag))).slice(0, 3)
	);
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="text-sm breadcrumbs mb-4">
		<ul>
			<li>
				<a href="/" class="text-secondary hover:text-primary transition-colors duration-200">Home</a
				>
			</li>
			<li>
				<a href="/projects" class="text-secondary hover:text-primary transition-colors duration-200"
					>Projects</a
				>
			</li>
			<li class="text-primary">{title}</li>
		</ul>
	</div>

	<article class="mb-12">
		<h1 class="text-4xl font-serif font-bold mb-6 text-primary">{title}</h1>

		<LazyImage
			src={imageUrl}
			alt={title}
			class="w-full h-64 object-cover rounded-lg mb-8 shadow-md"
		/>

		<p class="text-lg mb-6 text-secondary">{description}</p>

		<div class="flex flex-wrap gap-2 mb-8">
			{#each tags as tag}
				<span class="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{tag}</span>
			{/each}
		</div>

		<div class="flex flex-wrap gap-4 mb-8">
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center text-primary hover:text-accent transition-colors duration-200"
				>
					<IconGithub class="mr-2" /> View on GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center text-primary hover:text-accent transition-colors duration-200"
				>
					<IconExternalLink class="mr-2" /> Live Demo
				</a>
			{/if}
		</div>
	</article>

	{#if relatedProjects.length > 0}
		<section>
			<h2 class="text-2xl font-serif font-bold mb-6 text-primary">Related Projects</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each relatedProjects as project (project.id)}
					<div class="flex flex-col">
						<LazyImage
							src={project.imageUrl}
							alt={project.title}
							class="w-full h-48 object-cover rounded-lg shadow-md mb-4"
						/>
						<h3 class="text-xl font-serif font-bold mb-2 text-primary">
							<a
								href={`/projects/${project.id}`}
								class="hover:text-accent transition-colors duration-200"
							>
								{project.title}
							</a>
						</h3>
						<p class="text-secondary mb-2 text-sm">{project.summary}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
