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
				return 'text-primary-900 bg-primary-100 border-primary-200 hover:bg-primary-200 dark:text-primary-100 dark:bg-primary-900 dark:border-primary-800 dark:hover:bg-primary-800';
			case 'topic':
				return 'text-secondary-900 bg-secondary-100 border-secondary-200 hover:bg-secondary-200 dark:text-secondary-100 dark:bg-secondary-900 dark:border-secondary-800 dark:hover:bg-secondary-800';
			default:
				return 'text-accent-900 bg-accent-100 border-accent-200 hover:bg-accent-200 dark:text-accent-100 dark:bg-accent-900 dark:border-accent-800 dark:hover:bg-accent-800';
		}
	});

	$effect(() => {
		// Capitalize the first letter if it's a type
		if (type) {
			text = text.charAt(0).toUpperCase() + text.slice(1);
		}
	});

	let className = $derived(
		`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClass} transition-colors duration-200 border`
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
