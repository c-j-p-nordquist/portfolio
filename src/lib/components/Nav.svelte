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

	let navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/posts', label: 'Blog & Projects' },
		{ href: '/about', label: 'About' }
	];

	afterNavigate(() => {
		isMenuOpen = false;
	});
</script>

{#snippet navLink(item)}
	<a
		href={item.href}
		class="px-3 py-2 rounded-md text-sm font-medium text-base-content hover:text-primary transition-colors duration-200"
		class:text-primary={$page.url.pathname === item.href}
	>
		{item.label}
	</a>
{/snippet}

<nav class="bg-base-100 border-b border-base-300">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0">
					<span class="text-2xl font-bold text-primary">PN</span>
				</a>
				<div class="hidden md:block ml-10">
					<div class="flex items-baseline space-x-4">
						{#each navItems as item}
							{@render navLink(item)}
						{/each}
					</div>
				</div>
			</div>
			<div class="flex items-center">
				<button
					class="p-1 rounded-full text-base-content hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-primary"
					onclick={() => (showSearchModal = true)}
					aria-label="Toggle search"
				>
					<IconSearch class="w-6 h-6" />
				</button>
				<DarkModeToggle />
				<div class="md:hidden ml-3">
					<button
						class="p-2 rounded-md text-base-content hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-primary"
						onclick={() => (isMenuOpen = !isMenuOpen)}
					>
						{#if isMenuOpen}
							<IconX class="h-6 w-6" />
						{:else}
							<IconMenu class="h-6 w-6" />
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
				{#each navItems as item}
					{@render navLink(item)}
				{/each}
			</div>
		</div>
	{/if}
</nav>

{#if showSearchModal}
	<SearchModal {posts} onClose={() => (showSearchModal = false)} />
{/if}
