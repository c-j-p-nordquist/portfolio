<script>
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import Button from '$lib/components/Button.svelte';

	let { callToActionContent } = $props();
</script>

<IntersectionObserver animation="fade-in 1s ease-out" once={true}>
	<section
		class="py-32 relative overflow-hidden flex items-center bg-gradient-to-br from-blue-600 to-purple-600"
	>
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
			<h2 class="text-5xl sm:text-6xl font-bold mb-6 font-serif leading-tight text-white">
				{callToActionContent.title}
			</h2>
			<p class="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
				{callToActionContent.subtitle}
			</p>
			<Button variant="hero" animate={true}>{callToActionContent.ctaText}</Button>
		</div>
	</section>
</IntersectionObserver>
