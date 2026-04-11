<script>
	import { workHistory, education, certifications } from '$lib/data/workHistory.js';
</script>

<svelte:head>
	<title>About – Philip Nordquist</title>
	<meta
		name="description"
		content="Background, experience, and education of Philip Nordquist — Platform & DevSecOps Engineer."
	/>
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
		About
	</h1>
	<div class="text-stone-600 dark:text-stone-400 leading-relaxed space-y-4 mb-20">
		<p>
			I'm a platform and DevSecOps engineer with a bit over 10 years of experience
			in infrastructure and operations. I've worked across cloud platforms, on-prem systems,
			and everything in between — from web hosting support to managing global VPN
			infrastructure.
		</p>
		<p>
			Most of my work involves making systems more reliable, secure, and easier to
			operate. That usually means Kubernetes, infrastructure as code, observability,
			and finding ways to automate the tedious parts.
		</p>
		<p>
			I'm based in Linköping, Sweden. Outside of work, I'm into music, games, and
			the occasional side project.
		</p>
		<a
			href="/files/pn_resume_26.pdf"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-block text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
		>
			Download resume (PDF)
		</a>
	</div>

	<section class="mb-20">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Experience
		</h2>
		<div class="space-y-12">
			{#each workHistory as job}
				<div>
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
					{#if job.highlights.length > 0}
						<ul class="space-y-1.5">
							{#each job.highlights as highlight}
								<li class="text-sm text-stone-500 dark:text-stone-500 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-stone-300 dark:before:text-stone-700">
									{highlight}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-20">
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

	<section class="mb-20">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Certifications
		</h2>
		<ul class="space-y-2">
			{#each certifications as cert}
				<li class="text-stone-600 dark:text-stone-400">
					{cert}
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Areas I work in
		</h2>
		<div class="text-stone-600 dark:text-stone-400 leading-relaxed space-y-4">
			<p>
				Cloud infrastructure (AWS, GCP, Azure), Kubernetes and container orchestration,
				infrastructure as code with Terraform, CI/CD pipeline design, observability
				with Prometheus and Grafana, security tooling and compliance, network engineering,
				and general automation with Python, Go, and Bash.
			</p>
		</div>
	</section>
</div>
