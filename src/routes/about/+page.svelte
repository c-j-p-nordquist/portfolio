<script>
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import IconExternalLink from '~icons/lucide/external-link';
	import { skills, experiences } from '$lib/data/profileData.js';
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">About Me</h1>

	<section id="profile" class="mb-12">
		<h2 class="text-3xl font-bold mb-4">Profile</h2>
		<p class="text-lg mb-4">
			As a passionate DevSecOps engineer and cloud infrastructure specialist, I thrive on creating
			robust, secure, and scalable solutions. With a strong background in AWS and a keen interest in
			cutting-edge technologies, I've successfully led teams in implementing zero-trust
			architectures and optimizing CI/CD pipelines. My approach combines technical expertise with a
			strategic mindset, always aiming to align infrastructure decisions with business goals.
		</p>
		<p class="text-lg mb-4">
			One of my proudest achievements was orchestrating a company-wide migration to a microservices
			architecture, which significantly improved our system's reliability and reduced deployment
			times by 70%. I'm driven by the constant evolution in the tech world and am always eager to
			learn and apply new technologies to solve complex problems.
		</p>
	</section>

	<section class="mb-12">
		<h2 class="text-3xl font-bold mb-6 text-center">Key Skills</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each Object.entries(skills) as [category, categorySkills]}
				<div class="card bg-base-200 shadow-xl">
					<div class="card-body">
						<h3 class="card-title">{category}</h3>
						<div class="flex flex-wrap gap-2">
							{#each categorySkills as skill}
								<span class="badge badge-primary">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="experience" class="mb-12">
		<h2 class="text-3xl font-bold mb-6">Professional Experience</h2>
		<div class="space-y-6">
			{#each experiences as exp, index}
				<div class="flex flex-col md:flex-row md:space-x-4">
					<div class=" font-bold text-primary md:mb-0 mb-2">{exp.year}</div>
					<div class="md:w-3/4">
						<h3 class="text-xl font-semibold">{exp.title}</h3>
						<p class="text-base text-gray-600">{exp.company} • {exp.location}</p>
						{#if exp.url}
							<a
								href={exp.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center mt-2 text-sm font-medium text-accent hover:underline"
							>
								Visit Website
								<IconExternalLink class="w-4 h-4 ml-1" />
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="education" class="mb-8">
		<h2 class="text-3xl font-bold mb-4">Education</h2>
		<ul class="list-disc list-inside text-lg">
			<li>Linköpings Universitet, Kommunikation, samhälle- och mediaproduktion (2008 - 2011)</li>
			<li>Högskolan i Skövde, Dataspelsutveckling - Musik (2011 - 2014)</li>
		</ul>
	</section>

	<section id="certifications">
		<h2 class="text-3xl font-bold mb-4">Certifications</h2>
		<ul class="list-disc list-inside text-lg">
			<li>AWS Certified Solutions Architect – Associate (Oct 2021 - Oct 2024)</li>
			<li>AWS Certified Cloud Practitioner (Aug 2020 - Aug 2023)</li>
			<li>Palo Alto Certified Cybersecurity Associate (PCCSA) (Oct 2020 - Oct 2022)</li>
		</ul>
	</section>
</main>

<ScrollToTop />
