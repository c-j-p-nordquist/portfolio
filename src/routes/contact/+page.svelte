<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import GridPattern from '$lib/components/GridPattern.svelte';
	import { cn } from '$lib/utils';

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
	<section class="hero min-h-screen bg-base-200 relative overflow-hidden">
		<GridPattern
			squares={[
				[4, 4],
				[5, 1],
				[8, 2],
				[6, 6],
				[10, 5],
				[13, 3]
			]}
			class={cn(
				'[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
				'absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-12 fill-primary opacity-30'
			)}
		/>
		<div class="hero-content text-center relative z-10">
			<div class="max-w-md">
				{#if visible}
					<h1 in:fade={{ duration: 1000 }} class="text-5xl font-bold mb-4">{name}</h1>
					<p in:fade={{ duration: 1000, delay: 500 }} class="py-6 text-2xl">{title}</p>
					<div in:fade={{ duration: 1000, delay: 1000 }} class="mt-8 space-y-4">
						<p class="text-lg">
							Currently working at STIM and running my own IT consulting company.
						</p>
						<div
							class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
						>
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
</main>
