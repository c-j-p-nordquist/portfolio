<script>
	let { data } = $props();
</script>

<svelte:component this={data.content} {...data.metadata} />
