<script>
	import { fly } from 'svelte/transition';
	import ExperienceCard from './ExperienceCard.svelte';
	import { workHistory } from '$lib/data/workHistory';
	import { useIntersectionObserver } from '$lib/utils/useIntersectionObserver.svelte.js';

	let observers = workHistory.map(() => useIntersectionObserver({ threshold: 0.5 }));
</script>

<div class="flex flex-col lg:flex-row">
	<!-- Timeline -->
	<div class="lg:w-1/4 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] mb-8 lg:mb-0">
		<div
			class="bg-white/10 dark:bg-darkBackground/30 backdrop-blur-md p-4 rounded-lg lg:bg-transparent lg:backdrop-blur-none lg:p-0"
		>
			<h2
				class="text-2xl font-serif font-bold mb-6 text-primary dark:text-darkText text-center lg:text-left"
			>
				Career Timeline
			</h2>
			<div
				class="flex lg:flex-col overflow-x-auto lg:overflow-x-visible whitespace-nowrap lg:whitespace-normal"
			>
				{#each workHistory as experience, index}
					<div
						class="mr-6 lg:mr-0 lg:mb-8 transition-all duration-300"
						class:text-accent={observers[index].observed}
						class:text-subtitleText={!observers[index].observed}
						class:dark:text-darkSubtitleText={!observers[index].observed}
					>
						<h3 class="font-bold text-primary dark:text-darkText">{experience.company}</h3>
						<p class="text-sm">{experience.start} - {experience.end}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Experiences List -->
	<div class="lg:w-3/4">
		{#each workHistory as experience, index}
			<div class="mb-16" bind:this={observers[index].ref}>
				<div in:fly={{ y: 50, duration: 500, delay: index * 100 }}>
					<ExperienceCard {experience} />
				</div>
			</div>
		{/each}
	</div>
</div>
