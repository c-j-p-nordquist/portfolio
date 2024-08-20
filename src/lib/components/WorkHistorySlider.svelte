<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconCalendar from '~icons/lucide/calendar';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconPlus from '~icons/lucide/plus';
	import IconMinus from '~icons/lucide/minus';
	import IconCloud from '~icons/lucide/cloud';
	import IconLock from '~icons/lucide/lock';
	import IconCode from '~icons/lucide/code';
	import IconMusic from '~icons/lucide/music';
	import IconGlobe from '~icons/lucide/globe';
	import IconUserSearch from '~icons/lucide/user-search';
	import IconChevronLeft from '~icons/lucide/chevron-left';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import Badge from '$lib/components/Badge.svelte';

	let { workHistory } = $props();

	let container;
	let expandedCards = $state(new Set());
	let activeCardIndex = $state(0);
	let cardRefs = $state([]);
	let isLargeScreen = $state(false);
	let canScrollLeft = $state(false);
	let canScrollRight = $state(false);

	const industryIcons = {
		'Cloud Services': IconCloud,
		Cybersecurity: IconLock,
		Music: IconMusic,
		Web: IconGlobe,
		Research: IconUserSearch
	};

	function getIndustryIcon(industry) {
		return industryIcons[industry] || IconCode;
	}

	function toggleCardExpansion(index, event) {
		event.stopPropagation(); // Prevent the card from being activated
		expandedCards = new Set(expandedCards);
		if (expandedCards.has(index)) {
			expandedCards.delete(index);
		} else {
			expandedCards.add(index);
		}
	}

	function handleScroll() {
		if (!isLargeScreen) {
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

		updateScrollButtons();
	}

	function updateScrollButtons() {
		canScrollLeft = container.scrollLeft > 0;
		canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth;
	}

	function scrollToCard(index) {
		if (cardRefs[index]) {
			const card = cardRefs[index];
			const containerWidth = container.clientWidth;
			const cardWidth = card.clientWidth;
			const scrollPosition = card.offsetLeft - (containerWidth - cardWidth) / 2;
			container.scrollTo({
				left: scrollPosition,
				behavior: 'smooth'
			});
		}
	}

	function handleResize() {
		isLargeScreen = window.innerWidth >= 768; // Adjust this breakpoint as needed
		updateScrollButtons();
	}

	function handleCardInteraction(index) {
		activeCardIndex = index;
		if (!isLargeScreen) {
			scrollToCard(index);
		}
	}

	function scrollContainer(direction) {
		const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the container width
		container.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		container.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('resize', handleResize);
			container.removeEventListener('scroll', handleScroll);
		};
	});

	function getContrastColor(hexColor) {
		const r = parseInt(hexColor.slice(1, 3), 16);
		const g = parseInt(hexColor.slice(3, 5), 16);
		const b = parseInt(hexColor.slice(5, 7), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5 ? '#000000' : '#FFFFFF';
	}
</script>

<div class="relative w-full h-[calc(100vh-6rem)] overflow-hidden">
	{#if isLargeScreen}
		<button
			class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md transition-opacity duration-300 {canScrollLeft
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			onclick={() => scrollContainer('left')}
			aria-label="Scroll left"
		>
			<IconChevronLeft class="w-6 h-6 text-gray-600 dark:text-gray-300" />
		</button>
		<button
			class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md transition-opacity duration-300 {canScrollRight
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			onclick={() => scrollContainer('right')}
			aria-label="Scroll right"
		>
			<IconChevronRight class="w-6 h-6 text-gray-600 dark:text-gray-300" />
		</button>
	{/if}

	<ul
		bind:this={container}
		class="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-full py-8 px-4 md:px-8 list-none"
		aria-label="Work history timeline"
	>
		{#each workHistory as job, index}
			<li
				bind:this={cardRefs[index]}
				class="flex-none w-[85vw] md:w-[30vw] max-w-md h-[calc(100%-2rem)] p-6 rounded-3xl mr-4 md:mr-6 snap-center transition-transform transform-gpu duration-300 ease-out relative lg:hover:scale-105 lg:hover:shadow-lg"
				class:scale-105={activeCardIndex === index && !isLargeScreen}
				class:shadow-lg={activeCardIndex === index && !isLargeScreen}
				style="background-color: {job.color}; color: {getContrastColor(job.color)};"
				in:fade={{ duration: 300, delay: index * 100 }}
			>
				<button
					class="w-full h-full text-left"
					onclick={() => handleCardInteraction(index)}
					aria-label="{job.company} - {job.position}"
					aria-expanded={expandedCards.has(index)}
				>
					<div class="relative h-full flex flex-col overflow-y-auto">
						{#if !expandedCards.has(index)}
							<div class="flex flex-col justify-between h-full">
								{#key 'collapsed'}
									<div in:fade={{ duration: 200, delay: 50 }}>
										<div
											class="w-16 h-16 mb-4 rounded-full bg-opacity-20 bg-white flex items-center justify-center"
											aria-hidden="true"
										>
											<svelte:component this={getIndustryIcon(job.industry)} class="w-8 h-8" />
										</div>
										<h3 class="text-2xl font-serif font-bold mb-2">
											{job.company}
										</h3>
										<p class="text-xl font-sans mb-4 opacity-90">
											{job.position}
										</p>
										<div class="flex items-center font-sans text-sm mb-2 opacity-80">
											<IconCalendar class="w-4 h-4 mr-2" aria-hidden="true" />
											<span>{job.period}</span>
										</div>
										<div class="flex items-center font-sans text-sm mb-4 opacity-80">
											<IconMapPin class="w-4 h-4 mr-2" aria-hidden="true" />
											<span>{job.location}</span>
										</div>
									</div>
								{/key}
							</div>
						{:else}
							<div class="flex flex-col justify-between h-full">
								{#key 'expanded'}
									<div in:fade={{ duration: 200, delay: 50 }}>
										<p class="mb-4 opacity-90">{job.description}</p>
										<h4 class="font-sans font-semibold mb-2 text-sm">Key Skills</h4>
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
				</button>
				<button
					class="absolute bottom-4 right-4 p-4 text-white rounded-full transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
					style="background-color: {getContrastColor(job.color) === '#000000'
						? 'rgba(0,0,0,0.1)'
						: 'rgba(255,255,255,0.2)'}"
					onclick={(event) => toggleCardExpansion(index, event)}
					aria-label={expandedCards.has(index) ? 'Collapse job details' : 'Expand job details'}
				>
					<div class="w-6 h-6 flex items-center justify-center">
						{#if expandedCards.has(index)}
							<IconMinus class="w-5 h-5" aria-hidden="true" />
						{:else}
							<IconPlus class="w-5 h-5" aria-hidden="true" />
						{/if}
					</div>
				</button>
			</li>
		{/each}
	</ul>
	{#if !isLargeScreen}
		<div
			class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
			role="tablist"
		>
			{#each workHistory as job, index}
				<button
					class="w-4 h-4 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-dark-primary"
					class:bg-emerald-500={activeCardIndex === index}
					class:dark:bg-dark-primary={activeCardIndex === index}
					class:bg-gray-300={activeCardIndex !== index}
					class:dark:bg-gray-700={activeCardIndex !== index}
					onclick={() => scrollToCard(index)}
					role="tab"
					aria-selected={activeCardIndex === index}
					aria-label="View {job.company} job details"
				></button>
			{/each}
		</div>
	{/if}
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
