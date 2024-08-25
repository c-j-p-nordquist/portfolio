<script>
	let { title = 'Philip Nordquist' } = $props();
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/services', label: 'Services' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

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
	class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
		isScrolled ? 'bg-gray-900/90 backdrop-blur-sm' : 'bg-transparent'
	}`}
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<a href="/" class="text-2xl font-heading text-white">{title}</a>

			<!-- Desktop Menu -->
			<nav class="hidden lg:block">
				<ul class="flex space-x-6">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="text-white hover:text-accent transition-colors duration-300"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMenu}
				class="lg:hidden text-white focus:outline-none"
				aria-label="Toggle menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="w-6 h-6"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-8 6h8"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<nav
			class="lg:hidden bg-gray-900/90 backdrop-blur-sm text-white absolute top-full left-0 right-0 z-50"
		>
			<ul class="flex flex-col items-start space-y-2 px-4 pt-4 pb-2">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							onclick={closeMenu}
							class="block w-full text-left py-2 hover:text-accent transition-colors duration-300"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</nav>
