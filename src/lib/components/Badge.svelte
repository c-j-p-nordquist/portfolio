<script>
	let props = $props();
	let text = $derived(props.text || '');
	let variant = $derived(props.variant || 'default');

	let className = $derived.by(() => {
		let baseClasses =
			'inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200';
		switch (variant) {
			case 'tech':
				return `${baseClasses} bg-blue-500/20 text-blue-300 hover:bg-blue-500/30`;
			case 'skill':
				return `${baseClasses} bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30`;
			default:
				return `${baseClasses} bg-gray-500/20 text-gray-300 hover:bg-gray-500/30`;
		}
	});
</script>

<span class={className}>
	{text}
</span>
