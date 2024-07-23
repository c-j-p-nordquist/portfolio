<script>
	let { text = '', delay = 100, onComplete = () => {} } = $props();
	let displayText = $state('');
	let index = $state(0);

	$effect(() => {
		if (index < text.length) {
			setTimeout(() => {
				displayText += text[index];
				index++;
			}, delay);
		} else {
			onComplete();
		}
	});
</script>

<span>{displayText}</span>
