<script>
	import { onMount } from 'svelte';

	let time = $state('');

	onMount(() => {
		const formatter = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Stockholm'
		});
		const tick = () => (time = formatter.format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});
</script>

<footer class="border-t border-stone-200 dark:border-stone-800">
	<div
		class="max-w-[640px] mx-auto px-6 py-[22px] flex items-center justify-between gap-4 flex-wrap"
	>
		<span class="text-xs text-muted dark:text-muted-dark">
			&copy; {new Date().getFullYear()} Philip Nordquist
		</span>
		<span class="text-xs text-muted dark:text-muted-dark tabular-nums">
			Mantorp, Sweden{#if time}&ensp;&middot;&ensp;{time} local{/if}
		</span>
	</div>
</footer>
