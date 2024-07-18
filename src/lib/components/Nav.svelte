<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';
	import IconSearch from '~icons/lucide/search';
	import IconGithub from '~icons/lucide/github';
	import IconLinkedin from '~icons/lucide/linkedin';
	import IconMail from '~icons/lucide/mail';
	import SearchModal from './SearchModal.svelte';

	let currentPath = $derived($page.url.pathname);
	let isNavVisible = $state(true);
	let lastScrollTop = 0;
	let navbarHeight = $state(0);

	let navItems = [
		{ name: 'Home', link: '/' },
		{ name: 'About', link: '/about' },
		{ name: 'Projects', link: '/projects' },
		{ name: 'Blog', link: '/blog' }
	];

	let drawerChecked = $state(false);
	let navContainer;
	let trail = $state({ start: 0, end: 0, opacity: 0 });
	let showSearchModal = $state(false);

	$effect(() => {
		const navbar = document.querySelector('.navbar');
		if (navbar) {
			navbarHeight = navbar.offsetHeight;
		}

		const handleScroll = () => {
			const st = window.scrollY;
			if (st > lastScrollTop && st > navbarHeight) {
				// Scrolling down
				isNavVisible = false;
			} else if (st < lastScrollTop || st === 0) {
				// Scrolling up or at the top
				isNavVisible = true;
			}
			lastScrollTop = st <= 0 ? 0 : st;
		};

		const showNavbarHandler = () => {
			isNavVisible = true;
		};

		window.addEventListener('scroll', handleScroll, false);
		window.addEventListener('showNavbar', showNavbarHandler);

		return () => {
			window.removeEventListener('scroll', handleScroll, false);
			window.removeEventListener('showNavbar', showNavbarHandler);
		};
	});

	function handleClickAndPrevent(index, event) {
		event.preventDefault();
		handleClick(index, event);
	}

	function handleClick(index, event) {
		if (window.innerWidth >= 1024) {
			const items = navContainer.querySelectorAll('a');
			const clickedItem = items[index];
			const activeItem = navContainer.querySelector('.active');

			const containerRect = navContainer.getBoundingClientRect();
			const clickedRect = clickedItem.getBoundingClientRect();
			const activeRect = activeItem ? activeItem.getBoundingClientRect() : clickedRect;

			const start = activeRect.left - containerRect.left;
			const end = clickedRect.right - containerRect.left;

			let progress = 0;
			const animate = () => {
				progress += 0.05;
				const currentStart = start + (clickedRect.left - activeRect.left) * cubicOut(progress);
				const currentEnd =
					activeRect.right -
					containerRect.left +
					(clickedRect.right - activeRect.right) * cubicOut(progress);

				trail = {
					start: Math.min(currentStart, currentEnd),
					end: Math.max(currentStart, currentEnd),
					opacity: 1
				};

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					setTimeout(() => {
						trail = { ...trail, opacity: 0 };
					}, 500);
				}
			};
			requestAnimationFrame(animate);
		}

		goto(navItems[index].link);
		closeDrawerAndSearch();
	}

	function closeDrawerAndSearch() {
		drawerChecked = false;
		showSearchModal = false;
	}

	function menuItemFly(node, { delay = 0 }) {
		return fly(node, { y: 20, duration: 200, delay });
	}

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
		if (showSearchModal) {
			drawerChecked = false;
		}
	}
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked} />
	<div class="drawer-content flex flex-col">
		<div
			class="navbar bg-base-100 bg-opacity-80 backdrop-blur-sm w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
			class:translate-y-0={isNavVisible}
			class:-translate-y-full={!isNavVisible}
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
					<ul class="menu menu-horizontal px-1 relative flex items-center" bind:this={navContainer}>
						{#each navItems as item, index}
							<li use:menuItemFly={{ delay: 50 * index }}>
								<a
									href={item.link}
									class="relative py-2 px-3 text-base hover:text-primary transition-colors duration-200"
									class:active={currentPath === item.link ||
										(item.link !== '/' && currentPath.startsWith(item.link))}
									onclick={(e) => handleClickAndPrevent(index, e)}
								>
									{item.name}
								</a>
							</li>
						{/each}
						<div
							class="absolute bottom-0 h-0.5 bg-[#964734] transition-all duration-300"
							style="left: {trail.start}px; width: {trail.end -
								trail.start}px; opacity: {trail.opacity};"
						></div>
					</ul>
				</div>
				<div class="navbar-end flex items-center space-x-2">
					<button
						class="relative py-2 text-base hover:text-primary transition-colors duration-200"
						onclick={toggleSearchModal}
					>
						<IconSearch class="h-5 w-5" />
					</button>
					<div class="dropdown dropdown-end">
						<button
							class="relative py-2 px-3 text-base hover:text-primary transition-colors duration-200"
						>
							<IconMail class="h-5 w-5" />
						</button>
						<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a
									href="https://github.com/c-j-p-nordquist"
									target="_blank"
									rel="noopener noreferrer"><IconGithub class="h-4 w-4 mr-2" /> GitHub</a
								>
							</li>
							<li>
								<a
									href="https://linkedin.com/in/philipnordquist"
									target="_blank"
									rel="noopener noreferrer"><IconLinkedin class="h-4 w-4 mr-2" /> LinkedIn</a
								>
							</li>
							<li>
								<a href="mailto:philip@nordquist.me"><IconMail class="h-4 w-4 mr-2" /> Email</a>
							</li>
						</ul>
					</div>
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
				{#each navItems as item, index}
					<li class="my-2">
						<a
							href={item.link}
							class="text-2xl py-4"
							class:active={currentPath === item.link ||
								(item.link !== '/' && currentPath.startsWith(item.link))}
							onclick={() => handleClick(index)}
						>
							{item.name}
						</a>
					</li>
				{/each}
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

	.menu-horizontal > li > a {
		background-color: transparent !important;
	}

	.active {
		color: #964734 !important;
	}

	:global(.dark-mode-toggle) {
		padding: 0.5rem !important;
	}

	.drawer-side .active {
		background-color: rgba(150, 71, 52, 0.1) !important;
	}

	:global(body:not(.dark)) .hover\:text-primary:hover {
		color: #0fa4af !important;
	}

	:global(body.dark) .hover\:text-primary:hover {
		color: #964734 !important;
	}
</style>
