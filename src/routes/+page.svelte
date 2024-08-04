<script>
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();
	let title = $state('Design for Failure, Operate for Success');
	let subtitle = $state(
		'Insights on resilient systems, operational excellence, and modern infrastructure'
	);
	let featuredPosts = $derived(
		data.posts.filter((post) => post.featured).slice(0, 4) || data.posts.slice(0, 4) || []
	);
</script>

<svelte:head>
	<title>{title} - {subtitle}</title>
</svelte:head>

<main class="bg-base-100 text-base-content">
	<Hero {title} {subtitle} {featuredPosts} />
</main>
