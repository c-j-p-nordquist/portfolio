<script>
	import { onMount } from 'svelte';
	import { NAME, COMPANY_NAME, ORG_NUMBER } from '$lib/site.js';

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

<footer class="site-footer">
	<div class="site-container footer-inner">
		<div>
			<a class="footer-brand" href="/">philip.</a><span
				>&copy; {new Date().getFullYear()} {NAME}</span
			>
		</div>
		<span>{COMPANY_NAME} <span aria-hidden="true">·</span> Org.nr {ORG_NUMBER}</span><span
			>{time ? `Mantorp, Sweden · ${time} local` : 'Mantorp, Sweden'}</span
		><a href="#main-content">Back to top ↑</a>
	</div>
</footer>
