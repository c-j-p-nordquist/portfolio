<script>
	let {
		text = '',
		duration = 1000,
		delay = 50,
		class: className = '',
		onComplete = () => {} // Callback prop for animation completion
	} = $props();

	let words = $state(text.split(' '));
	let visible = $state(false);

	$effect(() => {
		words = text.split(' ');
		visible = false;
		setTimeout(() => {
			visible = true;
			// Call onComplete callback after the last word's animation finishes
			setTimeout(onComplete, duration + (words.length - 1) * delay);
		}, 100);
	});
</script>

{#snippet wordSpan(content, index)}
	<span
		class="inline-block transition-all duration-1000 ease-out"
		style="
            --delay: {index * delay}ms;
            --spacing: {visible ? '0.03em' : '0'};
            --opacity: {visible ? 1 : 0};
            transition-delay: var(--delay);
            letter-spacing: var(--spacing);
            opacity: var(--opacity);
            transform: translateY({visible ? '0' : '10px'});
        "
	>
		{content}
	</span>
{/snippet}

<div class={className}>
	{#each words as word, i}
		<span class="inline-flex" style="margin-right: 0.2em;">
			{@render wordSpan(word, i)}
		</span>
	{/each}
</div>

<style>
	div {
		word-spacing: normal;
	}
	span {
		display: inline-block;
	}
</style>
