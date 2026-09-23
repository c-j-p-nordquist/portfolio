<script>
	import { workHistory, education } from '$lib/data/workHistory.js';
	import { SITE_URL } from '$lib/site.js';
</script>

<svelte:head
	><title>Philip Nordquist · Design B</title><meta name="robots" content="noindex, nofollow" /><meta
		name="description"
		content="Philip Nordquist, platform and DevSecOps engineer in Mantorp, Sweden."
	/><link rel="canonical" href={`${SITE_URL}/philip`} /></svelte:head
>
<div class="b-page b-profile">
	<header class="b-page-meta">
		<span>Founder, CJP IT Consulting AB</span><span>Philip / 04</span>
	</header>
	<section class="b-hero">
		<h1>Philip <em>Nordquist</em></h1>
		<div class="b-hero-intro">
			<p>Platform &amp; DevSecOps engineer.<br />Mantorp, Sweden.</p>
			<div>
				<p>
					I build and run cloud platforms, security operations, and the automation around them.
					Based in Mantorp, Sweden, with experience spanning Stockholm and Hong Kong.
				</p>
				<a class="b-action" href="/files/pn_resume_26.pdf" target="_blank" rel="noopener noreferrer"
					>Resume (PDF) <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
		<div class="b-profile-links">
			<a href="https://github.com/c-j-p-nordquist" target="_blank" rel="noopener noreferrer"
				>GitHub ↗</a
			><a
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer">LinkedIn ↗</a
			><a href="mailto:philip@nordquist.me">Email ↗</a>
		</div>
	</section>
	<section id="experience">
		<div class="b-section-title">
			<h2>Experience</h2>
			<span class="b-label">01</span>
		</div>
		<div class="b-career">
			{#each workHistory as job}<article>
					<div class="b-career-meta">
						<p class="b-label">{job.period}</p>
						<h3>{job.company}</h3>
						<p>{job.location}</p>
					</div>
					<div>
						<h4>{job.position}</h4>
						<p>{job.description}</p>
						{#if job.highlights.length}<details>
								<summary>Selected contributions <span aria-hidden="true">+</span></summary>
								<ul>
									{#each job.highlights as highlight}<li>{highlight}</li>{/each}
								</ul>
							</details>{/if}
					</div>
				</article>{/each}
		</div>
	</section>
	<section class="b-education">
		<div class="b-section-title">
			<h2>Education</h2>
			<span class="b-label">02</span>
		</div>
		{#each education as edu}<article>
				<p class="b-label">{edu.period}</p>
				<div>
					<h3>{edu.institution}</h3>
					<p>{edu.program}</p>
				</div>
			</article>{/each}
	</section>
	<section class="b-tools">
		<div class="b-section-title">
			<h2>Tools &amp; projects</h2>
			<span class="b-label">03</span>
		</div>
		<p>
			I work with Kubernetes, Terraform, CI/CD pipelines, Prometheus, and Grafana. For automation, I
			use Python, Go, and Bash.
		</p>
		<p>My personal projects include MCP servers, LLM agents, and trading tools.</p>
	</section>
	<section class="b-contact">
		<div>
			<p class="b-label">Contact</p>
			<h2>Contact Philip</h2>
			<p>For engineering enquiries and professional contacts.</p>
		</div>
		<div>
			<a href="mailto:philip@nordquist.me">philip@nordquist.me <span aria-hidden="true">↗</span></a
			>
		</div>
	</section>
</div>
