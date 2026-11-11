<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { EMAIL } from '$lib/site.js';

	let path = $derived($page.url.pathname);
	let theme = $state('light');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {}
		const favicon = document.getElementById('favicon');
		if (favicon) {
			favicon.href =
				next === 'dark' ? '/images/logos/favicon-dark.svg' : '/images/logos/favicon-light.svg';
		}
	}
</script>

<nav class="site-nav" aria-label="Main navigation">
	<div class="site-container nav-inner">
		<a class="brand" href="/" aria-label="Philip Nordquist, home">philip<span>.</span></a>
		<div class="nav-links">
			<a
				href="/#projects"
				aria-current={path === '/' || path.startsWith('/projects') ? 'page' : undefined}>Projects</a
			><a href="/#tools" aria-current={path.startsWith('/lookslike') ? 'page' : undefined}>Tools</a
			><a href="/about" aria-current={path === '/about' ? 'page' : undefined}>About</a><button
				type="button"
				class="theme-toggle"
				onclick={toggleTheme}
				aria-label={theme === 'dark' ? 'Switch to light paper theme' : 'Switch to dark ink theme'}
				title={theme === 'dark' ? 'Switch to light paper theme' : 'Switch to dark ink theme'}
			>
				<span class="theme-dot" aria-hidden="true"></span>
				<span class="theme-label">{theme === 'dark' ? 'Ink' : 'Paper'}</span>
			</button><a class="nav-contact" href="mailto:{EMAIL}"
				>Email <span aria-hidden="true">↗</span></a
			>
		</div>
	</div>
</nav>
