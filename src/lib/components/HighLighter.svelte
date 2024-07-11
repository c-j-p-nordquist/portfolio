<script>
	let { line = [] } = $props();
</script>

{#each line as { matches, text }}
	{#if matches}
		<mark class="bg-yellow-200 text-gray-900">{text}</mark>
	{:else}
		{text}
	{/if}
{/each}
