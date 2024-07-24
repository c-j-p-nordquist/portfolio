<script>
	let techIcons = $state([
		{ name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
		{ name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
		{ name: 'Helm', icon: 'devicon-helm-plain' },
		{ name: 'Terraform', icon: 'devicon-terraform-plain' },
		{ name: 'Python', icon: 'devicon-python-plain' },
		{ name: 'JavaScript', icon: 'devicon-javascript-plain' },
		{ name: 'Golang', icon: 'devicon-go-original-wordmark' },
		{ name: 'Docker', icon: 'devicon-docker-plain' },
		{ name: 'Git', icon: 'devicon-git-plain' }
	]);
</script>

<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
	{#each techIcons as tech}
		<div
			class="flex flex-col items-center justify-center p-2 bg-base-200 rounded-lg transition-all duration-300 hover:bg-base-300"
		>
			<i class={`${tech.icon} text-4xl mb-2 text-primary`} aria-hidden="true"></i>
			<span class="text-xs font-medium text-base-content/80 text-center">{tech.name}</span>
		</div>
	{/each}
</div>

<style>
	@import url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');
</style>
