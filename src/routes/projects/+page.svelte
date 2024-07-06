<script>
	import { onMount } from 'svelte';

	let projects = $state([
		{ title: 'Project 1', description: 'A brief description of project 1' },
		{ title: 'Project 2', description: 'A brief description of project 2' },
		{ title: 'Project 3', description: 'A brief description of project 3' }
	]);

	onMount(() => {
		document.title = 'My Projects - Portfolio';
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">My Projects</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each projects as project}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{project.title}</h2>
					<p>{project.description}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">View Project</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
