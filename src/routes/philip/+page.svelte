<script>
	import { page } from '$app/stores';
	import {
		profile,
		workHistory,
		education,
		technicalSkills,
		sideProjects,
		languages
	} from '$lib/data/workHistory.js';
	import { SITE_URL, OG_IMAGE_PHILIP } from '$lib/site.js';

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	const personJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Philip Nordquist',
		url: `${SITE_URL}/philip`,
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
	<meta name="description" content={profile.description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content="Philip Nordquist" />
	<meta property="og:description" content={profile.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE_PHILIP} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Philip Nordquist — Platform & Security Engineer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Philip Nordquist" />
	<meta name="twitter:description" content={profile.description} />
	<meta name="twitter:image" content={OG_IMAGE_PHILIP} />
	{@html personJsonLdScript}
</svelte:head>

<div class="site-container profile-page">
	<section class="profile-hero fade-up">
		<p class="eyebrow">Founder, CJP IT Consulting AB</p>
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
					><a class="text-link" href="mailto:philip@nordquist.me">Email ↗</a>
				</div>
			</div>
		</div>
	</section>
	<section class="experience-section section-block" id="experience">
		<div class="experience-label">
			<p class="eyebrow">01 / Career</p>
			<h2>Experience</h2>
			<a
				class="text-link"
				href="https://github.com/c-j-p-nordquist"
				target="_blank"
				rel="noopener noreferrer">GitHub ↗</a
			><a
				class="text-link"
				href="https://linkedin.com/in/philip-nordquist-269949a0"
				target="_blank"
				rel="noopener noreferrer">LinkedIn ↗</a
			>
		</div>
		<div class="career-list">
			{#each workHistory as job}<article class="career-entry">
					<div class="career-top">
						<h3>{job.company}</h3>
						<span class="eyebrow">{job.period}</span>
					</div>
					<h4>{job.position}</h4>
					<p>{job.description}</p>
					{#if job.highlights.length}<details>
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
			<span class="eyebrow" aria-hidden="true">02</span>
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
			<p class="eyebrow">03 / Education</p>
			{#each education as edu}<article class="education-entry">
					<span class="eyebrow">{edu.period}</span>
					<h3>{edu.institution}</h3>
					<p>{edu.program}</p>
				</article>{/each}
			<div class="profile-languages">
				<h3>Languages</h3>
				<p>{languages}</p>
			</div>
		</div>
		<div>
			<p class="eyebrow">04 / Side projects</p>
			{#each sideProjects as project}<article class="profile-project">
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</article>{/each}
		</div>
	</section>
	<section class="contact-panel">
		<div class="contact-grid">
			<div>
				<p class="eyebrow">Contact</p>
				<h2>Contact Philip</h2>
				<p>For engineering enquiries and professional contacts.</p>
			</div>
			<a class="contact-link" href="mailto:philip@nordquist.me">philip@nordquist.me ↗</a>
		</div>
	</section>
</div>
