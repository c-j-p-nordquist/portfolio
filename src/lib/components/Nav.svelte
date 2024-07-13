<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';
	import IconSearch from '~icons/lucide/search';
	import SearchModal from './SearchModal.svelte';

	let currentPath = $derived($page.url.pathname);

	let navItems = [
		{ name: 'Home', link: '/' },
		{ name: 'About', link: '/about' },
		{ name: 'Projects', link: '/projects' },
		{ name: 'Blog', link: '/blog' },
		{ name: 'Contact', link: '/contact' }
	];

	let drawerChecked = $state(false);
	let navContainer;
	let trail = $state({ start: 0, end: 0, opacity: 0 });
	let showSearchModal = $state(false);

	function handleClickAndPrevent(index, event) {
		event.preventDefault();
		handleClick(index, event);
	}

	function handleClick(index, event) {
		if (window.innerWidth >= 1024) {
			const items = navContainer.querySelectorAll('li');
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
		<div class="navbar bg-base-100 rounded-box shadow-lg w-full">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<IconMenu class="h-6 w-6" />
				</label>
			</div>
			<div class="flex-1 px-2 mx-2 lg:flex-none">
				<a href="/" class="btn btn-ghost normal-case text-xl flex items-center">
					<img src="/images/logo.svg" alt="PN Logo" class="w-8 h-8 mr-2" />
					<span class="hidden lg:inline">philip.nordquist.me</span>
				</a>
			</div>
			<div class="flex-none hidden lg:flex lg:flex-1 lg:justify-center">
				<ul class="menu menu-horizontal px-1 relative" bind:this={navContainer}>
					{#each navItems as item, index}
						<li use:menuItemFly={{ delay: 50 * index }}>
							<a
								href={item.link}
								class:active={currentPath === item.link ||
									(item.link !== '/' && currentPath.startsWith(item.link))}
								class="relative overflow-hidden"
								onclick={(e) => handleClickAndPrevent(index, e)}
							>
								{item.name}
							</a>
						</li>
					{/each}
					<div
						class="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
						style="left: {trail.start}px; width: {trail.end -
							trail.start}px; opacity: {trail.opacity};"
					></div>
				</ul>
			</div>
			<div class="flex-none">
				<button class="btn btn-ghost btn-circle" onclick={toggleSearchModal}>
					<IconSearch />
				</button>
			</div>
			<div class="flex-none ml-2">
				<DarkModeToggle />
			</div>
		</div>
	</div>
	{#if drawerChecked}
		<div class="drawer-side z-50">
			<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu p-4 w-80 min-h-full bg-base-200">
				{#each navItems as item, index}
					<li>
						<a
							href={item.link}
							class:active={currentPath === item.link ||
								(item.link !== '/' && currentPath.startsWith(item.link))}
							onclick={() => handleClick(index)}
						>
							{item.name}
						</a>
					</li>
				{/each}
				<li class="mt-4">
					<button onclick={toggleSearchModal} class="btn btn-ghost w-full justify-start">
						<IconSearch class="mr-2" />
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
