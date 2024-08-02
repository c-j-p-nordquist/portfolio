<script>
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/stores';

	let { data, children } = $props();
	let isLandingPage = $derived($page.url.pathname === '/');
	let key = $derived($page.url.pathname);
</script>

<div class="min-h-screen flex flex-col bg-base-100 text-base-content relative">
	{#if !isLandingPage}
		<Nav />
		<div class="pt-16">
			<!-- Add padding to account for fixed navbar -->
			{#key key}
				<main
					class="flex-grow"
					in:fly={{ y: 50, duration: 300, delay: 150, easing: cubicInOut }}
					out:fade={{ duration: 150 }}
				>
					{@render children()}
				</main>
			{/key}
		</div>
	{:else}
		{#key key}
			<main
				class="flex-grow"
				in:fly={{ y: 50, duration: 300, delay: 150, easing: cubicInOut }}
				out:fade={{ duration: 150 }}
			>
				{@render children()}
			</main>
		{/key}
	{/if}
</div>
