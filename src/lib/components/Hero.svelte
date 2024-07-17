<script>
	import { fade } from 'svelte/transition';
	import IconChevronRight from '~icons/lucide/chevron-right';

	let {
		name = 'Philip Nordquist',
		title = 'Infrastructure & Security Engineer',
		subtitle = 'Exploring the Intersections of Cloud, Security, and DevOps',
		latestPost,
		featuredProject
	} = $props();

	let visible = $state(false);

	$effect(() => {
		const timer = setTimeout(() => {
			visible = true;
		}, 100);

		return () => clearTimeout(timer);
	});
</script>

<section class="hero min-h-[70vh] bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-2xl">
			{#if visible}
				<div in:fade={{ duration: 1000 }}>
					<h1 class="font-serif text-5xl sm:text-6xl font-bold mb-4 text-primary">{name}</h1>
					<p class="py-4 sm:py-6 text-2xl sm:text-3xl font-light text-secondary">{title}</p>
					<p class="text-lg sm:text-xl mb-8 text-base-content text-opacity-80">{subtitle}</p>
					<div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
						<a href={latestPost.url} class="btn btn-primary btn-lg text-primary-content">
							Latest Insight
							<IconChevronRight class="w-5 h-5 ml-2" />
						</a>
						<a href={featuredProject.url} class="btn btn-secondary btn-lg text-secondary-content">
							Featured Project
							<IconChevronRight class="w-5 h-5 ml-2" />
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
