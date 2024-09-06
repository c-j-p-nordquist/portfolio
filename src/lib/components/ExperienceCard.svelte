<script>
	import { fly, scale } from 'svelte/transition';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconCalendar from '~icons/lucide/calendar';

	let { experience, observed } = $props();
</script>

<div
	class="group flex flex-col h-full bg-transparent rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
>
	<div class="p-6">
		<div class="flex items-start mb-4">
			<div class="w-16 h-16 flex items-center justify-center mr-4">
				<experience.industry
					class="w-12 h-12 transition-colors duration-300 group-hover:text-secondary {observed
						? 'text-secondary md:text-primary/30 dark:md:text-darkText/30'
						: 'text-primary/30 dark:text-darkText/30'}"
				/>
			</div>
			<div>
				<h2 class="text-2xl font-bold font-heading text-primary dark:text-darkText">
					{experience.position}
				</h2>
				<h3 class="text-xl text-subtitleText dark:text-darkSubtitleText">{experience.company}</h3>
			</div>
		</div>

		<div class="flex items-center text-sm mb-4 text-subtitleText dark:text-darkSubtitleText">
			<IconMapPin class="w-4 h-4 mr-2" />
			<span class="mr-4">{experience.location}</span>
			<IconCalendar class="w-4 h-4 mr-2" />
			<span>{experience.start} - {experience.end}</span>
		</div>

		<p class="mb-6 text-text dark:text-darkText">{experience.description}</p>

		{#if experience.skills && experience.skills.length}
			<div class="mb-4" in:fly={{ y: 20, duration: 300, delay: 200 }}>
				<h4 class="font-bold mb-2 text-primary dark:text-darkText">Key Skills:</h4>
				<div class="flex flex-wrap gap-2">
					{#each experience.skills as skill, i}
						<span
							class="bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary text-xs font-medium px-2.5 py-0.5 rounded"
							in:scale={{ duration: 200, delay: i * 50 }}>{skill}</span
						>
					{/each}
				</div>
			</div>
		{/if}

		{#if experience.techstack && experience.techstack.length}
			<div in:fly={{ y: 20, duration: 300, delay: 400 }}>
				<h4 class="font-bold mb-2 text-primary dark:text-darkText">Tech Stack:</h4>
				<div class="flex flex-wrap gap-2">
					{#each experience.techstack as tech, i}
						<span
							class="bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent text-xs font-medium px-2.5 py-0.5 rounded"
							in:scale={{ duration: 200, delay: i * 50 }}>{tech}</span
						>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
