<script>
	let { tag = undefined, topic = undefined, type = undefined } = $props();
	let text = $state(tag || topic || type);

	let colorClass = $derived(
		type === 'project'
			? 'text-secondary bg-secondary/10 border-secondary/20 hover:bg-secondary/20'
			: type === 'blog'
				? 'text-primary bg-primary/10 border-primary/20 hover:bg-primary/20'
				: 'text-accent bg-accent/10 border-accent/20 hover:bg-accent/20'
	);

	$effect(() => {
		// Capitalize the first letter if it's a type
		if (type) {
			text = text.charAt(0).toUpperCase() + text.slice(1);
		}
	});
</script>

<span
	class="inline-block px-2 py-1 text-xs font-medium rounded-full {colorClass} transition-colors duration-200 dark:bg-opacity-20 dark:hover:bg-opacity-30"
>
	{text}
</span>
