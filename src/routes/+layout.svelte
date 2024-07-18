<script>
	import Nav from '$lib/components/Nav.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-100 flex flex-col">
	<Nav />
	<main class="flex-grow pt-16">
		{@render children()}
	</main>
	<ScrollToTop />
</div>
