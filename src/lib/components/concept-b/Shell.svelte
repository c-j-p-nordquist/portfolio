<script>
	import { page } from '$app/stores';
	import { COMPANY_NAME, CONTACT_EMAIL, ORG_NUMBER } from '$lib/data/company.js';
	let { children } = $props();
	let profile = $derived($page.url.pathname === '/b/philip');
</script>

<div class="concept-b">
	<aside class="b-sidebar">
		<a class="b-brand" href="/b" aria-label="CJP IT Consulting home">cjp<span>.</span></a>
		<p class="b-brand-caption">IT CONSULTING AB<br />MANTORP, SWEDEN</p>
		<nav class="b-navigation" aria-label="Main navigation">
			<a href="/b" aria-current={!profile && !$page.url.hash ? 'page' : undefined}
				><span aria-hidden="true">01</span>Company</a
			>
			<a href="/b#services"><span aria-hidden="true">02</span>Services</a>
			<a href="/b#approach"><span aria-hidden="true">03</span>Engagements</a>
			<a href="/b/philip" aria-current={profile ? 'page' : undefined}
				><span aria-hidden="true">04</span>Philip Nordquist</a
			>
		</nav>
		<div class="b-sidebar-contact">
			<p class="b-label">Project enquiries</p>
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}<span aria-hidden="true">↗</span></a>
			<p>Sweden &amp; international<br />Remote engagements</p>
		</div>
	</aside>
	<div class="b-document">
		<main id="main-content">{@render children()}</main>
		<footer class="b-footer">
			<span>&copy; {new Date().getFullYear()} {COMPANY_NAME}<br />Org.nr {ORG_NUMBER}</span><a
				href="#main-content">Back to top <span aria-hidden="true">↑</span></a
			>
		</footer>
	</div>
</div>
