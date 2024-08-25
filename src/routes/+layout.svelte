<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props(); // Using Svelte 5 syntax to manage children
</script>

<div class="relative min-h-screen flex flex-col bg-background text-text font-sans">
	<!-- Sticky Navbar -->
	<Navbar title="Philip Nordquist" />

	<main class="flex-grow relative z-0 py-24">
		{@render children()}
	</main>

	<footer class="bg-gray-800 text-gray-400 p-6 mt-12 relative z-0">
		<div class="container mx-auto text-center">
			<p>&copy; 2024 Philip Nordquist. All rights reserved.</p>
		</div>
	</footer>
</div>
