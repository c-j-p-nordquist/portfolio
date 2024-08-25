<script>
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { services } from '$lib/data/services';
</script>

<div class="container mx-auto">
	<h1 class="text-4xl font-heading text-center mb-12">Our Services</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each services as service}
			<ServiceCard {service} />
		{/each}
	</div>
</div>
