<script>
	import { page } from '$app/stores';
	let onPhilip = $derived($page.url.pathname.startsWith('/philip'));
</script>

<nav class="site-nav" aria-label="Main navigation">
	<div class="site-container nav-inner">
		<a class="brand" href="/" aria-label="CJP IT Consulting home"
			>cjp<span>.</span><small>IT CONSULTING<br />SWEDEN / WORLDWIDE</small></a
		>
		<div class="nav-links">
			<a href="/#services">Services</a><a class="approach-nav" href="/#approach">Engagements</a><a
				href="/philip"
				aria-current={onPhilip ? 'page' : undefined}>Philip</a
			><a class="nav-contact" href="/#contact">Contact <span aria-hidden="true">↗</span></a>
		</div>
	</div>
</nav>
