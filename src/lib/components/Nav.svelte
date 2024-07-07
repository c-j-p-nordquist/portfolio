<script>
	import { page } from '$app/stores';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import IconMenu from '~icons/lucide/menu';

	let currentPath = $derived($page.url.pathname);
	let dropdownOpen = $state(false);

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<div class="navbar bg-base-100 rounded-box shadow-lg">
	<div class="navbar-start">
		<div class="dropdown">
			<button
				onclick={toggleDropdown}
				class="btn btn-ghost lg:hidden"
				aria-haspopup="menu"
				aria-expanded={dropdownOpen}
			>
				<IconMenu class="h-5 w-5" />
			</button>
			{#if dropdownOpen}
				<ul
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/" class:active={currentPath === '/'}>Home</a></li>
					<li><a href="/about" class:active={currentPath === '/about'}>About</a></li>
					<li><a href="/projects" class:active={currentPath === '/projects'}>Projects</a></li>
					<li><a href="/contact" class:active={currentPath === '/contact'}>Contact</a></li>
				</ul>
			{/if}
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">Portfolio</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/" class:active={currentPath === '/'}>Home</a></li>
			<li><a href="/about" class:active={currentPath === '/about'}>About</a></li>
			<li><a href="/projects" class:active={currentPath === '/projects'}>Projects</a></li>
			<li><a href="/contact" class:active={currentPath === '/contact'}>Contact</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<DarkModeToggle />
	</div>
</div>
