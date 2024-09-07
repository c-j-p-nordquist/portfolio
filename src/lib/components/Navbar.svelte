<script>
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	let { title = 'Philip Nordquist' } = $props();
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let isPortfolioOpen = $state(false);
	let portfolioButton = $state(null);
	let portfolioSubmenu = $state(null);
	let navHeight = $state(0);
	let navRef = $state(null);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		isPortfolioOpen = false;
		document.body.style.overflow = '';
	}

	function togglePortfolio(event) {
		event.stopPropagation();
		isPortfolioOpen = !isPortfolioOpen;
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{
			href: '#',
			label: 'Portfolio',
			subItems: [
				{ href: '/projects', label: 'Projects' },
				{ href: '/experience', label: 'Experience' }
			]
		},
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' }
	];

	onMount(() => {
		const handleClickOutside = (event) => {
			if (navRef && !navRef.contains(event.target) && isMenuOpen) {
				closeMenu();
			}
			if (
				portfolioButton &&
				!portfolioButton.contains(event.target) &&
				portfolioSubmenu &&
				!portfolioSubmenu.contains(event.target)
			) {
				isPortfolioOpen = false;
			}
		};

		const handleScroll = () => {
			if (isMenuOpen) {
				closeMenu();
			}
		};

		document.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll);

		if (navRef) {
			navHeight = navRef.offsetHeight;
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	bind:this={navRef}
	class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
		isScrolled ? 'bg-background/60 dark:bg-darkBackground/60 backdrop-blur-md' : 'bg-transparent'
	}`}
	aria-label="Main navigation"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-24">
			<!-- Logo -->
			<div class="flex-shrink-0 mr-8">
				<div class="flex items-center">
					<Logo size={60} animated={!isScrolled} clickable={true} />
				</div>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden lg:flex items-center justify-center flex-1">
				<ul class="flex space-x-8" role="menubar">
					{#each navItems as item}
						<li class="relative" role="none">
							{#if item.subItems}
								<button
									bind:this={portfolioButton}
									onclick={togglePortfolio}
									class="nav-item font-sans text-lg text-primary hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300 flex items-center"
									aria-haspopup="true"
									aria-expanded={isPortfolioOpen}
									role="menuitem"
								>
									{item.label}
									<svg
										class={`w-4 h-4 ml-1 transition-transform duration-300 ${isPortfolioOpen ? 'rotate-180' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										></path>
									</svg>
								</button>
								{#if isPortfolioOpen}
									<ul
										bind:this={portfolioSubmenu}
										class="absolute left-0 mt-2 w-48 bg-background/60 dark:bg-darkBackground/60 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
										role="menu"
									>
										{#each item.subItems as subItem}
											<li role="none">
												<a
													href={subItem.href}
													onclick={closeMenu}
													class="block nav-item px-4 py-2 text-sm text-primary hover:bg-background/80 dark:hover:bg-darkBackground/80 hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300"
													role="menuitem"
												>
													{subItem.label}
												</a>
											</li>
										{/each}
									</ul>
								{/if}
							{:else}
								<a
									href={item.href}
									class="nav-item font-sans text-lg text-primary hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300"
									role="menuitem"
								>
									{item.label}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Button (Desktop) -->
			<div class="hidden lg:block ml-8">
				<Button
					href="/contact"
					variant="primary"
					animate={true}
					delay={1000}
					class="text-lg px-6 py-2">Let's Talk</Button
				>
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMenu}
				class="lg:hidden text-primary dark:text-darkText focus:outline-none"
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMenuOpen}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="w-8 h-8"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-8 6h8'}
					/>
				</svg>
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<div
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 bg-black bg-opacity-50 z-40"
			style="top: {navHeight}px;"
			aria-hidden="true"
			onclick={closeMenu}
		></div>

		<div
			transition:slide={{ duration: 150, axis: 'y' }}
			class="lg:hidden bg-background dark:bg-darkBackground backdrop-blur-md fixed left-0 right-0 z-50 overflow-y-auto"
			style="top: {navHeight}px; max-height: calc(100vh - {navHeight}px);"
		>
			<nav aria-label="Mobile navigation">
				<ul class="flex flex-col items-start space-y-2 px-4 pt-4 pb-6" role="menu">
					{#each navItems as item}
						<li class="w-full" role="none">
							{#if item.subItems}
								<button
									onclick={togglePortfolio}
									class="nav-item flex justify-between items-center w-full text-left py-2 font-sans text-primary hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300"
									aria-haspopup="true"
									aria-expanded={isPortfolioOpen}
									role="menuitem"
								>
									{item.label}
									<svg
										class={`w-4 h-4 ml-1 transition-transform duration-300 ${isPortfolioOpen ? 'rotate-180' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										></path>
									</svg>
								</button>
								{#if isPortfolioOpen}
									<ul class="ml-4 mt-2 space-y-2" role="menu">
										{#each item.subItems as subItem}
											<li role="none">
												<a
													href={subItem.href}
													onclick={closeMenu}
													class="nav-item block py-2 font-sans text-primary hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300"
													role="menuitem"
												>
													{subItem.label}
												</a>
											</li>
										{/each}
									</ul>
								{/if}
							{:else}
								<a
									href={item.href}
									onclick={closeMenu}
									class="nav-item block w-full text-left py-2 font-sans text-primary hover:text-secondary dark:text-darkText dark:hover:text-secondary transition-colors duration-300"
									role="menuitem"
								>
									{item.label}
								</a>
							{/if}
						</li>
					{/each}
					<li class="w-full mt-4 pt-8" role="none">
						<Button href="/contact" variant="secondary" fullWidth={true} onclick={closeMenu}>
							Let's Talk
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	{/if}
</nav>

<style>
	.nav-item {
		position: relative;
		padding-bottom: 2px;
	}

	.nav-item::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		bottom: -4px;
		left: 0;
		background-color: currentColor;
		transition: width 0.3s ease;
	}

	.nav-item:hover::after {
		width: 100%;
	}

	ul[role='menu'] .nav-item::after {
		display: none;
	}
</style>
