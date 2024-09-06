<script>
	import { onMount } from 'svelte';

	let {
		animation = 'none',
		animation_out = 'none; opacity: 0',
		once = false,
		top = 0,
		bottom = 0,
		css_observer = '',
		css_animation = '',
		children,
		onUpdate = () => {}
	} = $props();

	let observing = $state(true);
	let container;

	$effect(() => {
		onUpdate({ observing });
	});

	function intersection_verify(box) {
		const rootMargin = `${-bottom}px 0px ${-top}px 0px`;
		const observer = new IntersectionObserver(
			(entries) => {
				observing = entries[0].isIntersecting;
				if (observing && once) {
					observer.unobserve(box);
				}
			},
			{ rootMargin }
		);
		observer.observe(box);
		return () => observer.unobserve(box);
	}

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			return intersection_verify(container);
		}
	});
</script>

<div bind:this={container} style={css_observer}>
	{#if observing}
		<div style="animation: {animation}; {css_animation}">
			{@render children(observing)}
		</div>
	{:else}
		<div style="animation: {animation_out}; {css_animation}">
			{@render children(observing)}
		</div>
	{/if}
</div>
