<script>
	import { page } from '$app/state';
	import { workHistory } from '#lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE, NAME, EMAIL, GITHUB_URL } from '#lib/site.js';

	let { data } = $props();

	let canonicalUrl = $derived(SITE_URL + page.url.pathname);
	const featuredRoles = workHistory.slice(0, 4);

	const formatMonth = (date) =>
		new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });

	// Small utilities hosted on this site. Each also answers plain text to curl.
	// `sample` is real output, trimmed to its first and last line.
	const tools = [
		{
			name: 'Lookslike',
			path: '/lookslike',
			summary:
				'Checks which typo and lookalike versions of a domain are already registered, and which of those can send or receive email. Run it in the browser or from a terminal with curl.',
			action: 'Try it on your domain',
			// Decoration only: the kind of lookalikes the tool hunts for.
			real: 'nordquist.me',
			variants: [
				'nordqu1st.me',
				'n0rdquist.me',
				'nordquist.me',
				'nordquíst.me',
				'nordquist.rne',
				'norqduist.me',
				'nordquist.co',
				'nοrdquist.me'
			],
			command: 'curl philip.nordquist.me/lookslike/nordquist.me',
			sample: [
				'lookslike nordquist.me: 250 variants, Cloudflare DNS',
				'…',
				'checked 22, registered 12, live 11, email 9 (0.6s)'
			]
		}
	];

	const metaDescription =
		'Philip Nordquist, platform and security engineer in Sweden. Selected side projects, each with a short write-up.';

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

<section class="site-container home-intro">
	<h1 class="sr-only">{NAME}</h1>
	<p>
		I work with infrastructure and security in Sweden, and build smaller tools, apps and games on
		the side. Here are a few recent ones.
	</p>
</section>

<div id="projects">
	{#each data.projects as project, i}
		<section class="world world-{project.slug} band" aria-labelledby="project-{project.slug}">
			<div class="site-container band-inner">
				<div class="band-media">
					{#if project.slug === 'ink-magic'}
						<div class="practice-grid" aria-hidden="true"><span>山</span></div>
					{/if}
					{#if project.cover}
						<img
							style:view-transition-name={`project-cover-${project.slug}`}
							src={project.cover}
							alt={project.coverAlt ?? ''}
							width="1600"
							height="1112"
							loading={i < 2 ? 'eager' : 'lazy'}
						/>
					{/if}
				</div>
				<div class="band-text">
					<p class="band-kind">
						{project.kind ?? project.tags?.[0] ?? 'Project'},
						<time datetime={project.date}>{formatMonth(project.date)}</time>
					</p>
					<h2
						id="project-{project.slug}"
						style:view-transition-name={`project-title-${project.slug}`}
					>
						<a href={project.path}>{project.title}</a>
					</h2>
					<p class="band-pitch">{project.pitch ?? project.summary}</p>
					{#if project.slug === 'brokerage-mcp'}
						<div class="ticket">
							<p class="ticket-head"><span>ORDER TICKET</span><span>DEMO</span></p>
							<dl>
								<div>
									<dt>requested by</dt>
									<dd>AI agent</dd>
								</div>
								<div>
									<dt>mode</dt>
									<dd>dry run</dd>
								</div>
								<div>
									<dt>audit log</dt>
									<dd>written</dd>
								</div>
								<div>
									<dt>approval</dt>
									<dd>waiting for a human</dd>
								</div>
							</dl>
							<p class="ticket-stamp">NOTHING TRADES YET</p>
						</div>
					{/if}
					<p class="band-links">
						{#if project.liveUrl}
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Try it</a>
						{/if}
						<a href={project.path}>Read the write-up</a>
						{#if project.repoUrl}
							<a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source</a>
						{/if}
					</p>
				</div>
			</div>
		</section>
	{/each}
</div>

<div id="tools">
	{#each tools as tool}
		<section class="world band band-tool" aria-labelledby="tool-{tool.name}">
			<div class="site-container band-inner">
				{#if tool.variants}
					<p class="tool-variants" aria-hidden="true">
						{#each tool.variants as variant}
							<span class:real={variant === tool.real}>{variant}</span>
						{/each}
					</p>
				{/if}
				<div class="band-text">
					<h2 id="tool-{tool.name}"><a href={tool.path}>{tool.name}</a></h2>
					<p class="band-pitch">{tool.summary}</p>
					<p class="band-links"><a href={tool.path}>{tool.action}</a></p>
				</div>
				<pre class="tool-terminal"><code
						><i>$ </i><b>{tool.command}</b>{'\n' + tool.sample.join('\n')}</code
					></pre>
			</div>
		</section>
	{/each}
</div>

<section class="site-container day-job" aria-labelledby="day-job-heading">
	<div class="day-job-text">
		<h2 id="day-job-heading">And the day job</h2>
		<p>
			At STIM, I built the Kubernetes platform that runs our production applications and now split
			my time between the platform and security monitoring. Before that I was at ExpressVPN, leading
			weekly releases across 3,000+ VPN servers and working to keep the service reachable in
			censored regions.
		</p>
		<a href="/about">About and resume</a>
	</div>
	<ul class="role-list">
		{#each featuredRoles as role}
			<li>
				<span><strong>{role.company}</strong>, {role.position}</span>
				<span>{role.period}</span>
			</li>
		{/each}
	</ul>
</section>
