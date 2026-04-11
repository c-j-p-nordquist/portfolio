<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Nav />

	<main class="flex-grow">
		{@render children()}
	</main>

	<Footer />
</div>
