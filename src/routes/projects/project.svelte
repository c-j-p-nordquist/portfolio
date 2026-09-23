<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { SITE_URL, OG_IMAGE, NAME } from '$lib/site.js';

	let { title, date, summary, tags = [], cover, coverAlt, repoUrl, liveUrl, children } = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
	let ogImage = $derived(cover ? SITE_URL + cover : OG_IMAGE);
</script>

<svelte:head>
	<title>{title} · {NAME}</title>
	<meta name="description" content={summary} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={summary} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={summary} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<article class="site-container project-page">
	<header class="project-header fade-up">
		<a class="text-link back-link" href="/#projects"><span aria-hidden="true">←</span> Projects</a>
		<p class="eyebrow project-meta">
			<time datetime={date}>Shipped {formatDate(date)}</time>
			{#each tags as tag}<span aria-hidden="true">/</span><span>{tag}</span>{/each}
		</p>
		<h1>{title}</h1>
		<p class="project-lead">{summary}</p>
		{#if liveUrl || repoUrl}
			<div class="hero-actions">
				{#if liveUrl}<a
						class="button primary"
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer">Try it <span aria-hidden="true">↗</span></a
					>{/if}
				{#if repoUrl}<a
						class={liveUrl ? 'text-link' : 'button primary'}
						href={repoUrl}
						target="_blank"
						rel="noopener noreferrer">Source on GitHub <span aria-hidden="true">↗</span></a
					>{/if}
			</div>
		{/if}
	</header>
	{#if cover}
		<img
			class="project-hero-image fade-up"
			src={cover}
			alt={coverAlt ?? ''}
			width="1600"
			height="1112"
		/>
	{/if}
	<div class="project-body">
		{@render children()}
	</div>
	<footer class="project-footer">
		<a class="text-link" href="/#projects"><span aria-hidden="true">←</span> All projects</a>
	</footer>
</article>
