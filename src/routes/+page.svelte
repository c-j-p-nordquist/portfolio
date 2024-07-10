<script>
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();

	let name = $state('Philip Nordquist');
	let title = $state('Infrastructure & Security');

	let latestPost = $derived(data.latestPost);
	let featuredProject = $state({
		title: 'Cloud-Native Monitoring Solution',
		url: '/projects/cloud-native-monitoring'
	});

	let pageTitle = $derived(`${name} - Portfolio`);

	let skills = $state(['Cloud Infrastructure', 'DevSecOps', 'Automation']);

	$effect(() => {
		document.title = pageTitle;
	});
</script>

<main class="container mx-auto px-4 py-8">
	<Hero {name} {title} {latestPost} {featuredProject} />

	<section class="py-16">
		<h2 class="text-3xl font-bold mb-8 text-center">Featured Skills</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each skills as skill}
				<div class="card bg-base-200">
					<div class="card-body">
						<h3 class="card-title">{skill}</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra justo et nunc
							bibendum tincidunt.
						</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>
