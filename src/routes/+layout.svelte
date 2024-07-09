<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-100">
	<div class="container mx-auto px-4 py-4">
		<Nav />
	</div>

	<main>
		{@render children()}
	</main>
</div>
