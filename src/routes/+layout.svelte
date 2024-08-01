<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let { data, children } = $props();
	let isLandingPage = $derived($page.url.pathname === '/');
</script>

<div class="min-h-screen flex flex-col bg-base-100 text-base-content relative">
	{#if !isLandingPage}
		<Nav />
		<div class="pt-16">
			<!-- Add padding to account for fixed navbar -->
			<main class="flex-grow" in:fade={{ duration: 300, delay: 150 }}>
				{@render children()}
			</main>
		</div>
	{:else}
		<main class="flex-grow" in:fade={{ duration: 300, delay: 150 }}>
			{@render children()}
		</main>
	{/if}

	{#if !isLandingPage}
		<ScrollToTop />
	{/if}
</div>
