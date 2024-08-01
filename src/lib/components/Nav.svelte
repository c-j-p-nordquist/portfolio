<script>
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import SearchModal from './SearchModal.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconSearch from '~icons/lucide/search';
	import IconMenu from '~icons/lucide/menu';
	import IconX from '~icons/lucide/x';

	let { posts } = $props();
	let showSearchModal = $state(false);
	let isMenuOpen = $state(false);

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
		if (isMenuOpen) closeMenu();
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	let navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/posts', label: 'Blog & Projects' },
		{ href: '/about', label: 'About' }
	];

	afterNavigate(() => {
		closeMenu();
	});
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm">
	<div class="container mx-auto">
		<div class="navbar min-h-16">
			<div class="navbar-start">
				<a
					href="/"
					class="text-2xl font-display font-bold text-primary hover:text-primary-focus transition-colors duration-200"
				>
					<span
						class="bg-primary text-base-content hover:text-primary-300 rounded-full w-10 h-10 flex items-center justify-center"
						>PN</span
					>
				</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="text-base-content hover:text-primary transition-colors duration-200"
								class:text-primary={$page.url.pathname === item.href}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="navbar-end">
				<button
					class="btn btn-ghost btn-circle mr-2"
					onclick={toggleSearchModal}
					aria-label="Toggle search"
				>
					<IconSearch class="w-5 h-5" />
				</button>
				<DarkModeToggle />
				<div class="dropdown dropdown-end lg:hidden">
					<button tabindex="-1" class="btn btn-ghost lg:hidden ml-2" onclick={toggleMenu}>
						{#if isMenuOpen}
							<IconX class="h-6 w-6" />
						{:else}
							<IconMenu class="h-6 w-6" />
						{/if}
					</button>
					{#if isMenuOpen}
						<ul
							tabindex="-1"
							class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							{#each navItems as item}
								<li>
									<a
										href={item.href}
										class:active={$page.url.pathname === item.href}
										onclick={closeMenu}
									>
										{item.label}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>

{#if showSearchModal}
	<SearchModal {posts} onClose={toggleSearchModal} />
{/if}
