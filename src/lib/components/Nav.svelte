<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let isScrolled = $state(false);
	let isMenuOpen = $state(false);

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/posts', label: 'Projects' },
		{ href: '/about', label: 'About' }
	];
</script>

<nav
	class="fixed w-full z-50 transition-all duration-300 {isScrolled
		? 'bg-gray-900/80 backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="text-white font-bold text-xl">PN</a>
			</div>
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-4">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 {$page
								.url.pathname === item.href
								? 'bg-gray-800 text-white'
								: ''}"
						>
							{item.label}
						</a>
					{/each}
				</div>
			</div>
			<div class="md:hidden">
				<button
					onclick={toggleMenu}
					class="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
			class="md:hidden"
			in:fly={{ y: -20, duration: 300, easing: cubicOut }}
			out:fade={{ duration: 200 }}
		>
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={closeMenu}
						class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium {$page
							.url.pathname === item.href
							? 'bg-gray-800 text-white'
							: ''}"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
