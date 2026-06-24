<script>
	import { workHistory, education } from '$lib/data/workHistory.js';
</script>

<svelte:head>
	<title>About – Philip Nordquist</title>
	<meta
		name="description"
		content="Background, experience, and education. Philip Nordquist, platform and DevSecOps engineer."
	/>
	<meta property="og:title" content="About – Philip Nordquist" />
	<meta property="og:description" content="Background, experience, and education." />
	<meta property="og:type" content="profile" />
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
		About
	</h1>
	<div class="text-stone-600 dark:text-stone-400 leading-relaxed space-y-4 mb-16">
		<p>
			I've been working in infrastructure and operations for about 10 years now,
			doing everything from web hosting support to running global VPN infrastructure.
		</p>
		<p>
			These days most of my time goes into Kubernetes, infrastructure as code,
			observability, security operations, and automating the tedious parts. Now and
			then that includes wiring an LLM into a workflow where it helps cut through
			noisy alerts, but it's a small piece next to the platform and security work.
		</p>
		<p>
			Based in Mantorp, Sweden. Outside of work I'm into music, games, and the
			occasional side project.
		</p>
		<a
			href="/files/pn_resume_26.pdf"
			target="_blank"
			rel="noopener noreferrer"
			class="group inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
		>
			Download resume (PDF)
			<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
		</a>
	</div>

	<hr class="border-stone-200 dark:border-stone-800 mb-16" />

	<section class="mb-16">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Experience
		</h2>
		<div class="space-y-1">
			{#each workHistory as job, i}
				<div class="-mx-4 px-4 py-5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors">
					<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
						<h3 class="font-medium text-stone-900 dark:text-stone-100">
							{job.position}
						</h3>
						<span class="text-sm text-stone-400 dark:text-stone-600 shrink-0">
							{job.period}
						</span>
					</div>
					<p class="text-sm text-stone-500 dark:text-stone-500 mb-3">
						{job.company} · {job.location}
					</p>
					<p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
						{job.description}
					</p>
					{#if job.highlights && job.highlights.length > 0}
						<ul class="space-y-1.5">
							{#each job.highlights as highlight}
								<li class="text-sm text-stone-500 dark:text-stone-500 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-stone-300 dark:before:text-stone-700">
									{highlight}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
				{#if i < workHistory.length - 1}
					<hr class="border-stone-100 dark:border-stone-800/50 mx-0" />
				{/if}
			{/each}
		</div>
	</section>

	<hr class="border-stone-200 dark:border-stone-800 mb-16" />

	<section class="mb-16">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Education
		</h2>
		<div class="space-y-6">
			{#each education as edu}
				<div>
					<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
						<h3 class="font-medium text-stone-900 dark:text-stone-100">
							{edu.institution}
						</h3>
						<span class="text-sm text-stone-400 dark:text-stone-600 shrink-0">
							{edu.period}
						</span>
					</div>
					<p class="text-sm text-stone-500 dark:text-stone-500">
						{edu.program}
					</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="border-stone-200 dark:border-stone-800 mb-16" />

	<section>
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Day to day
		</h2>
		<div class="text-stone-600 dark:text-stone-400 leading-relaxed space-y-4">
			<p>
				Mostly Kubernetes, Terraform, and CI/CD pipelines. I spend a lot of time in
				AWS, GCP, and Azure. For observability I lean on Prometheus and Grafana. When
				something needs automating I'll reach for Python, Go, or Bash depending on
				what fits.
			</p>
			<p>
				There's security and incident work in the mix too, and I'll bring in an LLM where it
				genuinely earns its place. Most of my LLM tinkering, though, is side projects:
				MCP servers, agent tooling, and small AI and trading tools I build for my own
				use, across the OpenAI, Anthropic, and Gemini APIs.
			</p>
		</div>
	</section>
</div>
