<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import NavItems from './NavItems.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';
	import IconSearch from '~icons/lucide/search';
	import SearchModal from './SearchModal.svelte';
	import { getPosts } from '$lib/utils/posts';
	import { projects } from '$lib/data/projectData';

	let { isNavVisible } = $props();

	let currentPath = $derived($page.url.pathname);
	let isScrolled = $state(false);
	let drawerChecked = $state(false);
	let showSearchModal = $state(false);

	let featuredProjects = $derived(projects.filter((project) => project.featured).slice(0, 3));
	let postsPromise = $state(getPosts().then((posts) => posts.slice(0, 3)));

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
		if (showSearchModal) {
			drawerChecked = false;
		}
	}

	function closeDrawer() {
		drawerChecked = false;
	}

	function closeDrawerAndSearch() {
		drawerChecked = false;
		showSearchModal = false;
	}

	$effect(() => {
		if (browser) {
			const handleScroll = () => {
				isScrolled = window.scrollY > 20;
			};
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-primary-content px-4 py-2 z-50"
>
	Skip to main content
</a>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked} />
	<div class="drawer-content flex flex-col">
		<nav
			class="navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full
			   {isScrolled ? 'bg-primary/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}
			   {isNavVisible ? 'translate-y-0' : '-translate-y-full'}"
		>
			<div class="navbar-start">
				<div class="flex-none lg:hidden">
					<label
						for="my-drawer-3"
						aria-label="open sidebar"
						class="btn btn-square btn-ghost text-primary-content"
					>
						<IconMenu class="h-6 w-6" />
					</label>
				</div>
				<a
					href="/"
					class="btn btn-ghost normal-case flex items-center hover:bg-primary/10 transition-colors duration-300"
				>
					<img src="/images/logos/favicon.svg" alt="Logo" class="h-8 w-auto" />
					<span
						class="hidden md:inline-flex items-baseline ml-2 font-mono md:text-sm lg:text-xl transition-all duration-300 ease-in-out"
					>
						<span class="text-primary">philip</span>
						<span class="text-secondary">.</span>
						<span class="text-primary">nordquist</span>
						<span class="text-secondary">.</span>
						<span class="text-accent">me</span>
					</span>
				</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				{#await postsPromise}
					<p>Loading...</p>
				{:then featuredPosts}
					<NavItems {currentPath} {featuredProjects} {featuredPosts} {closeDrawer} />
				{:catch error}
					<p>Error loading posts: {error.message}</p>
				{/await}
			</div>
			<div class="navbar-end flex items-center justify-end space-x-4 pr-4">
				<button
					class="btn btn-ghost btn-circle text-accent hover:bg-accent/10"
					onclick={toggleSearchModal}
					aria-label="Open search"
				>
					<IconSearch class="h-5 w-5" />
				</button>
				<DarkModeToggle aria-label="Toggle dark mode" />
			</div>
		</nav>
	</div>

	{#if drawerChecked}
		<div class="drawer-side z-50 transition-transform duration-300 ease-in-out">
			<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu p-4 w-80 min-h-full bg-base-200">
				{#await postsPromise}
					<p>Loading...</p>
				{:then featuredPosts}
					<NavItems
						{currentPath}
						isMobile={true}
						{featuredProjects}
						{featuredPosts}
						{closeDrawer}
					/>
				{:catch error}
					<p>Error loading posts: {error.message}</p>
				{/await}
				<li class="mt-4">
					<button onclick={toggleSearchModal} class="btn btn-ghost w-full justify-start text-xl">
						<IconSearch class="mr-2 h-6 w-6" />
						Search
					</button>
				</li>
			</ul>
		</div>
	{/if}
</div>

{#if showSearchModal}
	<SearchModal onClose={closeDrawerAndSearch} />
{/if}
