<script>
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';

	let { title, description, imageUrl, tags, githubUrl, liveUrl, image } = $props();
</script>

<div
	class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
>
	{@render image()}
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
		<div class="card-actions justify-end mt-4">
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-primary btn-sm"
				>
					<IconGithub class="mr-2" /> GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary btn-sm"
				>
					<IconExternalLink class="mr-2" /> Live Demo
				</a>
			{/if}
		</div>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each tags as tag}
				<span class="badge badge-outline">{tag}</span>
			{/each}
		</div>
	</div>
</div>
