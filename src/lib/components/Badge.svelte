<script>
	let { text = '', variant = 'default', type = '', topic = '' } = $props();

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	$effect(() => {
		if (type) {
			variant = 'type';
			text = capitalize(type);
		} else if (topic) {
			variant = 'topic';
			text = capitalize(topic);
		} else if (text) {
			text = capitalize(text);
		}
	});

	let className = $derived.by(() => {
		let baseClasses =
			'inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200';

		if (variant === 'tech') {
			return `${baseClasses} bg-blue-500/20 text-blue-300 hover:bg-blue-500/30`;
		} else if (variant === 'skill') {
			return `${baseClasses} bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30`;
		} else if (variant === 'type') {
			return `${baseClasses} bg-purple-500/20 text-purple-300 hover:bg-purple-500/30`;
		} else if (variant === 'topic') {
			return `${baseClasses} bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30`;
		} else {
			return `${baseClasses} bg-gray-500/20 text-gray-300 hover:bg-gray-500/30`;
		}
	});
</script>

<span class={className}>
	{text}
</span>
