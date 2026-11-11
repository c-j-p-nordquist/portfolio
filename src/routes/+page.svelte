<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { workHistory } from '$lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE, NAME, EMAIL, GITHUB_URL } from '$lib/site.js';

	let { data } = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
	const featuredRoles = workHistory.slice(0, 4);

	// Small utilities hosted on this site. Each also answers plain text to curl.
	const tools = [
		{
			name: 'Lookslike',
			kind: 'Lookalike domain scanner',
			path: '/lookslike',
			summary:
				'Finds registered typo and homoglyph versions of a domain, and which of them are set up for email.',
			usage: 'curl philip.nordquist.me/lookslike/example.se'
		}
	];

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
		<p class="eyebrow">
			{NAME} <span aria-hidden="true">/</span> Platform &amp; Security Engineer
			<span aria-hidden="true">/</span> Mantorp, Sweden
		</p>
		<h1>Things I've built,<br /><span class="accent">and finished.</span></h1>
		<div class="intro-body">
			<p>
				By day I build and secure production platforms at <strong>STIM</strong>, and previously led
				global releases and anti-censorship engineering across 3,000+ servers at
				<strong>ExpressVPN</strong>. Outside of work I make small tools and games—this is where the
				finished ones end up, each with a short write-up.
			</p>
			<p class="intro-links">
				<a class="text-link" href="/about">About &amp; CV <span aria-hidden="true">→</span></a><a
					class="text-link"
					href="/files/pn_resume_26.pdf"
					target="_blank"
					rel="noopener noreferrer">Resume (PDF) <span aria-hidden="true">↗</span></a
				><a class="text-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
					>GitHub <span aria-hidden="true">↗</span></a
				><a class="text-link" href="mailto:{EMAIL}">Email <span aria-hidden="true">↗</span></a>
			</p>
		</div>
	</section>

	<section id="projects" class="projects-section" aria-labelledby="projects-heading">
		<div class="section-heading">
			<h2 id="projects-heading">Selected projects</h2>
			<span class="eyebrow">{String(data.projects.length).padStart(2, '0')} shipped</span>
		</div>
		<ol class="project-list">
			{#each data.projects as project, i}
				{@const num = String(i + 1).padStart(2, '0')}
				<li class="project-card fade-up" style="--delay: {i * 80}ms">
					<div class="project-cover" aria-hidden="true">
						{#if project.cover}
							<img
								style:view-transition-name={`project-cover-${project.slug}`}
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
							<span class="project-index">{num}</span>
							<span aria-hidden="true">/</span>
							<time datetime={project.date}>{formatDate(project.date)}</time>
							{#each project.tags ?? [] as tag}<span aria-hidden="true">/</span><span>{tag}</span
								>{/each}
						</p>
						<h3 style:view-transition-name={`project-title-${project.slug}`}>
							<a class="card-primary-link" href={project.path}>{project.title}</a>
						</h3>
						<p>{project.summary}</p>
						<div class="project-card-footer">
							<span class="text-link read-more" aria-hidden="true">Read the write-up →</span>
							{#if project.liveUrl || project.repoUrl}
								<div class="card-direct-links">
									{#if project.liveUrl}
										<a
											class="card-pill"
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Try live <span aria-hidden="true">↗</span>
										</a>
									{/if}
									{#if project.repoUrl}
										<a
											class="card-pill"
											href={project.repoUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Source <span aria-hidden="true">↗</span>
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section class="home-career-section home-tools-section" aria-labelledby="tools-heading">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Browser &amp; terminal</p>
				<h2 id="tools-heading">Tools</h2>
			</div>
		</div>
		<div class="home-career-ledger">
			{#each tools as tool}
				<a class="ledger-row tool-row" href={tool.path}>
					<div class="ledger-role">
						<strong>{tool.name}</strong>
						<span class="ledger-position">{tool.kind}</span>
					</div>
					<p class="ledger-summary">{tool.summary}</p>
					<code class="tool-usage">$ {tool.usage}</code>
				</a>
			{/each}
		</div>
	</section>

	<section class="home-career-section" aria-labelledby="career-snapshot-heading">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Day job &amp; track record</p>
				<h2 id="career-snapshot-heading">Experience</h2>
			</div>
			<a class="text-link" href="/about"
				>Full profile &amp; skills <span aria-hidden="true">→</span></a
			>
		</div>
		<div class="home-career-ledger">
			{#each featuredRoles as role}
				<div class="ledger-row">
					<div class="ledger-role">
						<strong>{role.company}</strong>
						<span class="ledger-position">{role.position}</span>
					</div>
					<p class="ledger-summary">{role.description}</p>
					<span class="eyebrow ledger-period">{role.period}</span>
				</div>
			{/each}
		</div>
	</section>
</div>
