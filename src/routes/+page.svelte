<script>
	import { page } from '$app/stores';
	import { workHistory, education } from '$lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE } from '$lib/site.js';
	import JobEntry from '$lib/components/JobEntry.svelte';

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	const personJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Philip Nordquist',
		url: SITE_URL,
		jobTitle: 'DevSecOps Engineer',
		worksFor: { '@type': 'Organization', name: 'STIM' },
		address: { '@type': 'PostalAddress', addressLocality: 'Mantorp', addressCountry: 'SE' },
		sameAs: [
			'https://github.com/c-j-p-nordquist',
			'https://linkedin.com/in/philip-nordquist-269949a0'
		]
	});

	// Built as a full markup string (rather than a literal <script> tag in this
	// file) so prettier-plugin-svelte doesn't try to parse the JSON payload as
	// JavaScript. The `<\/script>` escape keeps the HTML tokenizer from ending
	// the tag early when this string is inserted via {@html} below.
	const personJsonLdScript = `<script type="application/ld+json">${personJsonLd}<\/script>`;
</script>

<svelte:head>
	<title>Philip Nordquist</title>
	<meta
		name="description"
		content="Philip Nordquist, platform and DevSecOps engineer in Mantorp, Sweden."
	/>
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content="Philip Nordquist" />
	<meta property="og:description" content="Platform and DevSecOps engineer in Mantorp, Sweden." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Philip Nordquist — Platform & DevSecOps Engineer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Philip Nordquist" />
	<meta name="twitter:description" content="Platform and DevSecOps engineer in Mantorp, Sweden." />
	<meta name="twitter:image" content={OG_IMAGE} />
	{@html personJsonLdScript}
</svelte:head>

<div class="max-w-[640px] mx-auto px-6 pt-[72px] pb-[100px]">
	<!-- Hero -->
	<section class="mb-[88px]">
		<h1
			class="fade-up text-[30px] font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100 mb-[18px] leading-[1.1]"
			style="text-wrap: balance;"
		>
			Philip Nordquist
		</h1>

		<p
			class="fade-up text-[15.5px] text-stone-600 dark:text-stone-400 leading-[1.75] mb-2.5 max-w-[460px]"
			style="text-wrap: pretty; --delay: 60ms;"
		>
			Platform and DevSecOps engineer in Mantorp, Sweden. I build and run cloud platforms, security
			operations, and deep networking, plus the automation around them.
		</p>
		<p
			class="fade-up text-[15.5px] text-stone-600 dark:text-stone-400 leading-[1.75] mb-[30px] max-w-[460px]"
			style="text-wrap: pretty; --delay: 120ms;"
		>
			Currently at <strong class="text-stone-900 dark:text-stone-100 font-medium">STIM</strong>,
			working on the Kubernetes platform and Sentinel detections. Previously at
			<strong class="text-stone-900 dark:text-stone-100 font-medium">ExpressVPN</strong>, working on
			global VPN infrastructure and protocol-level countermeasures.
		</p>

		<div class="fade-up flex items-center gap-[18px] flex-wrap" style="--delay: 180ms;">
			<a
				href="https://github.com/c-j-p-nordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center gap-1 py-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				GitHub
				<svg
					class="w-[11px] h-[11px] transition-transform group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
			<a
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center gap-1 py-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				LinkedIn
				<svg
					class="w-[11px] h-[11px] transition-transform group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
			<a
				href="mailto:philip@nordquist.me"
				class="group inline-flex items-center gap-1 py-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				Email
				<svg
					class="w-[11px] h-[11px] transition-transform group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					focusable="false"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
		</div>
	</section>

	<!-- Experience -->
	<section id="experience" class="fade-up mb-20 scroll-mt-[70px]" style="--delay: 240ms;">
		<div class="flex items-center gap-[14px] mb-6">
			<h2
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-muted dark:text-muted-dark whitespace-nowrap"
			>
				Experience
			</h2>
			<div class="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
		</div>

		{#each workHistory as job, i}
			<JobEntry {job} />
			{#if i < workHistory.length - 1}
				<div class="h-px bg-stone-100 dark:bg-stone-900"></div>
			{/if}
		{/each}
	</section>

	<!-- Education -->
	<section id="education" class="fade-up mb-20 scroll-mt-[70px]" style="--delay: 300ms;">
		<div class="flex items-center gap-[14px] mb-6">
			<h2
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-muted dark:text-muted-dark whitespace-nowrap"
			>
				Education
			</h2>
			<div class="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
		</div>

		{#each education as edu, i}
			<div class="py-[18px]">
				<div class="flex justify-between items-baseline gap-4 mb-[5px]">
					<h3
						class="text-[14.5px] font-medium tracking-[-0.01em] text-stone-900 dark:text-stone-100"
					>
						{edu.institution}
					</h3>
					<span class="text-[11.5px] text-muted dark:text-muted-dark shrink-0">
						{edu.period}
					</span>
				</div>
				<p class="text-[13px] text-stone-600 dark:text-stone-400">{edu.program}</p>
			</div>
			{#if i < education.length - 1}
				<div class="h-px bg-stone-100 dark:bg-stone-900"></div>
			{/if}
		{/each}
	</section>

	<!-- Day to day -->
	<section class="fade-up scroll-mt-[70px]" style="--delay: 360ms;">
		<div class="flex items-center gap-[14px] mb-6">
			<h2
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-muted dark:text-muted-dark whitespace-nowrap"
			>
				Day to day
			</h2>
			<div class="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
		</div>
		<p
			class="text-[14.5px] text-stone-600 dark:text-stone-400 leading-[1.75]"
			style="text-wrap: pretty;"
		>
			Mostly Kubernetes, Terraform, and CI/CD pipelines, with Prometheus and Grafana close by, plus
			a fair bit of security and incident work. When something needs automating I reach for Python,
			Go, or Bash, and bring in an LLM where it genuinely helps. Outside work, I build small AI and
			trading tools for my own use: MCP servers, agent tooling, that kind of thing.
		</p>
	</section>
</div>
