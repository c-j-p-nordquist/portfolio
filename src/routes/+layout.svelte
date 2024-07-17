<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-100">
	<Nav />
	<main class="pt-20 px-4 max-w-5xl mx-auto">
		{@render children()}
	</main>
</div>
