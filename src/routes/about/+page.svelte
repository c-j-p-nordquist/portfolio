<script>
	import { page } from '$app/stores';
	import {
		profile,
		workHistory,
		education,
		technicalSkills,
		languages
	} from '$lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE, NAME, EMAIL, GITHUB_URL, LINKEDIN_URL } from '$lib/site.js';

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
</script>

<svelte:head>
	<title>About · {NAME}</title>
	<meta name="description" content={profile.description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content="About {NAME}" />
	<meta property="og:description" content={profile.description} />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About {NAME}" />
	<meta name="twitter:description" content={profile.description} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<div class="site-container profile-page">
	<section class="profile-hero fade-up">
		<p class="eyebrow">About</p>
		<h1>Philip<br /><span class="accent">Nordquist</span></h1>
		<div class="profile-intro">
			<p>{profile.title}.<br />Mantorp, Sweden.</p>
			<div>
				<p>{profile.summary}</p>
				<div class="hero-actions">
					<a
						class="button primary"
						href="/files/pn_resume_26.pdf"
						target="_blank"
						rel="noopener noreferrer">Resume (PDF) ↗</a
					><a class="text-link" href="mailto:{EMAIL}">Email ↗</a>
				</div>
			</div>
		</div>
	</section>
	<section class="experience-section section-block" id="experience">
		<div class="experience-label">
			<p class="eyebrow">Career</p>
			<h2>Experience</h2>
			<a class="text-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub ↗</a
			><a class="text-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
				>LinkedIn ↗</a
			>
		</div>
		<div class="career-list">
			{#each workHistory as job, i}<article class="career-entry">
					<div class="career-top">
						<h3>{job.company}</h3>
						<span class="eyebrow">{job.period}</span>
					</div>
					<h4>{job.position}</h4>
					<p>{job.description}</p>
					{#if job.highlights.length}<details open={i < 2}>
							<summary>Selected contributions <span aria-hidden="true">+</span></summary>
							<ul>
								{#each job.highlights as highlight}<li>{highlight}</li>{/each}
							</ul>
						</details>{/if}
				</article>{/each}
		</div>
	</section>
	<section class="section-block profile-skills" id="skills">
		<div class="section-heading">
			<h2>Technical skills</h2>
		</div>
		<dl class="skills-grid">
			{#each technicalSkills as group}<div>
					<dt>{group.category}</dt>
					<dd>{group.skills}</dd>
				</div>{/each}
		</dl>
	</section>
	<section class="section-block profile-bottom">
		<div>
			<p class="eyebrow">Education</p>
			{#each education as edu}<article class="education-entry">
					<span class="eyebrow">{edu.period}</span>
					<h3>{edu.institution}</h3>
					<p>{edu.program}</p>
				</article>{/each}
		</div>
		<div>
			<p class="eyebrow">Languages</p>
			<div class="profile-languages">
				<p>{languages}</p>
			</div>
			<p class="eyebrow profile-projects-label">Projects</p>
			<div class="profile-project">
				<p>
					Things I build outside of work get a short write-up on the <a class="inline-link" href="/"
						>home page</a
					>, once they're finished.
				</p>
			</div>
		</div>
	</section>
	<section class="contact-panel">
		<div class="contact-grid">
			<div>
				<h2>Get in touch</h2>
				<p>Email is the best way to reach me.</p>
			</div>
			<a class="contact-link" href="mailto:{EMAIL}">{EMAIL} <span aria-hidden="true">↗</span></a>
		</div>
	</section>
</div>
