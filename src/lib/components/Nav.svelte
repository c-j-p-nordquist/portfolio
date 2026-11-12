<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { NAME, EMAIL, GITHUB_URL } from '$lib/site.js';

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
		<a class="brand" href="/">{NAME}</a>
		<div class="nav-links">
			<a href="/about" aria-current={path === '/about' ? 'page' : undefined}>About</a><a
				href={GITHUB_URL}
				target="_blank"
				rel="noopener noreferrer">GitHub</a
			><a href="mailto:{EMAIL}">Email</a><button
				type="button"
				class="theme-toggle"
				onclick={toggleTheme}
				aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
				title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
			>
				<span class="theme-dot" aria-hidden="true"></span>
				<span class="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
			</button>
		</div>
	</div>
</nav>
