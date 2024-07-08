<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconChevronRight from '~icons/lucide/chevron-right';

	let name = $state('Philip Nordquist');
	let title = $state('DevSecOps Engineer & IT Consultant');
	let visible = $state(false);

	let latestPost = $state({
		title: 'Implementing Zero Trust Architecture',
		url: '/blog/implementing-zero-trust-architecture'
	});
	let featuredProject = $state({
		title: 'Cloud-Native Monitoring Solution',
		url: '/projects/cloud-native-monitoring'
	});

	onMount(() => {
		document.title = `${name} - Portfolio`;
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	<section class="hero min-h-[calc(100vh-8rem)]">
		<div class="hero-content text-center">
			<div class="max-w-3xl w-full">
				{#if visible}
					<div in:fade={{ duration: 1000 }}>
						<h1 class="text-5xl font-bold mb-4">{name}</h1>
						<p class="py-6 text-2xl">{title}</p>
						<p class="text-lg mb-6">
							Currently working at STIM and running my own IT consulting company.
						</p>
						<div class="flex justify-center space-x-4">
							<a href={latestPost.url} class="btn btn-primary">
								Latest Blog Post
								<IconChevronRight class="w-4 h-4 ml-2" />
							</a>
							<a href={featuredProject.url} class="btn btn-secondary">
								Featured Project
								<IconChevronRight class="w-4 h-4 ml-2" />
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section class="py-16">
		<h2 class="text-3xl font-bold mb-8 text-center">Featured Skills</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each ['Cloud Infrastructure', 'DevSecOps', 'Automation'] as skill}
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
