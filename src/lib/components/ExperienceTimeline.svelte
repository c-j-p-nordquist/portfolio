<script>
	import { fly } from 'svelte/transition';
	import ExperienceCard from './ExperienceCard.svelte';
	import { workHistory } from '$lib/data/workHistory';
	import { useIntersectionObserver } from '$lib/utils/useIntersectionObserver.svelte.js';

	let observers = workHistory.map(() => useIntersectionObserver({ threshold: 0.5 }));
</script>

{#snippet experienceTimeline()}
	<div class="container mx-auto px-4">
		<div class="flex flex-col md:flex-row">
			<!-- Timeline -->
			<div
				class="hidden md:block md:w-1/4 md:sticky md:top-24 md:h-[calc(100vh-6rem)] p-4
                       w-full overflow-x-auto whitespace-nowrap sticky bg-background z-10 md:bg-transparent"
			>
				<div class="bg-secondary rounded-lg p-4 md:rounded-none md:bg-transparent flex md:block">
					<h2 class="text-xl font-bold mb-4 text-text md:text-center">Timeline</h2>
					{#each workHistory as experience, index}
						<div
							class="py-2 md:py-4 inline-block md:block transition-all duration-300 text-gray-400"
							class:text-accent={observers[index].observed}
							class:text-gray-400={!observers[index].observed}
						>
							<h3 class="font-bold text-text">{experience.company}</h3>
							<p class="text-sm">{experience.start} - {experience.end}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Experiences List -->
			<div class="md:w-3/4">
				{#each workHistory as experience, index}
					<div class="mb-16" bind:this={observers[index].ref}>
						<div in:fly={{ y: 50, duration: 500 }}>
							<ExperienceCard {experience} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/snippet}

{@render experienceTimeline()}
