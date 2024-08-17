<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let isScrolled = $state(false);
	let isMenuOpen = $state(false);
	let isDarkMode = $state(false);

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	onMount(() => {
		// Initial check for dark mode
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		updateFavicon();

		// Listen for changes in color scheme preference
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e) => {
			isDarkMode = e.matches;
			updateFavicon();
		};
		mediaQuery.addListener(handleChange);

		return () => mediaQuery.removeListener(handleChange);
	});

	function updateFavicon() {
		const favicon = document.getElementById('favicon');
		if (favicon) {
			favicon.href = isDarkMode
				? '/images/logos/favicon-dark.svg'
				: '/images/logos/favicon-light.svg';
		}
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	const navItems = [
		{ href: '/posts', label: 'Projects' },
		{ href: '/about', label: 'About' }
	];
</script>

<nav
	class="fixed w-full z-50 transition-all duration-300 {isScrolled
		? 'bg-white/80 dark:bg-dark-surface backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<img
						src={isDarkMode ? '/images/logos/favicon-dark.svg' : '/images/logos/favicon-light.svg'}
						alt="PN Logo"
						class="h-8 w-8"
					/>
					<span
						class="hidden sm:inline-block text-sm font-sans font-medium text-gray-700 dark:text-dark-text-primary tracking-wide"
						>Philip Nordquist</span
					>
				</a>
			</div>
			<div class="hidden md:flex items-center space-x-4">
				{#each navItems as item}
					<a
						href={item.href}
						class="px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200
						{$page.url.pathname === item.href
							? 'bg-emerald-500 text-white dark:bg-dark-primary dark:text-dark-bg'
							: 'text-gray-700 dark:text-dark-text-secondary hover:bg-emerald-500 hover:text-white dark:hover:bg-dark-primary dark:hover:text-dark-bg'}"
					>
						{item.label}
					</a>
				{/each}
			</div>
			<div class="md:hidden">
				<button
					onclick={toggleMenu}
					class="text-gray-700 dark:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-full p-2"
					aria-label="Toggle menu"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isMenuOpen}
		<div
			class="md:hidden absolute top-full left-0 right-0"
			in:fly={{ y: -20, duration: 300, easing: cubicOut }}
			out:fade={{ duration: 200 }}
		>
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-dark-surface">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={closeMenu}
						class="block px-4 py-3 rounded-full text-base font-sans font-medium transition-all duration-200
						{$page.url.pathname === item.href
							? 'bg-emerald-500 text-white dark:bg-dark-primary dark:text-dark-bg'
							: 'text-gray-700 dark:text-dark-text-secondary hover:bg-emerald-500 hover:text-white dark:hover:bg-dark-primary dark:hover:text-dark-bg'}"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
