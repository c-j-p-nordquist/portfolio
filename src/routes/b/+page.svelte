<script>
	import { COMPANY_NAME, CONTACT_EMAIL, services, workingPoints } from '$lib/data/company.js';
	import { SITE_URL } from '$lib/site.js';
</script>

<svelte:head
	><title>CJP IT Consulting AB · Design B</title><meta
		name="robots"
		content="noindex, nofollow"
	/><meta
		name="description"
		content="Platform and security engineering, QA and localisation testing, and product data services."
	/><link rel="canonical" href={SITE_URL} /></svelte:head
>
<div class="b-page">
	<header class="b-page-meta"><span>{COMPANY_NAME}</span><span>Company / 01</span></header>
	<section class="b-hero" aria-labelledby="b-heading">
		<h1 id="b-heading">Engineering,<br />QA &amp; <em>product data.</em></h1>
		<div class="b-hero-intro">
			<p>
				We provide platform and security engineering, software testing, and product data management
				for clients in Sweden and internationally.
			</p>
			<div>
				<p>
					Founded by <a href="/b/philip">Philip Nordquist</a>, a platform and DevSecOps engineer,
					working alongside specialists in QA and localisation.
				</p>
				<a class="b-action" href="mailto:{CONTACT_EMAIL}"
					>Email us <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
	</section>
	<section id="services" class="b-services">
		<div class="b-section-title">
			<h2>Services</h2>
			<span class="b-label">02</span>
		</div>
		{#each services as service, i}<article class="b-service-row">
				<span class="b-row-number" aria-hidden="true">0{i + 1}</span>
				<h3>{service.title}</h3>
				<div>
					<p>{service.summary}</p>
					<ul>
						{#each service.items as item}<li>{item}</li>{/each}
					</ul>
				</div>
			</article>{/each}
	</section>
	<section id="approach" class="b-engagements">
		<div class="b-section-title">
			<h2>Working with CJP</h2>
			<span class="b-label">03</span>
		</div>
		<p class="b-section-intro">
			Project work, advisory, and ongoing assignments. Contact us with the scope and timing you have
			in mind.
		</p>
		<div class="b-engagement-grid">
			{#each workingPoints as point}<article>
					<h3>{point.title}</h3>
					<p>{point.text}</p>
				</article>{/each}
		</div>
	</section>
	<section id="contact" class="b-contact">
		<div>
			<p class="b-label">Contact</p>
			<h2>Project enquiries</h2>
			<p>Send a brief description of the work and your expected timeline.</p>
		</div>
		<div>
			<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL} <span aria-hidden="true">↗</span></a>
			<p>We usually reply within a couple of business days.</p>
		</div>
	</section>
</div>
