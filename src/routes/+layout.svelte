<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { page } from '$app/stores';

	let { data, children } = $props();
	let isLandingPage = $derived($page.url.pathname === '/');
</script>

{#snippet mainLayout()}
	<div class="min-h-screen flex flex-col">
		{#if !isLandingPage}
			<Nav />
			<main class="flex-grow">
				{@render children()}
			</main>
			<ScrollToTop />
		{:else}
			{@render children()}
		{/if}
	</div>
{/snippet}

{@render mainLayout()}
