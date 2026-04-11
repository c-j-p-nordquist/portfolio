<script>
	import { workHistory } from '$lib/data/workHistory.js';

	const recentJobs = workHistory.slice(0, 3);
</script>

<svelte:head>
	<title>Philip Nordquist</title>
	<meta
		name="description"
		content="Philip Nordquist, platform and DevSecOps engineer in Linköping, Sweden."
	/>
	<meta property="og:title" content="Philip Nordquist" />
	<meta property="og:description" content="Platform and DevSecOps engineer in Linköping, Sweden." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Philip Nordquist" />
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<section class="mb-16">
		<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
			Philip Nordquist
		</h1>
		<p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
			Platform and DevSecOps engineer in Linköping, Sweden. I work with
			infrastructure, security, and keeping things running.
		</p>
		<p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
			Currently at <span class="text-stone-900 dark:text-stone-200">STIM</span>,
			looking after their platform and security tooling.
			Before that I was at <span class="text-stone-900 dark:text-stone-200">ExpressVPN</span>
			for a few years, working on infrastructure across 3,000+ servers in 100+ countries.
		</p>
		<div class="flex items-center gap-5">
			<a
				href="https://github.com/c-j-p-nordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
			>
				GitHub
				<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
			</a>
			<a
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
			>
				LinkedIn
				<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
			</a>
			<a
				href="mailto:philip@nordquist.me"
				class="group flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
			>
				Email
				<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
			</a>
			<a
				href="/files/pn_resume_26.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
			>
				Resume
				<svg class="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
			</a>
		</div>
	</section>

	<hr class="border-stone-200 dark:border-stone-800 mb-16" />

	<section class="mb-16">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Experience
		</h2>
		<div class="space-y-1">
			{#each recentJobs as job}
				<div class="-mx-4 px-4 py-5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors">
					<div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
						<h3 class="font-medium text-stone-900 dark:text-stone-100">
							{job.position}
						</h3>
						<span class="text-sm text-stone-400 dark:text-stone-600 shrink-0">
							{job.period}
						</span>
					</div>
					<p class="text-sm text-stone-500 dark:text-stone-500 mb-2">
						{job.company} · {job.location}
					</p>
					<p class="text-stone-600 dark:text-stone-400 leading-relaxed">
						{job.description}
					</p>
				</div>
			{/each}
		</div>
		<a
			href="/about"
			class="group inline-flex items-center gap-1 mt-6 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
		>
			Full background
			<svg class="w-3.5 h-3.5 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
		</a>
	</section>

	<hr class="border-stone-200 dark:border-stone-800 mb-16" />

	<section>
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Writing
		</h2>
		<p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
			I occasionally write about infrastructure, DevOps tooling, and things I've built or figured out along the way.
		</p>
		<a
			href="/posts"
			class="group inline-flex items-center gap-1 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
		>
			Read posts
			<svg class="w-3.5 h-3.5 text-stone-400 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
		</a>
	</section>
</div>
