<script>
	import { page } from '$app/stores';

	let isMenuOpen = $state(false);

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/posts', label: 'Writing' }
	];

	function isActive(href) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}
</script>

<nav class="sticky top-0 z-[100] bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
	<div class="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
		<a href="/" class="text-sm font-medium text-stone-900 dark:text-stone-100 tracking-tight">
			Philip Nordquist
		</a>

		<div class="hidden sm:flex items-center gap-6">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm transition-colors {isActive(item.href)
						? 'text-stone-900 dark:text-stone-100'
						: 'text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300'}"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<button
			class="sm:hidden text-stone-600 dark:text-stone-400"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label="Toggle menu"
		>
			<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				{#if isMenuOpen}
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
				{/if}
			</svg>
		</button>
	</div>

	{#if isMenuOpen}
		<div class="sm:hidden border-t border-stone-200 dark:border-stone-800 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3 space-y-1">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={() => (isMenuOpen = false)}
					class="block py-2 text-sm transition-colors {isActive(item.href)
						? 'text-stone-900 dark:text-stone-100'
						: 'text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300'}"
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>
