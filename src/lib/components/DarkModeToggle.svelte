<script>
	import { browser } from '$app/environment';
	import IconLightbulb from '~icons/lucide/lightbulb';
	import IconLightbulbOff from '~icons/lucide/lightbulb-off';
	import IconSparkles from '~icons/lucide/Sparkles';

	let theme = $state('system');

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
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.setAttribute('data-theme', 'dark');
			} else {
				document.documentElement.setAttribute('data-theme', 'light');
			}
			localStorage.removeItem('theme');
		} else {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
		updateTheme();
	}

	$effect(() => {
		if (browser && theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => updateTheme();
			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	});
</script>

<button
	onclick={toggleTheme}
	class="p-2 rounded-full hover:bg-base-200 transition-colors duration-200"
	aria-label="Toggle theme"
>
	{#if theme === 'light'}
		<IconLightbulbOff class="w-6 h-6 text-gray-400" />
	{:else if theme === 'dark'}
		<IconLightbulb class="w-6 h-6 text-yellow-400" />
	{:else}
		<IconSparkles class="w-6 h-6 text-blue-400" />
	{/if}
</button>
