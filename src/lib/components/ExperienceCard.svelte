<script>
	let { experience } = $props();
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
	<div class="card-body">
		<div class="flex items-center mb-4">
			{#if experience.logo}
				<img src={experience.logo} alt={`${experience.company} logo`} class="w-12 h-12 mr-4" />
			{/if}
			<div>
				<h3 class="card-title text-2xl font-heading">
					{experience.position || 'Position Not Specified'}
				</h3>
				<h4 class="text-lg text-base-content/70">
					{experience.company || 'Company Not Specified'} - {experience.location ||
						'Location Not Specified'}
				</h4>
			</div>
		</div>
		<p class="text-sm text-base-content/60 mb-2">{experience.period || 'Period Not Specified'}</p>
		<p class="mb-4">{experience.description || 'No description available.'}</p>

		{#if Array.isArray(experience.skills) && experience.skills.length > 0}
			<div class="mb-4">
				<h5 class="text-lg font-heading mb-2">Key Skills:</h5>
				<div class="flex flex-wrap gap-2">
					{#each experience.skills.slice(0, 5) as skill}
						<span class="badge badge-primary">{skill}</span>
					{/each}
				</div>
			</div>
		{/if}

		{#if Array.isArray(experience.techstack) && experience.techstack.length > 0}
			<div>
				<h5 class="text-lg font-heading mb-2">Tech Stack:</h5>
				<div class="flex flex-wrap gap-2">
					{#each experience.techstack.slice(0, 5) as tech}
						<span class="badge badge-secondary">{tech}</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
