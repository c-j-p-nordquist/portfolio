<script>
	import { browser } from '$app/environment';
	import IconLightbulb from '~icons/lucide/lightbulb';
	import IconLightbulbOff from '~icons/lucide/lightbulb-off';

	let darkMode = $state(false);

	$effect(() => {
		if (browser) {
			darkMode = document.documentElement.getAttribute('data-theme') === 'dark';
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		if (browser) {
			const newTheme = darkMode ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);
		}
	}
</script>

<button
	onclick={toggleDarkMode}
	class="p-2 rounded-full hover:bg-base-200 transition-colors duration-200"
	aria-label="Toggle dark mode"
>
	{#if !darkMode}
		<IconLightbulbOff class="w-6 h-6 text-gray-400" />
	{:else}
		<IconLightbulb class="w-6 h-6 text-yellow-400" />
	{/if}
</button>
