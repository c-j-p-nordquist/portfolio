<script>
	let { post } = $props();
</script>

<a
	href={post.path}
	class="bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
>
	{#if post.imageBasePath}
		<img
			src={`${post.imageBasePath}/card.webp`}
			alt={post.title}
			class="w-full h-48 object-cover"
		/>
	{/if}
	<div class="p-6">
		<h2 class="text-xl font-semibold text-white mb-2">{post.title}</h2>
		<p class="text-gray-400 mb-4">{post.description}</p>
		<div class="flex flex-wrap gap-2">
			{#each post.topics as topic}
				<span class="bg-gray-700 text-white text-xs font-medium px-2.5 py-0.5 rounded">
					{topic}
				</span>
			{/each}
		</div>
		<p class="text-sm text-gray-500 mt-4">
			Published on {new Date(post.date).toLocaleDateString()}
		</p>
	</div>
</a>
