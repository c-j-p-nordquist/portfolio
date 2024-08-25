<script>
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import { workHistory } from '$lib/data/workHistory';
</script>

<div class="container mx-auto">
	<h1 class="text-4xl font-heading text-center mb-12">Work Experience</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		{#each workHistory as experience}
			<ExperienceCard {experience} />
		{/each}
	</div>
</div>
