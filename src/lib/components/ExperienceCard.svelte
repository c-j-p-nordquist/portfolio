<script>
	import { fly, scale } from 'svelte/transition';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconCalendar from '~icons/lucide/calendar';

	export let experience;
</script>

<div
	class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105 rounded-lg overflow-hidden"
	in:fly={{ y: 50, duration: 500 }}
>
	<div class="card-body p-6">
		<div class="flex items-start mb-4">
			<div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center mr-4">
				<svelte:component this={experience.industry} class="w-8 h-8 text-primary-content" />
			</div>
			<div>
				<h2 class="card-title text-2xl font-heading">{experience.position}</h2>
				<h3 class="text-xl text-accent">{experience.company}</h3>
			</div>
		</div>

		<div class="flex items-center text-sm mb-4 text-gray-400">
			<IconMapPin class="w-4 h-4 mr-2" />
			<span class="mr-4">{experience.location}</span>
			<IconCalendar class="w-4 h-4 mr-2" />
			<span>{experience.start} - {experience.end}</span>
		</div>

		<p class="mb-6 text-gray-400">{experience.description}</p>

		{#if experience.skills && experience.skills.length}
			<div class="mb-4" in:fly={{ y: 20, duration: 300, delay: 200 }}>
				<h4 class="font-bold mb-2 text-text">Key Skills:</h4>
				<div class="flex flex-wrap gap-2">
					{#each experience.skills as skill, i}
						<span
							class="badge bg-primary bg-opacity-20 text-primary text-xs px-2 py-1"
							in:scale={{ duration: 200, delay: i * 50 }}>{skill}</span
						>
					{/each}
				</div>
			</div>
		{/if}

		{#if experience.techstack && experience.techstack.length}
			<div in:fly={{ y: 20, duration: 300, delay: 400 }}>
				<h4 class="font-bold mb-2 text-text">Tech Stack:</h4>
				<div class="flex flex-wrap gap-2">
					{#each experience.techstack as tech, i}
						<span
							class="badge bg-secondary bg-opacity-20 text-secondary text-xs px-2 py-1"
							in:scale={{ duration: 200, delay: i * 50 }}>{tech}</span
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
