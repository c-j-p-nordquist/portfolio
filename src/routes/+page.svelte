<script>
	import { fade, fly, scale } from 'svelte/transition';
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedContent from '$lib/components/FeaturedContent.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import IconSearch from '~icons/lucide/search';
	import IconChevronDown from '~icons/lucide/chevron-down';

	let { data } = $props();
	let title = $state('Design for Failure, Operate for Success');
	let subtitle = $state(
		'Insights on resilient systems, operational excellence, and modern infrastructure'
	);
	let showSearchModal = $state(false);
	let featuredPosts = $derived(data.posts.filter((post) => post.featured).slice(0, 3));
	let featuredContentRef;
	let heroVisible = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
	}

	function scrollToFeaturedContent() {
		featuredContentRef.scrollIntoView({ behavior: 'smooth' });
	}

	function handleMouseMove(event) {
		mouseX = event.clientX / window.innerWidth;
		mouseY = event.clientY / window.innerHeight;
	}

	$effect(() => {
		heroVisible = true;
	});
</script>

<svelte:head>
	<title>{title} - {subtitle}</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} />

<div
	class="min-h-screen flex flex-col bg-gradient-to-br from-primary-950 to-secondary-900 text-white overflow-hidden"
>
	<nav class="absolute top-0 left-0 right-0 z-10 p-4">
		<div class="container mx-auto flex justify-between items-center">
			<a
				href="/"
				class="text-2xl font-display font-bold text-white hover:text-primary-300 transition-colors duration-200"
				>PN</a
			>
			<div class="flex items-center gap-4">
				<button
					class="text-white hover:text-primary-300 transition-colors duration-200"
					onclick={toggleSearchModal}
					aria-label="Toggle search"
				>
					<IconSearch class="w-6 h-6" />
				</button>
			</div>
		</div>
	</nav>

	<main class="flex-grow flex flex-col justify-center items-center px-4 py-20 relative">
		<div
			class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-gradient-xy"
		></div>
		<div
			class="absolute inset-0"
			style="background: radial-gradient(circle at {mouseX * 100}% {mouseY *
				100}%, rgba(94, 234, 212, 0.15) 0%, rgba(217, 70, 239, 0.15) 25%, rgba(255, 146, 3, 0.15) 50%, transparent 100%)"
		></div>
		{#if heroVisible}
			<div in:fade={{ duration: 1000, delay: 300 }} class="relative z-10">
				<Hero {title} {subtitle} />
			</div>
		{/if}
		<div class="mt-12 relative z-10" in:fade={{ duration: 1000, delay: 800 }}>
			<button
				onclick={scrollToFeaturedContent}
				class="text-white hover:text-primary-300 transition-colors duration-200 animate-bounce"
				aria-label="Scroll to featured content"
			>
				<IconChevronDown class="w-8 h-8" />
			</button>
		</div>
	</main>

	<div bind:this={featuredContentRef} class="bg-base-100 dark:bg-secondary-900 py-20 relative">
		<div class="absolute inset-0 bg-gradient-to-b from-primary-950/50 to-transparent"></div>
		<div class="container mx-auto px-4 relative z-10">
			<h2
				class="text-4xl font-display font-bold text-center mb-12 text-primary-950 dark:text-white"
			>
				Featured Work
			</h2>
			<FeaturedContent {featuredPosts} />
		</div>
	</div>
</div>

{#if showSearchModal}
	<SearchModal posts={data.posts} onClose={toggleSearchModal} />
{/if}
