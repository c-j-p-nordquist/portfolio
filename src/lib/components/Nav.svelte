<script>
	import { page } from '$app/stores';
	import { EMAIL } from '$lib/site.js';

	let path = $derived($page.url.pathname);
</script>

<nav class="site-nav" aria-label="Main navigation">
	<div class="site-container nav-inner">
		<a class="brand" href="/" aria-label="Philip Nordquist, home">philip<span>.</span></a>
		<div class="nav-links">
			<a
				href="/#projects"
				aria-current={path === '/' || path.startsWith('/projects') ? 'page' : undefined}>Projects</a
			><a href="/about" aria-current={path === '/about' ? 'page' : undefined}>About</a><a
				class="nav-contact"
				href="mailto:{EMAIL}">Email <span aria-hidden="true">↗</span></a
			>
		</div>
	</div>
</nav>
