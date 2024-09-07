<script>
	let { variant = 'primary', href, animate = false, children } = $props();
	let isVisible = $state(!animate);

	$effect(() => {
		if (animate) {
			setTimeout(() => {
				isVisible = true;
			}, 300);
		}
	});

	// Base styles for all buttons
	const baseClasses =
		'font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3';

	// Specific styles for each button variant
	const variantClasses = {
		primary:
			'bg-secondary hover:bg-secondary/80 text-background dark:text-darkBackground focus:ring-accent hover:scale-105',
		secondary:
			'bg-background hover:bg-background/80 text-text dark:bg-darkBackground dark:hover:bg-darkBackground/80 dark:text-darkText focus:ring-secondary',
		outline:
			'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-background dark:text-darkText dark:hover:text-darkBackground focus:ring-accent',
		hero: 'bg-accent hover:bg-accent/80 text-background dark:text-darkBackground focus:ring-secondary hover:scale-105'
	};
</script>

<!-- Snippet for rendering a button -->
{#snippet button()}
	<button
		class={`${baseClasses} ${variantClasses[variant]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
	>
		{@render children()}
	</button>
{/snippet}

<!-- Snippet for rendering a link -->
{#snippet link()}
	<a
		{href}
		class={`inline-block ${baseClasses} ${variantClasses[variant]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
	>
		{@render children()}
	</a>
{/snippet}

<!-- Conditional rendering based on whether href is present -->
{#if href}
	{@render link()}
{:else}
	{@render button()}
{/if}
