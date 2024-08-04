<script>
	import { goto } from '$app/navigation';

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
				return type === 'blog' ? 'bg-success/20 text-success' : 'bg-info/20 text-info';
			case 'topic':
				return 'bg-secondary/20 text-secondary';
			default:
				return 'bg-primary/20 text-primary';
		}
	});

	$effect(() => {
		// Capitalize the first letter if it's a type
		if (type) {
			text = text.charAt(0).toUpperCase() + text.slice(1);
		}
	});

	let className = $derived(
		`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClass} 
		transition-all duration-200 ease-in-out 
		hover:bg-opacity-30 hover:scale-105 hover:shadow-md 
		active:scale-95 cursor-pointer`
	);

	function handleClick() {
		if (onclick) {
			onclick();
		} else {
			// Navigate to the post summary page with the appropriate filter
			const filterType = type ? 'type' : 'topic';
			const filterValue = encodeURIComponent(text.toLowerCase());
			goto(`/posts?${filterType}=${filterValue}`);
		}
	}
</script>

<button onclick={handleClick} class={className}>
	{text}
</button>
