<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';
	import IconSearch from '~icons/lucide/search';
	import NavItems from './NavItems.svelte';
	import SocialLinks from './SocialLinks.svelte';
	import SearchModal from './SearchModal.svelte';

	let { isNavVisible } = $props();

	let currentPath = $derived($page.url.pathname);
	let isScrolled = $state(false);
	let drawerChecked = $state(false);
	let showSearchModal = $state(false);

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

	function closeDrawer() {
		drawerChecked = false;
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
		<div
			class="navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full
                   {isScrolled ? 'bg-base-100 bg-opacity-80 backdrop-blur-sm' : 'bg-transparent'}
                   {isNavVisible ? 'translate-y-0' : '-translate-y-full'}"
		>
			<div class="navbar-content max-w-5xl w-full mx-auto px-4">
				<div class="navbar-start flex items-center">
					<div class="flex-none lg:hidden mr-2">
						<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-ghost btn-sm p-0">
							<IconMenu class="h-6 w-6" />
						</label>
					</div>
					<a
						href="/"
						class="relative py-2 px-3 text-base hover:text-primary transition-colors duration-200"
					>
						<img src="/images/logo.svg" alt="PN Logo" class="w-8 h-8" />
					</a>
				</div>
				<div class="navbar-center hidden lg:flex">
					<NavItems {currentPath} {closeDrawer} />
				</div>
				<div class="navbar-end flex items-center space-x-2">
					<button
						class="relative py-2 text-base hover:text-primary transition-colors duration-200"
						onclick={toggleSearchModal}
					>
						<IconSearch class="h-5 w-5" />
					</button>
					<SocialLinks />
					<DarkModeToggle
						class="relative py-2 px-3 text-base hover:text-primary transition-colors duration-200"
					/>
				</div>
			</div>
		</div>
	</div>
	{#if drawerChecked}
		<div class="drawer-side z-50">
			<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
				<NavItems {currentPath} isMobile={true} {closeDrawer} />
				<li class="mt-8">
					<button
						onclick={toggleSearchModal}
						class="w-full justify-start text-xl py-4 hover:text-primary transition-colors duration-200"
					>
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

<style>
	.navbar {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	:global(.dark-mode-toggle) {
		padding: 0.5rem !important;
	}

	:global(body:not(.dark)) .hover\:text-primary:hover {
		color: #0fa4af !important;
	}

	:global(body.dark) .hover\:text-primary:hover {
		color: #964734 !important;
	}
</style>
