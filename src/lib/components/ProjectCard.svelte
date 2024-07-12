<script>
	import { onMount } from 'svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconImage from '~icons/lucide/image';

	let { title, description, imageUrl, tags, githubUrl, liveUrl } = $props();
	let imageLoaded = $state(false);
	let imageError = $state(false);
	let truncatedDescription = $state('');

	$effect(() => {
		truncatedDescription =
			description.length > 100 ? description.slice(0, 97) + '...' : description;
	});

	onMount(() => {
		if (imageUrl) {
			const img = new Image();
			img.onload = () => {
				imageLoaded = true;
			};
			img.onerror = () => {
				imageError = true;
			};
			img.src = imageUrl;
		}
	});
</script>

<div
	class="card bg-base-200 shadow-xl h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
>
	<figure class="relative overflow-hidden h-48 bg-base-300">
		{#if imageLoaded}
			<img
				src={imageUrl}
				alt={title}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
			/>
		{:else if imageError || !imageUrl}
			<div class="w-full h-full flex items-center justify-center">
				<IconImage class="w-16 h-16 text-base-content opacity-30" />
			</div>
		{/if}
	</figure>
	<div class="card-body flex-grow flex flex-col justify-between">
		<div>
			<h2 class="card-title text-primary">{title}</h2>
			<p class="text-base-content mt-2">{truncatedDescription}</p>
			<div class="flex flex-wrap gap-2 mt-3">
				{#each tags as tag}
					<span class="badge badge-secondary badge-outline font-mono text-xs">{tag}</span>
				{/each}
			</div>
		</div>
		<div class="card-actions justify-end mt-4">
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-primary btn-sm"
				>
					<IconGithub class="mr-2" />
					GitHub
				</a>
			{/if}
			{#if liveUrl}
				<a href={liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm">
					<IconExternalLink class="mr-2" />
					Live Demo
				</a>
			{/if}
		</div>
	</div>
</div>
