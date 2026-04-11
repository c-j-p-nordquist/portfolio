<script>
	import { workHistory } from '$lib/data/workHistory.js';

	const recentJobs = workHistory.slice(0, 3);
</script>

<svelte:head>
	<title>Philip Nordquist</title>
	<meta
		name="description"
		content="Philip Nordquist — Platform & DevSecOps Engineer based in Linköping, Sweden."
	/>
</svelte:head>

<div class="max-w-2xl mx-auto px-6 py-16 sm:py-24">
	<section class="mb-20">
		<h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
			Philip Nordquist
		</h1>
		<p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
			Staff Platform & DevSecOps Engineer based in Linköping, Sweden. I spend my
			days working with infrastructure, security, and making systems run reliably at scale.
		</p>
		<p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
			Currently at <span class="text-stone-900 dark:text-stone-200">STIM</span>,
			building and maintaining their platform and security tooling.
			Previously at <span class="text-stone-900 dark:text-stone-200">ExpressVPN</span>,
			where I worked on global infrastructure across 3,000+ servers in 100+ countries.
		</p>
		<div class="flex items-center gap-5">
			<a
				href="https://github.com/c-j-p-nordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
			>
				GitHub
			</a>
			<a
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
			>
				LinkedIn
			</a>
			<a
				href="mailto:philip@nordquist.me"
				class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
			>
				Email
			</a>
			<a
				href="/files/pn_resume_26.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
			>
				Resume
			</a>
		</div>
	</section>

	<section class="mb-20">
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Experience
		</h2>
		<div class="space-y-10">
			{#each recentJobs as job}
				<div>
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
			class="inline-block mt-8 text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
		>
			Full experience &amp; background
		</a>
	</section>

	<section>
		<h2 class="text-xs font-medium uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-8">
			Writing
		</h2>
		<p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
			I occasionally write about infrastructure, DevOps tooling, and things I've built or figured out along the way.
		</p>
		<a
			href="/posts"
			class="inline-block text-sm text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
		>
			Read posts
		</a>
	</section>
</div>
