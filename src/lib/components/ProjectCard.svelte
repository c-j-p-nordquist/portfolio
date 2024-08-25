<script>
	let { project } = $props();
</script>

<div
	class="bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
>
	<a href={project.path} class="block">
		{#if project.imageBasePath}
			<img
				src={`${project.imageBasePath}/card.webp`}
				alt={project.title}
				class="w-full h-48 object-cover"
			/>
		{/if}
		<div class="p-6">
			<h2 class="text-xl font-semibold text-white mb-2">{project.title}</h2>
			<p class="text-gray-400 mb-4">{project.description}</p>
			<div class="flex flex-wrap gap-2 mb-4">
				{#each project.topics as topic}
					<span class="bg-gray-700 text-white text-xs font-medium px-2.5 py-0.5 rounded">
						{topic}
					</span>
				{/each}
			</div>
		</div>
	</a>
	<div class="px-6 pb-6">
		{#if project.githubUrl}
			<a
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-500 hover:underline mr-4">GitHub</a
			>
		{/if}
		{#if project.liveUrl}
			<a
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-green-500 hover:underline">Live Demo</a
			>
		{/if}
		<p class="text-sm text-gray-500 mt-4">
			Last updated: {new Date(project.date).toLocaleDateString()}
		</p>
	</div>
</div>
