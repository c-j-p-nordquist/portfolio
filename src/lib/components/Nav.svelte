<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import NavItems from './NavItems.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';
	import IconSearch from '~icons/lucide/search';
	import SocialLinks from './SocialLinks.svelte';
	import SearchModal from './SearchModal.svelte';
	import { getPosts } from '$lib/utils/posts';
	import { projects } from '$lib/data/projectData';

	let { isNavVisible } = $props();

	let currentPath = $derived($page.url.pathname);
	let isScrolled = $state(false);
	let drawerChecked = $state(false);
	let showSearchModal = $state(false);

	let featuredProjects = $derived(projects.filter((project) => project.featured).slice(0, 3));
	let postsPromise = getPosts().then((posts) => posts.slice(0, 3));

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
		if (showSearchModal) {
			drawerChecked = false;
		}
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
				<a href="/" class="btn btn-ghost normal-case text-xl text-primary-content">
					<img src="/images/logo.svg" alt="Your Logo" class="h-8 w-auto" />
				</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				{#await postsPromise}
					<p>Loading...</p>
				{:then featuredPosts}
					<NavItems {currentPath} {featuredProjects} {featuredPosts} />
				{:catch error}
					<p>Error loading posts: {error.message}</p>
				{/await}
			</div>
			<div class="navbar-end flex items-center justify-end space-x-4 pr-4">
				<button class="btn btn-ghost btn-circle" onclick={toggleSearchModal}>
					<IconSearch class="h-5 w-5" />
				</button>
				<SocialLinks />
				<DarkModeToggle />
			</div>
		</nav>
	</div>

	{#if drawerChecked}
		<div class="drawer-side z-50">
			<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu p-4 w-80 min-h-full bg-base-200">
				{#await postsPromise}
					<p>Loading...</p>
				{:then featuredPosts}
					<NavItems {currentPath} isMobile={true} {featuredProjects} {featuredPosts} />
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
