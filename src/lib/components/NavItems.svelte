<script>
	import { goto } from '$app/navigation';
	import { cubicOut } from 'svelte/easing';

	let { currentPath, isMobile = false, closeDrawer = () => {} } = $props();

	let navItems = [
		{ name: 'Home', link: '/' },
		{ name: 'About', link: '/about' },
		{ name: 'Projects', link: '/projects' },
		{ name: 'Blog', link: '/blog' }
	];

	let navContainer = $state(null);
	let trail = $state({ start: 0, end: 0, opacity: 0 });

	function handleClick(event, link, index) {
		event.preventDefault();
		if (!isMobile && window.innerWidth >= 1024 && navContainer) {
			const items = navContainer.querySelectorAll('a');
			const clickedItem = items[index];
			const activeItem = navContainer.querySelector('.text-primary');

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
		goto(link);
		closeDrawer();
	}
</script>

{#if isMobile}
	{#each navItems as item, index}
		<li>
			<a
				href={item.link}
				class="block py-2 px-4 text-lg transition-colors duration-200
                       text-base-content hover:text-primary
                       dark:text-base-content dark:hover:text-primary
                       {currentPath === item.link ||
				(item.link !== '/' && currentPath.startsWith(item.link))
					? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
					: ''}"
				onclick={(event) => handleClick(event, item.link, index)}
			>
				{item.name}
			</a>
		</li>
	{/each}
{:else}
	<ul class="menu menu-horizontal px-1 relative flex items-center" bind:this={navContainer}>
		{#each navItems as item, index}
			<li>
				<a
					href={item.link}
					class="py-2 px-3 text-base transition-colors duration-200
                           text-base-content hover:text-primary
                           dark:text-base-content dark:hover:text-primary
                           {currentPath === item.link ||
					(item.link !== '/' && currentPath.startsWith(item.link))
						? 'text-primary dark:text-primary'
						: ''}"
					onclick={(event) => handleClick(event, item.link, index)}
				>
					{item.name}
				</a>
			</li>
		{/each}
		<div
			class="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
			style="left: {trail.start}px; width: {trail.end - trail.start}px; opacity: {trail.opacity};"
		></div>
	</ul>
{/if}
