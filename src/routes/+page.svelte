<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let name = $state('Your Name');
	let title = $state('Web Developer');
	let visible = $state(false);

	onMount(() => {
		document.title = `${name} - Portfolio`;
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	<section class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				{#if visible}
					<h1 in:fly={{ y: -50, duration: 1000 }} class="text-5xl font-bold mb-4">{name}</h1>
					<p in:fade={{ delay: 500, duration: 1000 }} class="py-6 text-2xl">{title}</p>
					<div in:fade={{ delay: 1000, duration: 1000 }} class="flex justify-center space-x-4">
						<a href="/about" class="btn btn-primary">About Me</a>
						<a href="/projects" class="btn btn-secondary">My Projects</a>
						<a href="/contact" class="btn btn-accent">Contact Me</a>
					</div>
				{/if}
			</div>
		</div>
	</section>
</main>

<style>
	h1 {
		background: linear-gradient(to right, #3490dc, #6574cd);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
