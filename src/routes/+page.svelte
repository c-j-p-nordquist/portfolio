<script>
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import { workHistory } from '$lib/data/workHistory';
	import { services } from '$lib/data/services';

	let featuredExperiences = $derived(workHistory ? workHistory.slice(0, 2) : []);
	let featuredServices = $derived(services ? services.slice(0, 3) : []);
</script>

<div class="bg-base-100 h-full text-base-content font-sans">
	<!-- Hero Section -->
	<section id="hero" class="">
		<Hero
			subtitle="Delivering advanced solutions in observability, security, and automation for secure, scalable IT infrastructures."
		/>
	</section>

	<!-- Featured Services Section -->
	<section id="featured-services" class="bg-base-200 py-24">
		<div class="container mx-auto px-4">
			<h2 class="text-4xl font-heading text-center mb-12">Featured Services</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each featuredServices as service}
					<ServiceCard {service} />
				{/each}
			</div>
			<div class="text-center mt-12">
				<a href="/services" class="btn btn-primary">View All Services</a>
			</div>
		</div>
	</section>

	<!-- Featured Experience Section -->
	<section id="featured-experience" class="py-24">
		<div class="container mx-auto px-4">
			<h2 class="text-4xl font-heading text-center mb-12">Featured Experience</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{#each featuredExperiences as experience}
					<ExperienceCard {experience} />
				{/each}
			</div>
			<div class="text-center mt-12">
				<a href="/experience" class="btn btn-primary">View Full Experience</a>
			</div>
		</div>
	</section>
</div>
