<script>
	import { fade } from 'svelte/transition';
	import IconChevronRight from '~icons/lucide/chevron-right';

	let {
		name = 'Philip Nordquist',
		title = 'Infrastructure & Security',
		latestPost = {
			title: 'Implementing Zero Trust Architecture',
			url: '/blog/implementing-zero-trust-architecture'
		},
		featuredProject = {
			title: 'Cloud-Native Monitoring Solution',
			url: '/projects/cloud-native-monitoring'
		}
	} = $props();

	let visible = $state(false);

	let subtitle = $derived(`Build, break, repeat.`);

	$effect(() => {
		// Delay setting visible to true to ensure proper rendering
		const timer = setTimeout(() => {
			visible = true;
		}, 100);

		return () => clearTimeout(timer);
	});
</script>

<section class="hero min-h-screen bg-base-100">
	<div class="hero-content text-center">
		<div class="max-w-md">
			{#if visible}
				<div in:fade={{ duration: 1000 }}>
					<h1 class="font-sans text-4xl sm:text-5xl font-bold mb-4">{name}</h1>
					<p class="py-4 sm:py-6 text-xl sm:text-2xl">{title}</p>
					<p class="text-base sm:text-lg mb-6">{subtitle}</p>
					<div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
						<a href={latestPost.url} class="btn btn-primary">
							Latest Blog Post
							<IconChevronRight class="w-4 h-4 ml-2" />
						</a>
						<a href={featuredProject.url} class="btn btn-accent text-primary">
							Featured Project
							<IconChevronRight class="w-4 h-4 ml-2" />
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
