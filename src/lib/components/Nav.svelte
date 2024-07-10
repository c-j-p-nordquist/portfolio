<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';

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

	function handleClickAndPrevent(index, event) {
		event.preventDefault();
		handleClick(index, event);
	}

	function handleClick(index, event) {
		if (window.innerWidth >= 1024) {
			// Only animate on larger screens
			const items = navContainer.querySelectorAll('li');
			const clickedItem = items[index];
			const activeItem = navContainer.querySelector('.active');

			const containerRect = navContainer.getBoundingClientRect();
			const clickedRect = clickedItem.getBoundingClientRect();
			const activeRect = activeItem ? activeItem.getBoundingClientRect() : clickedRect;

			const start = activeRect.left - containerRect.left;
			const end = clickedRect.right - containerRect.left;

			// Animate the trail
			let progress = 0;
			const animate = () => {
				progress += 0.05; // Adjust this value to control speed
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

		// Navigate to the clicked item
		goto(navItems[index].link);
	}

	function closeDrawerAndNavigate(link) {
		drawerChecked = false;
		goto(link);
	}

	function menuItemFly(node, { delay = 0 }) {
		return fly(node, { y: 20, duration: 200, delay });
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
				<a href="/" class="btn btn-ghost normal-case text-xl">Portfolio</a>
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
							onclick={() => closeDrawerAndNavigate(item.link)}
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
