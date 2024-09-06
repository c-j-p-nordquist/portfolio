<script>
	import { formatDate } from '$lib/utils/formatDate';
	let { post, observed } = $props();
</script>

<a
	href={post.path}
	class="group flex flex-col h-full bg-transparent rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
>
	{#if post.imageBasePath}
		<img
			src={`${post.imageBasePath}/card.webp`}
			alt={post.title}
			class="w-full h-48 object-cover rounded-t-lg"
		/>
	{/if}
	<div class="p-6 flex flex-col flex-grow">
		<h2
			class="text-xl font-bold font-heading text-primary dark:text-darkText mb-2 group-hover:text-secondary transition-colors duration-300"
		>
			{post.title}
		</h2>
		<p class="text-subtitleText dark:text-darkSubtitleText mb-4 flex-grow">{post.description}</p>
		<div class="flex flex-wrap gap-2 mb-4">
			{#each post.topics as topic}
				<span
					class="bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary text-xs font-medium px-2.5 py-0.5 rounded"
				>
					{topic}
				</span>
			{/each}
		</div>
		<p class="text-sm text-mutedText dark:text-darkMutedText mt-auto">
			Published on {formatDate(post.date)}
		</p>
	</div>
</a>
