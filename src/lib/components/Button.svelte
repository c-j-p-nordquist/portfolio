<script>
	let {
		href = '',
		variant = 'primary',
		animate = false,
		delay = 0,
		fullWidth = false,
		onclick = () => {},
		children
	} = $props();

	const baseClasses =
		'inline-block font-sans font-medium py-2 px-4 rounded-md transition-all duration-300 text-center';
	const variantClasses = {
		primary:
			'bg-primary text-background hover:bg-opacity-90 dark:bg-background dark:text-primary dark:hover:bg-opacity-90',
		secondary:
			'bg-background text-primary border border-primary hover:bg-primary hover:text-background dark:bg-primary dark:text-background dark:border-background dark:hover:bg-background dark:hover:text-primary',
		tertiary:
			'bg-transparent text-primary hover:text-accent dark:text-background dark:hover:text-accent'
	};
</script>

{#if href}
	<a
		{href}
		class="{baseClasses} {variantClasses[variant]} {fullWidth ? 'w-full' : 'w-auto'}"
		class:hover:scale-105={animate}
		in:fly={animate ? { y: 20, duration: 800, delay, easing: cubicOut } : null}
	>
		{@render children()}
	</a>
{:else}
	<button
		class="{baseClasses} {variantClasses[variant]} {fullWidth ? 'w-full' : 'w-auto'}"
		class:hover:scale-105={animate}
		in:fly={animate ? { y: 20, duration: 800, delay, easing: cubicOut } : null}
		{onclick}
	>
		{@render children()}
	</button>
{/if}
