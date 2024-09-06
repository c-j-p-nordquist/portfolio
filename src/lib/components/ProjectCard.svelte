<script>
	import { formatDate } from '$lib/utils/formatDate';
	let { project, observed } = $props();
</script>

<div
	class="group flex flex-col h-full bg-transparent rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
>
	<a href={project.path} class="block flex-grow">
		{#if project.imageBasePath}
			<img
				src={`${project.imageBasePath}/card.webp`}
				alt={project.title}
				class="w-full h-48 object-cover rounded-t-lg"
			/>
		{/if}
		<div class="p-6">
			<h2
				class="text-xl font-bold font-heading text-primary dark:text-darkText mb-2 group-hover:text-secondary transition-colors duration-300"
			>
				{project.title}
			</h2>
			<p class="text-subtitleText dark:text-darkSubtitleText mb-4">{project.description}</p>
			<div class="flex flex-wrap gap-2 mb-4">
				{#each project.topics as topic}
					<span
						class="bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary text-xs font-medium px-2.5 py-0.5 rounded"
					>
						{topic}
					</span>
				{/each}
			</div>
		</div>
	</a>
	<div class="px-6 pb-6 mt-auto">
		<div class="flex space-x-4 mb-4">
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-secondary/70 hover:text-secondary transition-colors duration-300">GitHub</a
				>
			{/if}
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="text-accent/70 hover:text-accent transition-colors duration-300">Live Demo</a
				>
			{/if}
		</div>
		<p class="text-sm text-mutedText dark:text-darkMutedText">
			Last updated: {formatDate(project.date)}
		</p>
	</div>
</div>
