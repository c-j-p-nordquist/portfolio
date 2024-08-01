<script>
	import { browser } from '$app/environment';
	import IconSun from '~icons/lucide/sun';
	import IconMoon from '~icons/lucide/moon';
	import IconLaptop from '~icons/lucide/laptop';
	import IconSwatchBook from '~icons/lucide/swatch-book';

	let theme = $state('system');
	let isOpen = $state(false);

	$effect(() => {
		if (browser) {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				theme = storedTheme;
			} else {
				theme = 'system';
			}
			updateTheme();
		}
	});

	function updateTheme() {
		if (theme === 'system') {
			document.documentElement.removeAttribute('data-theme');
			localStorage.removeItem('theme');
		} else {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	}

	function setTheme(newTheme) {
		theme = newTheme;
		updateTheme();
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<div class="dropdown dropdown-end">
	<button tabindex="0" class="btn btn-ghost" onclick={toggleDropdown}>
		<span class="hidden sm:inline-block">Theme</span>
		<span class="sm:hidden"><IconSwatchBook class="w-5 h-5" /></span>
	</button>
	{#if isOpen}
		<ul
			tabindex="-1"
			class="dropdown-content font-sans z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li>
				<button onclick={() => setTheme('light')} class:active={theme === 'light'}>
					<IconSun class="w-4 h-4 mr-2" /> Light
				</button>
			</li>
			<li>
				<button onclick={() => setTheme('dark')} class:active={theme === 'dark'}>
					<IconMoon class="w-4 h-4 mr-2" /> Dark
				</button>
			</li>
			<li>
				<button onclick={() => setTheme('system')} class:active={theme === 'system'}>
					<IconLaptop class="w-4 h-4 mr-2" /> System
				</button>
			</li>
		</ul>
	{/if}
</div>
