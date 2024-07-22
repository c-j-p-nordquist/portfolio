<script>
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedInsights from '$lib/components/FeaturedInsights.svelte';
	import { browser } from '$app/environment';

	let { data } = $props();

	let name = $state('PHILIP NORDQUIST');
	let subtitle = $state('PERSONAL PORTFOLIO');

	let pageTitle = $derived(`${name} - Tech Insights and Projects`);

	$effect(() => {
		document.title = pageTitle;
	});

	function handleScrollToContent() {
		if (browser) {
			const featuredInsights = document.getElementById('featured-insights');
			if (featuredInsights) {
				featuredInsights.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}
</script>

<Hero {name} {subtitle} dispatch={{ scrollToContent: handleScrollToContent }} />

<FeaturedInsights featuredPosts={data.featuredPosts} />
