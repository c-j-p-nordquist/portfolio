<script>
	import { page } from '$app/stores';
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

	function closeDrawer() {
		drawerChecked = false;
	}
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
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
				<ul class="menu menu-horizontal px-1">
					{#each navItems as item}
						<li>
							<a
								href={item.link}
								class:active={currentPath === item.link ||
									(item.link !== '/' && currentPath.startsWith(item.link))}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex-none">
				<DarkModeToggle />
			</div>
		</div>
	</div>
	<div class="drawer-side z-50">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 min-h-full bg-base-200">
			{#each navItems as item}
				<li>
					<a
						href={item.link}
						class:active={currentPath === item.link ||
							(item.link !== '/' && currentPath.startsWith(item.link))}
						onclick={closeDrawer}
					>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
