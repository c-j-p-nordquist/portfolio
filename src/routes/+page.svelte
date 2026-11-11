<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { workHistory } from '$lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE, NAME, EMAIL, GITHUB_URL } from '$lib/site.js';

	let { data } = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
	const featuredRoles = workHistory.slice(0, 4);

	// Small utilities hosted on this site. Each also answers plain text to curl.
	// `sample` is real output, trimmed to its first and last line.
	const tools = [
		{
			name: 'Lookslike',
			kind: 'Lookalike domain scanner',
			path: '/lookslike',
			summary:
				'Finds registered typo and homoglyph versions of a domain, and which of them are set up for email. Open it in a browser, or ask from a terminal.',
			command: 'curl philip.nordquist.me/lookslike/nordquist.me',
			sample: [
				'lookslike nordquist.me: 250 variants, Cloudflare DNS',
				'…',
				'checked 22, registered 12, live 11, email 9 (0.6s)'
			]
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
				<strong>ExpressVPN</strong>. Outside of work I make small tools and games. This is where the
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
			<h2 id="projects-heading">Projects</h2>
			<span class="eyebrow">{data.projects.length} shipped</span>
		</div>

		<ol class="project-list">
			{#each data.projects as project, i}
				<li class="project-card">
					<div class="project-cover" aria-hidden="true">
						{#if project.cover}
							<img
								style:view-transition-name={`project-cover-${project.slug}`}
								src={project.cover}
								alt=""
								width="1600"
								height="1112"
								loading={i < 3 ? 'eager' : 'lazy'}
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
						<h3 style:view-transition-name={`project-title-${project.slug}`}>
							<a class="card-primary-link" href={project.path}>{project.title}</a>
						</h3>
						<p>{project.summary}</p>
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
				</li>
			{/each}
		</ol>
	</section>

	<section id="tools" class="tools-section" aria-labelledby="tools-heading">
		<div class="section-heading">
			<h2 id="tools-heading">Tools</h2>
			<span class="eyebrow">Browser or curl</span>
		</div>

		<ul class="tool-list">
			{#each tools as tool}
				<li class="tool-card">
					<div class="tool-text">
						<h3><a class="card-primary-link" href={tool.path}>{tool.name}</a></h3>
						<p class="tool-kind">{tool.kind}</p>
						<p>{tool.summary}</p>
					</div>
					<pre class="tool-terminal"><code
							><i>$ </i><b>{tool.command}</b>{'\n' + tool.sample.join('\n')}</code
						></pre>
				</li>
			{/each}
		</ul>
	</section>

	<section class="home-career-section" aria-labelledby="career-snapshot-heading">
		<div class="section-heading">
			<h2 id="career-snapshot-heading">Experience</h2>
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
