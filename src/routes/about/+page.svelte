<script>
	import { onMount } from 'svelte';

	let skills = $state(['JavaScript', 'Svelte', 'React', 'Node.js', 'HTML', 'CSS']);

	onMount(() => {
		document.title = 'About Me - Portfolio';
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">About Me</h1>
	<p class="mb-4">
		Hi, I'm a web developer passionate about creating beautiful and functional websites. I
		specialize in modern JavaScript frameworks and have a keen eye for design.
	</p>
	<h2 class="text-2xl font-semibold mb-4">My Skills</h2>
	<ul class="list-disc list-inside">
		{#each skills as skill}
			<li>{skill}</li>
		{/each}
	</ul>
</main>
