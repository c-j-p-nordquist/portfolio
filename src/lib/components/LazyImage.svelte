<script>
	let { src, alt, class: className = '' } = $props();

	let loaded = $state(false);
	let thisImage = $state(null);

	$effect(() => {
		if (!thisImage) return;

		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						thisImage.src = src;
						observer.unobserve(thisImage);
					}
				});
			});

			observer.observe(thisImage);
			return () => observer.disconnect();
		} else {
			// Fallback for browsers that don't support IntersectionObserver
			thisImage.src = src;
		}
	});

	function onLoad() {
		loaded = true;
	}
</script>

<img
	bind:this={thisImage}
	{alt}
	class={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
	onload={onLoad}
/>
