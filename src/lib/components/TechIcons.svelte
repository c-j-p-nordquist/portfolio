<script>
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

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

	function handleInteraction(tech) {
		alert(`You clicked on ${tech.name}`);
		// You can replace this with a more sophisticated action later
	}
</script>

<div class="grid grid-cols-3 gap-6">
	{#each techIcons as tech, index}
		<button
			onclick={() => handleInteraction(tech)}
			onkeydown={(e) => e.key === 'Enter' && handleInteraction(tech)}
			class="flex flex-col items-center justify-center p-4 bg-base-100/50 backdrop-blur-sm rounded-lg cursor-pointer transition-all duration-300 hover:bg-base-200/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
			transition:fly={{ y: 20, duration: 300, delay: index * 50, easing: cubicOut }}
		>
			<i class={`${tech.icon} text-5xl mb-2 text-primary`} aria-hidden="true"></i>
			<span class="text-sm font-medium text-base-content/80">{tech.name}</span>
		</button>
	{/each}
</div>

<style>
	@import url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');
</style>
