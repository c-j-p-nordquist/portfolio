<script>
	let {
		tag = undefined,
		topic = undefined,
		type = undefined,
		onclick = undefined,
		href = undefined,
		variant = 'default'
	} = $props();
	let text = $state(tag || topic || type);

	let colorClass = $derived.by(() => {
		switch (variant) {
			case 'type':
				return 'text-accent bg-accent/20 border-accent/30 hover:bg-accent/30';
			case 'topic':
				return 'text-secondary bg-secondary/10 border-secondary/20 hover:bg-secondary/20';
			default:
				return 'text-neutral bg-neutral/10 border-neutral/20 hover:bg-neutral/20';
		}
	});

	$effect(() => {
		// Capitalize the first letter if it's a type
		if (type) {
			text = text.charAt(0).toUpperCase() + text.slice(1);
		}
	});

	let className = $derived(
		`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClass} transition-colors duration-200 dark:bg-opacity-20 dark:hover:bg-opacity-30`
	);
</script>

{#if href}
	<a {href} class={className}>
		{text}
	</a>
{:else}
	<button {onclick} class={className}>
		{text}
	</button>
{/if}
