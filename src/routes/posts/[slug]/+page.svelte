<script>
	let { data } = $props();
	let Content = $derived(data.content);
</script>

<Content {...data.metadata} />
