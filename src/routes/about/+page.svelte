<script>
	import IconExternalLink from '~icons/lucide/external-link';
	import { skills, experiences } from '$lib/data/profileData.js';
</script>

<main class="container mx-auto px-4 py-8">
	<article class="container mx-auto px-4 py-8 max-w-3xl">
		<h1 class="text-4xl font-serif font-bold mb-4">About Me</h1>
		<div class="prose lg:prose-xl font-sans">
			<h2>Hi, I'm Philip</h2>
			<p>
				I'm a technology enthusiast with a keen interest in various tech fields. My curiosity drives
				me to explore different areas of technology, from infrastructure and networking to software
				development and beyond.
			</p>

			<h3>My Approach to Tech</h3>
			<p>
				I appreciate the power of data-driven decision making in technology. When tackling a problem
				or exploring a new tool, I always consider what questions we're trying to answer and how we
				can measure outcomes effectively.
			</p>

			<h3>About This Blog</h3>
			<p>
				This blog is a personal project, separate from my professional work. It serves as a platform
				for me to:
			</p>
			<ul>
				<li>Share solutions to technical challenges I've encountered in my personal projects</li>
				<li>Discuss interesting technology advancements and tools that catch my attention</li>
				<li>Explore various tech-related topics that pique my curiosity</li>
			</ul>
			<p>
				My aim is to contribute to the tech community by sharing my personal experiences and
				insights. While the solutions or discussions here might be available elsewhere, I hope that
				my perspective and the way I've applied these concepts might be helpful or interesting to
				others with similar interests.
			</p>
		</div>
	</article>

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
