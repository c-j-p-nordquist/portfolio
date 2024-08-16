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
			return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
		} else if (variant === 'skill') {
			return `${baseClasses} bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200`;
		} else if (variant === 'type') {
			return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
		} else if (variant === 'topic') {
			return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
		} else {
			return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`;
		}
	});
</script>

<span class={className}>
	{text}
</span>
