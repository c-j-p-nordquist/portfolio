<script>
	let { title, description, image, tags, link } = $props();
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
	{#if image}
		<figure><img src={image} alt={title} class="w-full h-48 object-cover" /></figure>
	{/if}
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
		<div class="card-actions justify-end mt-4">
			{#each tags as tag}
				<div class="badge badge-outline">{tag}</div>
			{/each}
		</div>
		<div class="card-actions justify-end mt-4">
			<a href={link} target="_blank" rel="noopener noreferrer" class="btn btn-primary"
				>View Project</a
			>
		</div>
	</div>
</div>
