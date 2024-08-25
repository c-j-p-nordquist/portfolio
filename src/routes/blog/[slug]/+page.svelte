<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

{#if data.content}
	{@render data.content(data.metadata)}
{:else}
	<p>Content not found or is undefined.</p>
{/if}
