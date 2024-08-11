<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Badge from '$lib/components/Badge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import IconGithub from '~icons/mdi/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCalendar from '~icons/lucide/calendar';
	import IconClock from '~icons/lucide/clock';
	import IconArrowLeft from '~icons/lucide/arrow-left';
	import ReadingEnhancements from '$lib/components/ReadingEnhancements.svelte';
	import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';

	let {
		title,
		date,
		lastUpdated,
		topics,
		type,
		imageBasePath,
		githubUrl,
		liveUrl,
		summary,
		readingTime,
		children
	} = $props();

	function formatDates(publishedDate, lastUpdatedDate) {
		let dateString = `Published on ${formatDate(publishedDate)}`;
		if (lastUpdatedDate && lastUpdatedDate !== publishedDate) {
			dateString += ` • Last updated on ${formatDate(lastUpdatedDate)}`;
		}
		return dateString;
	}

	function goBack() {
		history.back();
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<ReadingEnhancements />

<article class="min-h-screen bg-[#0c0f1a] w-full relative">
	<div class="absolute inset-0 z-0 opacity-5 mix-blend-overlay">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<filter id="noiseFilter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.65"
					numOctaves="3"
					stitchTiles="stitch"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#noiseFilter)" />
		</svg>
	</div>
	<div class="relative z-10 container mx-auto px-4 max-w-3xl py-24">
		<button
			onclick={goBack}
			class="mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
			in:fly={{ x: -20, duration: 500, delay: 200, easing: cubicOut }}
		>
			<IconArrowLeft class="w-4 h-4 mr-2" /> Back
		</button>

		{#if imageBasePath}
			<div class="mb-8 overflow-hidden rounded-lg shadow-lg">
				<ResponsiveImage {imageBasePath} imageType="full" aspectRatio="16/9" alt={title} />
			</div>
		{:else}
			<p class="text-gray-400">No image available for this post</p>
		{/if}

		<h1
			class="text-4xl md:text-5xl font-display font-bold mb-6 text-white leading-tight"
			in:fly={{ y: 20, duration: 500, delay: 400, easing: cubicOut }}
		>
			{title}
		</h1>

		<div
			class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-400 mb-8"
			in:fade={{ duration: 500, delay: 600 }}
		>
			<div class="flex items-center">
				<IconCalendar class="w-4 h-4 mr-2" />
				<span>{formatDates(date, lastUpdated)}</span>
			</div>
			{#if readingTime}
				<div class="flex items-center">
					<IconClock class="w-4 h-4 mr-2" />
					<span>{readingTime} min read</span>
				</div>
			{/if}
		</div>

		<div
			class="flex flex-wrap gap-3 mb-8"
			in:fly={{ y: 20, duration: 500, delay: 1000, easing: cubicOut }}
		>
			<Badge {type} variant="type" />
			{#if topics && topics.length > 0}
				{#each topics as topic}
					<Badge {topic} variant="topic" />
				{/each}
			{/if}
		</div>

		{#if summary}
			<div
				class="mb-12 text-lg text-gray-300 leading-relaxed"
				in:fade={{ duration: 500, delay: 1200 }}
			>
				<p>{summary}</p>
			</div>
		{/if}

		{#if type === 'project' && (githubUrl || liveUrl)}
			<div
				class="flex flex-wrap gap-4 mb-12"
				in:fly={{ y: 20, duration: 500, delay: 1400, easing: cubicOut }}
			>
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
					>
						<IconGithub class="w-5 h-5 mr-2" /> View on GitHub
					</a>
				{/if}
				{#if liveUrl}
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
					>
						<IconExternalLink class="w-5 h-5 mr-2" /> Live Demo
					</a>
				{/if}
			</div>
		{/if}

		<div class="prose prose-base max-w-none space-y-6" in:fade={{ duration: 500, delay: 1600 }}>
			{@render children()}
		</div>
	</div>
</article>
