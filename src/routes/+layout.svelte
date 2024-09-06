<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div
	class="relative min-h-screen flex flex-col bg-background dark:bg-darkBackground text-text dark:text-darkText font-sans"
>
	<!-- Navbar now positioned absolutely -->
	<Navbar title="CJP IT CONSULTING" />

	<main class="flex-grow relative z-0">
		{@render children()}
	</main>

	<Footer />
</div>
