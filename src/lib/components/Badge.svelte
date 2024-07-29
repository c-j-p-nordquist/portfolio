<script>
	let { tag = undefined, topic = undefined } = $props();
	let text = tag || topic;
</script>

<span
	class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent border border-accent/20 transition-colors duration-200 hover:bg-accent/20 dark:hover:bg-accent/30"
>
	{text}
</span>
