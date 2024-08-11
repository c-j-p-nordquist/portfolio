<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconDownload from '~icons/lucide/download';
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';
	import Badge from '$lib/components/Badge.svelte';
	import { workHistory } from '$lib/data/workHistory.js';

	let resumeUrl = $state('/files/Philip_Nordquist_06_24.pdf');

	function downloadResume() {
		window.open(resumeUrl, '_blank');
	}
</script>

<svelte:head>
	<title>About Philip Nordquist - DevSecOps Engineer</title>
	<meta
		name="description"
		content="Explore Philip Nordquist's professional journey in DevSecOps, cloud infrastructure, and IT management."
	/>
</svelte:head>

<main class="min-h-screen w-full bg-[#0c0f1a] text-white relative font-sans">
	<div class="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<filter id="noiseFilter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.65"
					numOctaves="3"
					stitchTiles="stitch"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#noiseFilter)" />
		</svg>
	</div>

	<div class="relative z-10 container mx-auto px-4 max-w-4xl py-24">
		<div class="flex flex-col md:flex-row items-center md:items-start gap-12 mb-16">
			<div
				class="w-64 h-64 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg"
				in:fly={{ x: -50, duration: 1000, delay: 300, easing: cubicOut }}
			>
				<img src="/images/portrait.jpg" alt="Philip Nordquist" class="w-full h-full object-cover" />
			</div>
			<div>
				<h1
					class="text-5xl md:text-6xl font-bold mb-8 tracking-tighter"
					in:fly={{ y: -50, duration: 1000, delay: 300, easing: cubicOut }}
				>
					About <span class="text-emerald-400 font-display font-black italic">Me</span>
				</h1>

				<div
					class="mb-8 space-y-4 text-lg leading-relaxed"
					in:fade={{ duration: 1000, delay: 500 }}
				>
					<p>
						Experienced DevSecOps engineer with a strong foundation in infrastructure engineering
						and a passion for building reliable, secure systems.
					</p>
				</div>
			</div>
		</div>

		<div class="mb-12 space-y-8" in:fly={{ y: 50, duration: 1000, delay: 700, easing: cubicOut }}>
			<h2 class="text-3xl font-semibold mb-6 text-emerald-400">Professional Journey</h2>

			<div class="space-y-12">
				{#each workHistory as job, index}
					<div class="flex gap-6" in:fade={{ duration: 500, delay: 200 * index }}>
						<div
							class="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center"
						>
							<img
								src={job.logo}
								alt="{job.company} logo"
								class="w-10 h-10"
								width="40"
								height="40"
							/>
						</div>
						<div class="flex-grow">
							<h3 class="text-xl font-semibold mb-2">{job.position} at {job.company}</h3>
							<p class="text-gray-400 mb-2">{job.period}</p>
							<p class="mb-4">{job.description}</p>
							<div class="mb-3">
								<h4 class="text-sm font-semibold mb-2 text-gray-400">Tech Stack</h4>
								<div class="flex flex-wrap gap-2">
									{#each job.techstack as tech}
										<Badge text={tech} variant="tech" />
									{/each}
								</div>
							</div>
							<div>
								<h4 class="text-sm font-semibold mb-2 text-gray-400">Skills</h4>
								<div class="flex flex-wrap gap-2">
									{#each job.skills as skill}
										<Badge text={skill} variant="skill" />
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="flex flex-wrap items-center gap-6 mb-12"
			in:fly={{ y: 50, duration: 1000, delay: 900, easing: cubicOut }}
		>
			<a
				href="https://github.com/nordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300"
			>
				<IconGithub class="w-6 h-6" />
				<span>GitHub</span>
			</a>
			<a
				href="https://linkedin.com/in/philipnordquist"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300"
			>
				<IconLinkedin class="w-6 h-6" />
				<span>LinkedIn</span>
			</a>
			<a
				href="mailto:philip@nordquist.me"
				class="group flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300"
			>
				<IconEmail class="w-6 h-6" />
				<span>Email</span>
			</a>
		</div>

		<button
			onclick={downloadResume}
			class="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors duration-300"
			in:fly={{ y: 50, duration: 1000, delay: 1100, easing: cubicOut }}
		>
			<IconDownload class="w-5 h-5 mr-2" />
			Download Resume
		</button>
	</div>
</main>
