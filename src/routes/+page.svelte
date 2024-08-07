<script>
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();
	let title = $state('Cloud Infrastructure & DevSecOps Engineer');
	let subtitle = $state('Architecting Secure, Scalable, and Observable Systems');
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
