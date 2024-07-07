<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import IconChevronUp from '~icons/lucide/chevron-up';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconCircle from '~icons/lucide/circle';
	import { skills, experiences } from '$lib/data/profileData.js';

	let showBackToTop = $state(false);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleScroll() {
		showBackToTop = window.scrollY > 200;
	}

	onMount(() => {
		document.title = 'About Philip Nordquist - Portfolio';
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">About Me</h1>

	<section id="profile" class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Profile</h2>
		<p class="mb-4">
			[Your personalized summary will go here. Aim to highlight your passion for DevSecOps and cloud
			infrastructure, your approach to problem-solving, and what drives you in your career. Mention
			a couple of key achievements or projects you're particularly proud of.]
		</p>
	</section>

	<section id="skills" class="mb-12">
		<h2 class="text-2xl font-semibold mb-6">Key Skills</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each Object.entries(skills) as [category, categorySkills]}
				<div class="card bg-base-100 shadow-xl">
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
		<h2 class="text-2xl font-semibold mb-6">Professional Experience</h2>
		<div class="overflow-x-auto">
			<ul class="timeline timeline-vertical lg:timeline-horizontal border-primary">
				{#each experiences as exp, index}
					<li class="relative border-l-2 lg:border-l-0 lg:border-t-2 border-primary">
						{#if index !== 0}<hr class="border-primary" />{/if}
						<div class="timeline-start">{exp.year}</div>
						<div class="timeline-end bg-base-200 p-4 rounded-box">
							<h3 class="text-lg font-semibold">{exp.title}</h3>
							<p class="text-sm text-base-content opacity-70">{exp.company} • {exp.location}</p>
							{#if exp.url}
								<a
									href={exp.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-primary hover:text-primary-focus text-sm flex items-center gap-1 mt-1"
								>
									Visit Website <IconExternalLink class="w-4 h-4" />
								</a>
							{/if}
						</div>
						{#if index !== experiences.length - 1}<hr class="border-primary" />{/if}
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="education" class="mb-8">
		<h2 class="text-2xl font-semibold mb-4">Education</h2>
		<ul class="list-disc list-inside">
			<li>Linköpings Universitet, Kommunikation, samhälle- och mediaproduktion (2008 - 2011)</li>
			<li>Högskolan i Skövde, Dataspelsutveckling - Musik (2011 - 2014)</li>
		</ul>
	</section>

	<section id="certifications">
		<h2 class="text-2xl font-semibold mb-4">Certifications</h2>
		<ul class="list-disc list-inside">
			<li>AWS Certified Solutions Architect – Associate (Oct 2021 - Oct 2024)</li>
			<li>AWS Certified Cloud Practitioner (Aug 2020 - Aug 2023)</li>
			<li>Palo Alto Certified Cybersecurity Associate (PCCSA) (Oct 2020 - Oct 2022)</li>
		</ul>
	</section>
</main>

{#if showBackToTop}
	<button
		class="fixed bottom-4 right-4 btn btn-circle btn-primary"
		onclick={scrollToTop}
		transition:fly={{ y: 20, duration: 300 }}
	>
		<IconChevronUp />
	</button>
{/if}
