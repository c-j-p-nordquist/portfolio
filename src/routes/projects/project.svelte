<script>
	import { page } from '$app/stores';
	import { SITE_URL, OG_IMAGE, NAME } from '$lib/site.js';

	let {
		title,
		date,
		summary,
		tags = [],
		kind,
		stats = [],
		cover,
		coverAlt,
		repoUrl,
		liveUrl,
		slug = '',
		prevProject = null,
		nextProject = null,
		firstProject = null,
		children
	} = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
	let ogImage = $derived(cover ? SITE_URL + cover : OG_IMAGE);

	// The way out is the next (older) project; from the oldest, loop back to the newest.
	let onward = $derived(nextProject ?? firstProject);

	const formatMonth = (value) =>
		new Date(value).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
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
	<header class="project-header">
		<p class="band-kind">
			{kind ?? tags[0] ?? 'Project'}, <time datetime={date}>{formatMonth(date)}</time>
		</p>
		<h1 style:view-transition-name={slug ? `project-title-${slug}` : undefined}>{title}</h1>
		<p class="project-lead">{summary}</p>
		{#if liveUrl || repoUrl}
			<div class="project-actions">
				{#if liveUrl}
					<a class="button primary" href={liveUrl} target="_blank" rel="noopener noreferrer">
						Try it now
					</a>
				{/if}
				{#if repoUrl}
					<a
						class={liveUrl ? 'button secondary' : 'button primary'}
						href={repoUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Source on GitHub
					</a>
				{/if}
			</div>
		{/if}
	</header>

	{#if cover}
		<figure class="project-hero-figure">
			<img
				class="project-hero-image"
				style:view-transition-name={slug ? `project-cover-${slug}` : undefined}
				src={cover}
				alt={coverAlt ?? ''}
				width="1600"
				height="1112"
			/>
		</figure>
	{/if}

	{#if stats.length}
		<dl class="project-stats">
			{#each stats as stat}
				<div>
					<dt>{stat.label}</dt>
					<dd>{stat.value}</dd>
				</div>
			{/each}
		</dl>
	{/if}

	<div class="project-body">
		{@render children()}
	</div>
</article>

{#if onward}
	<a class="world world-{onward.slug} next-band" href={onward.path}>
		<span class="site-container next-band-inner">
			<span>{nextProject ? 'Next finished thing' : 'Back to the newest'}</span>
			<strong>{onward.title}</strong>
		</span>
	</a>
{/if}
