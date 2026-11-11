<script>
	import { page } from '$app/stores';
	import { NAME } from '$lib/site.js';
</script>

<svelte:head>
	<title>{$page.status} · {NAME}</title>
</svelte:head>

<div class="site-container error-page fade-up">
	<p class="eyebrow">Error <span aria-hidden="true">/</span> Status {$page.status}</p>
	<h1>{$page.status}</h1>
	<p class="project-lead">
		{$page.error?.message || "The page you're looking for doesn't exist."}
	</p>
	<div class="hero-actions">
		<a class="button primary" href="/">Back to home <span aria-hidden="true">→</span></a>
		<button type="button" class="text-link" onclick={() => history.back()}>
			<span aria-hidden="true">←</span> Go back
		</button>
	</div>
</div>
