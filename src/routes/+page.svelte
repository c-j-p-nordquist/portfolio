<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { SITE_URL, OG_IMAGE, NAME, EMAIL, GITHUB_URL } from '$lib/site.js';

	let { data } = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	const metaDescription =
		'Philip Nordquist, platform and security engineer in Sweden. Small tools and apps, each with a short write-up.';

	const personJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: NAME,
		url: SITE_URL,
		email: EMAIL,
		jobTitle: 'Platform & security engineer',
		address: { '@type': 'PostalAddress', addressLocality: 'Mantorp', addressCountry: 'SE' },
		sameAs: [GITHUB_URL, 'https://linkedin.com/in/philip-nordquist-269949a0']
	});

	// Built as a full markup string so prettier-plugin-svelte doesn't parse the
	// JSON payload as JavaScript; `<\/script>` keeps the tag from ending early.
	const personJsonLdScript = `<script type="application/ld+json">${personJsonLd}<\/script>`;
</script>

<svelte:head>
	<title>{NAME}</title>
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content={NAME} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={NAME} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={OG_IMAGE} />
	{@html personJsonLdScript}
</svelte:head>

<div class="site-container">
	<section class="intro fade-up">
		<p class="eyebrow">{NAME} <span aria-hidden="true">/</span> Mantorp, Sweden</p>
		<h1>Things I've built,<br /><span class="accent">and finished.</span></h1>
		<div class="intro-body">
			<p>
				My day job is building and securing platforms. Outside of it I make small tools and apps.
				This is where the finished ones end up, each with a short write-up of what it does and how
				it works.
			</p>
			<p class="intro-links">
				<a class="text-link" href="/about">About me <span aria-hidden="true">→</span></a><a
					class="text-link"
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a
				><a class="text-link" href="mailto:{EMAIL}">Email <span aria-hidden="true">↗</span></a>
			</p>
		</div>
	</section>

	<section id="projects" class="projects-section" aria-labelledby="projects-heading">
		<div class="section-heading">
			<h2 id="projects-heading">Projects</h2>
			<span class="eyebrow">{data.projects.length} shipped</span>
		</div>
		<ol class="project-list">
			{#each data.projects as project, i}
				<li class="project-card fade-up" style="--delay: {i * 80}ms">
					<div class="project-cover" aria-hidden="true">
						{#if project.cover}
							<img
								src={project.cover}
								alt=""
								width="1600"
								height="1112"
								loading={i ? 'lazy' : 'eager'}
							/>
						{:else}
							<span>{project.title}</span>
						{/if}
					</div>
					<div class="project-text">
						<p class="eyebrow project-meta">
							<time datetime={project.date}>{formatDate(project.date)}</time>
							{#each project.tags ?? [] as tag}<span aria-hidden="true">/</span><span>{tag}</span
								>{/each}
						</p>
						<h3><a href={project.path}>{project.title}</a></h3>
						<p>{project.summary}</p>
						<span class="text-link read-more" aria-hidden="true">Read the write-up →</span>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</div>
