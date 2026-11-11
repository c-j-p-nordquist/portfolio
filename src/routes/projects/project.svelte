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
		index = 1,
		total = 1,
		prevProject = null,
		nextProject = null,
		children
	} = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
	let ogImage = $derived(cover ? SITE_URL + cover : OG_IMAGE);
	let formattedIndex = $derived(String(index).padStart(2, '0'));
	let formattedTotal = $derived(String(total).padStart(2, '0'));
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
	<div class="project-dossier">
		<div class="project-top-nav fade-up">
			<a class="text-link back-link" href="/#projects"
				><span aria-hidden="true">←</span> All projects</a
			>
		</div>

		<header class="project-header fade-up">
			<p class="eyebrow project-meta">
				<span>Project {formattedIndex} / {formattedTotal}</span>
				<span aria-hidden="true">/</span>
				<time datetime={date}>Shipped {formatDate(date)}</time>
			</p>
			<h1 style:view-transition-name={slug ? `project-title-${slug}` : undefined}>{title}</h1>
			<p class="project-lead">{summary}</p>
		</header>

		<aside class="project-sidebar fade-up" aria-label="Project specifications">
			<div class="project-rail">
				<dl class="dossier-specs">
					<div>
						<dt class="eyebrow">Dossier</dt>
						<dd>No. {formattedIndex} of {formattedTotal}</dd>
					</div>
					<div>
						<dt class="eyebrow">Shipped</dt>
						<dd><time datetime={date}>{formatDate(date)}</time></dd>
					</div>
					{#if tags.length}
						<div>
							<dt class="eyebrow">Stack &amp; scope</dt>
							<dd class="spec-tags">
								{#each tags as tag}
									<span class="spec-tag">{tag}</span>
								{/each}
							</dd>
						</div>
					{/if}
					<div>
						<dt class="eyebrow">Delivery</dt>
						<dd>
							{#if liveUrl && repoUrl}
								Live deployment &amp; source
							{:else if liveUrl}
								Interactive web deployment
							{:else if repoUrl}
								Open-source repository
							{:else}
								Standalone iPad web app
							{/if}
						</dd>
					</div>
				</dl>

				{#if liveUrl || repoUrl}
					<div class="rail-actions">
						{#if liveUrl}
							<a
								class="button primary rail-btn"
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>Try it live</span>
								<span aria-hidden="true">↗</span>
							</a>
						{/if}
						{#if repoUrl}
							<a
								class={liveUrl ? 'button secondary rail-btn' : 'button primary rail-btn'}
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
		</aside>

		<div class="project-main">
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
						<figcaption class="project-figcaption">
							<span class="fig-index" aria-hidden="true">FIG. 01</span>
							{coverAlt}
						</figcaption>
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
		</div>
	</div>
</article>
