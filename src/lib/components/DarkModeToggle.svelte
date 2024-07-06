<script>
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';

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

<button on:click={toggleDarkMode} class="btn btn-ghost btn-circle">
	{#if darkMode}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
