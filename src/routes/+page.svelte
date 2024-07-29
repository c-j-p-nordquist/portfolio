<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedContent from '$lib/components/FeaturedContent.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import IconSearch from '~icons/lucide/search';
	import IconChevronDown from '~icons/lucide/chevron-down';

	let { data } = $props();
	let title = $state('Design for Failure, Operate for Success');
	let subtitle = $state('A personal portfolio and blog');
	let showSearchModal = $state(false);
	let featuredPosts = $derived(data.posts.filter((post) => post.featured).slice(0, 3));
	let featuredContentRef;

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
	}

	function scrollToFeaturedContent() {
		featuredContentRef.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{title} - {subtitle}</title>
</svelte:head>

{#snippet desktopLayout()}
	<div class="h-screen flex">
		<div class="w-2/3 p-12 relative overflow-hidden bg-base-100">
			<nav class="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
				<a href="/" class="text-2xl font-serif font-bold text-primary">Philip Nordquist</a>
				<button
					class="text-secondary hover:text-primary transition-colors duration-200"
					onclick={toggleSearchModal}
					aria-label="Toggle search"
				>
					Search
				</button>
				<DarkModeToggle />
			</nav>
			<Hero {title} {subtitle} />
		</div>
		<aside class="w-1/3 bg-primary text-white overflow-y-auto">
			<FeaturedContent {featuredPosts} />
		</aside>
	</div>
{/snippet}

{#snippet mobileLayout()}
	<div class="h-screen flex flex-col">
		<div class="min-h-screen p-6 relative flex flex-col">
			<nav class=" flex justify-between items-center">
				<a href="/" class="text-2xl font-serif font-bold text-primary">Philip Nordquist</a>
				<button
					class="text-secondary hover:text-primary transition-colors duration-200"
					onclick={toggleSearchModal}
					aria-label="Toggle search"
				>
					<IconSearch />
				</button>
				<DarkModeToggle />
			</nav>
			<Hero {title} {subtitle} />
			<div class="text-center mt-12 mb-20">
				<button
					onclick={scrollToFeaturedContent}
					class="text-secondary hover:text-primary transition-colors duration-200"
					aria-label="Scroll to featured content"
				>
					<IconChevronDown class="w-8 h-8 animate-bounce" />
				</button>
			</div>
		</div>
		<div bind:this={featuredContentRef} class="bg-primary text-white">
			<FeaturedContent {featuredPosts} />
		</div>
	</div>
{/snippet}

<div class="hidden lg:block">
	{@render desktopLayout()}
</div>

<div class="lg:hidden">
	{@render mobileLayout()}
</div>

{#if showSearchModal}
	<SearchModal posts={data.posts} onClose={toggleSearchModal} />
{/if}
