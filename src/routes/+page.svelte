<script>
	import { workHistory, education } from '$lib/data/workHistory.js';
	import JobEntry from '$lib/components/JobEntry.svelte';
</script>

<svelte:head>
	<title>Philip Nordquist</title>
	<meta
		name="description"
		content="Philip Nordquist, platform and DevSecOps engineer in Mantorp, Sweden."
	/>
	<meta property="og:title" content="Philip Nordquist" />
	<meta property="og:description" content="Platform and DevSecOps engineer in Mantorp, Sweden." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Philip Nordquist" />
</svelte:head>

<div class="max-w-[640px] mx-auto px-6 pt-[72px] pb-[100px]">
	<!-- Hero -->
	<section class="mb-[88px]">
		<h1
			class="text-[30px] font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100 mb-[18px] leading-[1.1]"
		>
			Philip Nordquist
		</h1>

		<p
			class="text-[15.5px] text-stone-600 dark:text-stone-400 leading-[1.75] mb-2.5 max-w-[460px]"
			style="text-wrap: pretty;"
		>
			Platform and DevSecOps engineer in Mantorp, Sweden. I build and run cloud platforms,
			security operations, and deep networking, plus the automation around them.
		</p>
		<p
			class="text-[15.5px] text-stone-600 dark:text-stone-400 leading-[1.75] mb-[30px] max-w-[460px]"
			style="text-wrap: pretty;"
		>
			Currently at <strong class="text-stone-900 dark:text-stone-100 font-medium">STIM</strong>,
			working on the Kubernetes platform and Sentinel detections. Previously at
			<strong class="text-stone-900 dark:text-stone-100 font-medium">ExpressVPN</strong>, working on
			global VPN infrastructure and protocol-level countermeasures.
		</p>

		<div class="flex items-center gap-[18px] flex-wrap">
			<a
				href="https://github.com/c-j-p-nordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center gap-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				GitHub
				<svg
					class="w-[11px] h-[11px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
			<a
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center gap-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				LinkedIn
				<svg
					class="w-[11px] h-[11px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
			<a
				href="mailto:philip@nordquist.me"
				class="group inline-flex items-center gap-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				Email
				<svg
					class="w-[11px] h-[11px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
			<a
				href="/files/pn_resume_26.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="group inline-flex items-center gap-1 text-[13px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
			>
				Resume
				<svg
					class="w-[11px] h-[11px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M7 17L17 7M17 7H7M17 7v10" />
				</svg>
			</a>
		</div>
	</section>

	<!-- Experience -->
	<section class="mb-20">
		<div class="flex items-center gap-[14px] mb-6">
			<span
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-stone-400 dark:text-stone-600 whitespace-nowrap"
			>
				Experience
			</span>
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
	<section class="mb-20">
		<div class="flex items-center gap-[14px] mb-6">
			<span
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-stone-400 dark:text-stone-600 whitespace-nowrap"
			>
				Education
			</span>
			<div class="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
		</div>

		{#each education as edu, i}
			<div class="py-[18px]">
				<div class="flex justify-between items-baseline gap-4 mb-[5px]">
					<span
						class="text-[14.5px] font-medium tracking-[-0.01em] text-stone-900 dark:text-stone-100"
					>
						{edu.institution}
					</span>
					<span class="text-[11.5px] text-stone-400 dark:text-stone-600 shrink-0">
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
	<section>
		<div class="flex items-center gap-[14px] mb-6">
			<span
				class="text-[10.5px] tracking-[0.1em] uppercase font-medium text-stone-400 dark:text-stone-600 whitespace-nowrap"
			>
				Day to day
			</span>
			<div class="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
		</div>
		<p
			class="text-[14.5px] text-stone-600 dark:text-stone-400 leading-[1.75]"
			style="text-wrap: pretty;"
		>
			Mostly Kubernetes, Terraform, and CI/CD pipelines, with Prometheus and Grafana close by, plus
			a fair bit of security and incident work. When something needs automating I reach for
			Python, Go, or Bash, and bring in an LLM where it genuinely helps. Outside work, I build
			small AI and trading tools for my own use: MCP servers, agent tooling, that kind of thing.
		</p>
	</section>
</div>
