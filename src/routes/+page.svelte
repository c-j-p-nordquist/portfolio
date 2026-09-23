<script>
	import { page } from '$app/stores';
	import { SITE_URL, OG_IMAGE_COMPANY } from '$lib/site.js';
	import {
		COMPANY_NAME,
		CONTACT_EMAIL,
		ORG_NUMBER,
		services,
		workingPoints
	} from '$lib/data/company.js';

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);

	const orgJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: COMPANY_NAME,
		url: SITE_URL,
		email: CONTACT_EMAIL,
		identifier: ORG_NUMBER,
		address: { '@type': 'PostalAddress', addressLocality: 'Mantorp', addressCountry: 'SE' },
		areaServed: { '@type': 'Place', name: 'Worldwide' },
		founder: { '@type': 'Person', name: 'Philip Nordquist', url: `${SITE_URL}/philip` },
		knowsLanguage: ['sv', 'en', 'zh', 'yue'],
		makesOffer: services.map((s) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: s.title, description: s.summary }
		}))
	});

	// Built as a full markup string (rather than a literal <script> tag in this
	// file) so prettier-plugin-svelte doesn't try to parse the JSON payload as
	// JavaScript. The `<\/script>` escape keeps the HTML tokenizer from ending
	// the tag early when this string is inserted via {@html} below.
	const orgJsonLdScript = `<script type="application/ld+json">${orgJsonLd}<\/script>`;

	const metaDescription =
		'CJP IT Consulting AB is a Swedish consultancy for platform and security engineering, QA and localisation testing, and product data services, working with clients worldwide.';
</script>

<svelte:head>
	<title>CJP IT Consulting AB · Engineering, QA & Product Data Services</title>
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content="CJP IT Consulting AB" />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE_COMPANY} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CJP IT Consulting AB" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="CJP IT Consulting AB" />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={OG_IMAGE_COMPANY} />
	{@html orgJsonLdScript}
</svelte:head>

<div class="site-container">
	<section class="home-hero">
		<div class="hero-copy fade-up">
			<p class="eyebrow">{COMPANY_NAME}</p>
			<h1>Engineering,<br />QA &amp;<br /><span class="accent">product data.</span></h1>
		</div>
		<div class="hero-overview fade-up">
			<p class="hero-description">
				We provide platform and security engineering, software testing, and product data management
				for clients in Sweden and internationally.
			</p>
			<p class="founder-intro">
				Founded by <a href="/philip">Philip Nordquist</a>, a platform and security engineer, working
				alongside specialists in QA and localisation.
			</p>
			<div class="hero-actions">
				<a class="button primary" href="mailto:{CONTACT_EMAIL}"
					>Email us <span aria-hidden="true">↗</span></a
				><a class="text-link" href="#services">View services <span aria-hidden="true">↓</span></a>
			</div>
			<p class="hero-location">
				Mantorp, Sweden <span aria-hidden="true">/</span> Remote engagements
			</p>
		</div>
	</section>
	<section id="services" class="section-block services-section">
		<div class="section-heading">
			<h2>Services</h2>
			<span class="eyebrow" aria-hidden="true">01</span>
		</div>
		<div class="service-grid">
			{#each services as service, i}
				<article class="service-card">
					<span class="eyebrow service-number" aria-hidden="true">0{i + 1}</span>
					<h3>{service.title}</h3>
					<p>{service.summary}</p>
					<ul class="service-capabilities">
						{#each service.items as item}<li>{item}</li>{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>
	<section id="approach" class="section-block approach-section">
		<div>
			<p class="eyebrow">02 / Engagements</p>
			<h2>Working with CJP</h2>
			<p class="section-description">
				Project work, advisory, and ongoing assignments. Contact us with the scope and timing you
				have in mind.
			</p>
		</div>
		<div class="approach-grid">
			{#each workingPoints as point}<article>
					<h3>{point.title}</h3>
					<p>{point.text}</p>
				</article>{/each}
		</div>
	</section>
	<section id="contact" class="contact-panel">
		<div class="contact-grid">
			<div>
				<p class="eyebrow">03 / Contact</p>
				<h2>Project enquiries</h2>
				<p>Send a brief description of the work and your expected timeline.</p>
			</div>
			<div>
				<a href="mailto:{CONTACT_EMAIL}" class="contact-link"
					>{CONTACT_EMAIL} <span aria-hidden="true">↗</span></a
				><small>We usually reply within a couple of business days.</small>
			</div>
		</div>
	</section>
</div>
