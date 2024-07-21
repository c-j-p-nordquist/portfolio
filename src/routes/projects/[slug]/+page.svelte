<script>
	import ProjectDetail from '$lib/components/ProjectDetail.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.project.title} - Philip Nordquist's Projects</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<ProjectDetail {...data.project} />
