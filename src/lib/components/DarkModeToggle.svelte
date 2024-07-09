<script>
	import { onMount } from 'svelte';
	import IconMoon from '~icons/lucide/moon';
	import IconSun from '~icons/lucide/sun';

	let darkMode = $state(false);

	onMount(() => {
		const isDarkMode = localStorage.getItem('darkMode') === 'true';
		darkMode = isDarkMode;
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	});

	$effect(() => {
		document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
		localStorage.setItem('darkMode', darkMode);
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
	}
</script>

<button onclick={toggleDarkMode} class="btn btn-ghost btn-circle">
	{#if darkMode}
		<IconSun />
	{:else}
		<IconMoon />
	{/if}
</button>
