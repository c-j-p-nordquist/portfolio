<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-white flex flex-col">
	<nav class="absolute top-0 left-0 p-4 z-10">
		<a href="/" class="text-2xl font-serif font-bold text-primary">Philip Nordquist</a>
	</nav>

	<main class="flex-grow">
		{@render children()}
	</main>
</div>
