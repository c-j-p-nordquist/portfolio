<script>
	let { imageBasePath, imageType = 'card', aspectRatio = '3/2', alt = '' } = $props();

	function getImageUrl(basePath, type, format) {
		return `${basePath}/${type}.${format}`;
	}
</script>

<div class="relative aspect-[{aspectRatio}] overflow-hidden">
	{#if imageBasePath}
		<picture>
			<source srcset={getImageUrl(imageBasePath, imageType, 'webp')} type="image/webp" />
			<img
				src={getImageUrl(imageBasePath, imageType, 'jpg')}
				{alt}
				class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</picture>
	{:else}
		<div class="w-full h-full bg-primary/20 flex items-center justify-center">
			<span class="text-primary/50">No image available</span>
		</div>
	{/if}
</div>
