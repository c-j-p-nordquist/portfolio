<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedContent from '$lib/components/FeaturedContent.svelte';

	let { data } = $props();

	let title = $state('Philip Nordquist');
	let subtitle = $state('Tech Insights and Projects');
	let description = $state(
		'Transforming complex infrastructure challenges into efficient, scalable solutions.'
	);
	let jobTitle = $state('DevSecOps Engineer');

	let allItems = $derived(data.allItems || []);
</script>

<svelte:head>
	<title>{title} - {subtitle}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row min-h-screen">
	<div class="lg:w-2/3 p-12 bg-white">
		<Hero {title} {subtitle} {description} {jobTitle} />
	</div>
	<aside class="lg:w-1/3 bg-primary overflow-y-auto h-screen">
		<FeaturedContent featuredItems={allItems} />
	</aside>
</div>
