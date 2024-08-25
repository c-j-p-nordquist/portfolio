<script>
	let workExperience = $props();

	// Optional: Parallax effect logic
	const parallax = (node) => {
		const handleScroll = () => {
			const offset = window.pageYOffset;
			node.style.backgroundPositionY = offset * 0.5 + 'px';
		};

		window.addEventListener('scroll', handleScroll);

		return {
			destroy() {
				window.removeEventListener('scroll', handleScroll);
			}
		};
	};
</script>

<div class="relative overflow-x-auto flex space-x-8 py-12">
	{#each workExperience as experience}
		<div
			class="relative min-w-[300px] bg-gray-800 text-white shadow-lg rounded-lg p-8 transition-all transform hover:scale-105 hover:shadow-2xl"
			style="border-top: 8px solid {experience.color};"
		>
			<h3 class="text-3xl font-heading mb-2">{experience.role}</h3>
			<h4 class="text-xl font-sans mb-4">{experience.period}</h4>
			<p class="mb-6">{experience.description}</p>
			<div class="mb-4">
				<h5 class="text-lg font-heading mb-2">Key Achievements:</h5>
				<ul class="list-disc list-inside space-y-2">
					{#each experience.achievements as achievement}
						<li>{achievement}</li>
					{/each}
				</ul>
			</div>
			<div class="mb-4">
				<h5 class="text-lg font-heading mb-2">Technologies Used:</h5>
				<ul class="flex flex-wrap gap-2">
					{#each experience.techstack as tech}
						<li class="bg-primary text-white rounded-full px-4 py-1">{tech}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>
