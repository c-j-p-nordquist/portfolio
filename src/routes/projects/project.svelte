<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { SITE_URL, OG_IMAGE, NAME } from '$lib/site.js';

	let {
		title,
		date,
		summary,
		tags = [],
		cover,
		coverAlt,
		repoUrl,
		liveUrl,
		slug = '',
		prevProject = null,
		nextProject = null,
		children
	} = $props();

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
		<a class="text-link back-link" href="/#projects"
			><span aria-hidden="true">←</span> All projects</a
		>
		<h1 style:view-transition-name={slug ? `project-title-${slug}` : undefined}>{title}</h1>
		<p class="project-lead">{summary}</p>

		<div class="project-facts">
			<p class="eyebrow project-meta">
				<time datetime={date}>Shipped {formatDate(date)}</time>
				{#each tags as tag}<span aria-hidden="true">/</span><span>{tag}</span>{/each}
			</p>
			{#if liveUrl || repoUrl}
				<div class="project-actions">
					{#if liveUrl}
						<a class="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">
							<span>Try it live</span>
							<span aria-hidden="true">↗</span>
						</a>
					{/if}
					{#if repoUrl}
						<a
							class={liveUrl ? 'button secondary' : 'button primary'}
							href={repoUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span>Source on GitHub</span>
							<span aria-hidden="true">↗</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</header>

	{#if cover}
		<figure class="project-hero-figure fade-up">
			<img
				class="project-hero-image"
				style:view-transition-name={slug ? `project-cover-${slug}` : undefined}
				src={cover}
				alt={coverAlt ?? ''}
				width="1600"
				height="1112"
			/>
			{#if coverAlt}
				<figcaption class="project-figcaption">{coverAlt}</figcaption>
			{/if}
		</figure>
	{/if}

	<div class="project-body">
		{@render children()}
	</div>

	<footer class="project-footer" aria-label="Project navigation">
		<div class="project-Adjacent">
			{#if prevProject}
				<a class="adjacent-card" href={prevProject.path}>
					<span class="eyebrow"><span aria-hidden="true">←</span> Newer project</span>
					<strong>{prevProject.title}</strong>
				</a>
			{/if}
			{#if nextProject}
				<a class="adjacent-card next" href={nextProject.path}>
					<span class="eyebrow">Older project <span aria-hidden="true">→</span></span>
					<strong>{nextProject.title}</strong>
				</a>
			{/if}
		</div>
		<div class="project-footer-back">
			<a class="text-link" href="/#projects"
				><span aria-hidden="true">←</span> Back to all projects</a
			>
		</div>
	</footer>
</article>
