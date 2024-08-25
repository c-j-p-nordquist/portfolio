<script>
	export let skills = [
		{
			title: 'Cloud Platforms',
			description:
				'Expertise in AWS, GCP, and Azure, managing secure and scalable cloud infrastructure.'
		},
		{
			title: 'Infrastructure as Code',
			description:
				'Proficient in Terraform and Ansible, automating infrastructure deployment and management.'
		},
		{
			title: 'Security by Design',
			description:
				'Embedding security principles throughout the development lifecycle to ensure robust, resilient systems.'
		}
	];
</script>

<section id="skills-overview" class="container mx-auto">
	<h2 class="text-4xl font-heading text-center mb-12">Skills Overview</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
		{#each skills as skill}
			<div
				class="relative bg-gray-800 text-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105"
			>
				<h3 class="text-2xl font-heading mb-4">{skill.title}</h3>
				<p>{skill.description}</p>
			</div>
		{/each}
	</div>
</section>
