<script>
	import { onMount } from 'svelte';

	let name = $state('Philip Nordquist');
	let title = $state('Site Reliability Engineer');

	onMount(() => {
		document.title = `${name} - Portfolio`;
	});
</script>

<main class="container mx-auto px-4 py-8">
	<section class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">{name}</h1>
				<p class="py-6 text-2xl">{title}</p>
				<a href="/about" class="btn btn-primary">Learn More</a>
			</div>
		</div>
	</section>
</main>
