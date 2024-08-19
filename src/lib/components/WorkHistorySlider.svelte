<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconCalendar from '~icons/lucide/calendar';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconPlus from '~icons/lucide/plus';
	import IconMinus from '~icons/lucide/minus';
	import Badge from '$lib/components/Badge.svelte';

	let { workHistory } = $props();

	let container;
	let expandedCards = $state(new Set());
	let activeCardIndex = $state(0);
	let cardRefs = $state([]);

	function toggleCardExpansion(index) {
		expandedCards = new Set(expandedCards);
		if (expandedCards.has(index)) {
			expandedCards.delete(index);
		} else {
			expandedCards.add(index);
		}
	}

	function handleScroll() {
		const containerRect = container.getBoundingClientRect();
		const containerCenter = containerRect.left + containerRect.width / 2;

		let closestIndex = 0;
		let closestDistance = Infinity;

		cardRefs.forEach((card, index) => {
			if (card) {
				const cardRect = card.getBoundingClientRect();
				const cardCenter = cardRect.left + cardRect.width / 2;
				const distance = Math.abs(containerCenter - cardCenter);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			}
		});

		activeCardIndex = closestIndex;
	}

	function scrollToCard(index) {
		if (cardRefs[index]) {
			cardRefs[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
		}
	}

	onMount(() => {
		container.addEventListener('scroll', handleScroll);
		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative w-full h-[calc(100vh-6rem)] overflow-hidden">
	<div
		bind:this={container}
		class="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-full py-8 px-4"
	>
		{#each workHistory as job, index}
			<div
				bind:this={cardRefs[index]}
				class="flex-none w-[85vw] max-w-md h-[calc(100%-2rem)] p-6 bg-white dark:bg-dark-surface/100 rounded-3xl shadow-sm mr-6 snap-center transition-all duration-300 ease-out relative"
				class:scale-[1.02]={activeCardIndex === index}
				in:fade={{ duration: 300, delay: index * 100 }}
			>
				<div class="relative h-full flex flex-col overflow-y-auto">
					{#if !expandedCards.has(index)}
						<div class="flex flex-col justify-between h-full">
							{#key 'collapsed'}
								<div in:fade={{ duration: 200, delay: 50 }}>
									<img
										src={job.logo}
										alt="{job.company} logo"
										class="w-16 h-16 mb-4 rounded-full transition-transform duration-300 ease-out"
										class:scale-110={activeCardIndex === index}
									/>
									<h3 class="text-2xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-2">
										{job.company}
									</h3>
									<p class="text-xl text-gray-600 dark:text-gray-400 font-sans mb-4">
										{job.position}
									</p>
									<div
										class="flex items-center text-gray-600 dark:text-gray-400 font-sans text-sm mb-2"
									>
										<IconCalendar class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
										{job.period}
									</div>
									<div
										class="flex items-center text-gray-600 dark:text-gray-400 font-sans text-sm mb-4"
									>
										<IconMapPin class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
										{job.location}
									</div>
								</div>
							{/key}
						</div>
					{:else}
						<div class="flex flex-col justify-between h-full">
							{#key 'expanded'}
								<div in:fade={{ duration: 200, delay: 50 }}>
									<p class="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
									<h4 class="font-sans font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
										Key Skills
									</h4>
									<div class="flex flex-wrap gap-2">
										{#each job.skills as skill}
											<Badge text={skill} variant="skill" />
										{/each}
									</div>
								</div>
							{/key}
						</div>
					{/if}
				</div>
				<button
					class="absolute bottom-4 right-4 p-4 bg-emerald-500 dark:bg-dark-primary text-white rounded-full transition-all duration-150 ease-out hover:bg-emerald-600 dark:hover:bg-dark-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-dark-primary active:scale-95"
					onclick={() => toggleCardExpansion(index)}
				>
					<div class="w-6 h-6 flex items-center justify-center">
						{#if expandedCards.has(index)}
							<IconMinus class="w-5 h-5" />
						{:else}
							<IconPlus class="w-5 h-5" />
						{/if}
					</div>
				</button>
			</div>
		{/each}
	</div>
	<div
		class="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-gray-50 to-transparent dark:from-dark-bg"
	></div>
	<div
		class="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-dark-bg"
	></div>
	<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
		{#each workHistory as _, index}
			<button
				class="w-3 h-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-dark-primary"
				class:bg-emerald-500={activeCardIndex === index}
				class:dark:bg-dark-primary={activeCardIndex === index}
				class:bg-gray-300={activeCardIndex !== index}
				class:dark:bg-gray-700={activeCardIndex !== index}
				onclick={() => scrollToCard(index)}
			></button>
		{/each}
	</div>
</div>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
