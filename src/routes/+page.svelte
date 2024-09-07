<script>
	import { heroContent, sections, callToActionContent } from '$lib/data/landingPageContent.js';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import CtaSection from '$lib/components/home/CtaSection.svelte';
	import ContentSection from '$lib/components/home/ContentSection.svelte';
</script>

<div class="relative">
	<!-- Hero Section -->
	<HeroSection {heroContent} />

	<!-- Content Sections -->
	{#each sections as section, index}
		<ContentSection {section} {index} />
	{/each}

	<!-- CTA Section -->
	<CtaSection {callToActionContent} />
</div>
