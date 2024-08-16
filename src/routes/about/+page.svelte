<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconDownload from '~icons/lucide/download';
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconBriefcase from '~icons/lucide/briefcase';
	import IconCalendar from '~icons/lucide/calendar';
	import Badge from '$lib/components/Badge.svelte';
	import { workHistory } from '$lib/data/workHistory.js';

	let resumeUrl = $state('/files/Philip_Nordquist_06_24.pdf');

	let aboutMeParagraph = $state(`
		<strong>DevSecOps Engineer with 10+ years of experience in architecting, implementing, and
		optimizing complex IT infrastructures.</strong> Proven ability to design and deploy scalable
		cloud solutions (AWS, GCP, Azure), enhance security posture (IAM, SIEM), and drive
		operational excellence through automation (Terraform, Ansible, Infrastructure as Code). 
		Skilled in leveraging modern practices like GitOps (ArgoCD) and observability (Grafana, Prometheus, Loki) 
		to deliver high-performing, resilient systems.
	`);

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

<main
	class="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-24 px-4 sm:px-6 lg:px-8"
>
	<div class="max-w-5xl mx-auto">
		<h1
			class="text-5xl md:text-6xl font-serif font-bold mb-16 text-center"
			in:fly={{ y: -20, duration: 500, delay: 100, easing: cubicOut }}
		>
			About Me
		</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
			<div
				class="bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl p-8 flex flex-col items-center"
				in:fly={{ x: -20, duration: 500, delay: 200, easing: cubicOut }}
			>
				<img
					src="/images/portrait.jpg"
					alt="Philip Nordquist"
					class="w-40 h-40 rounded-full mb-6 object-cover"
				/>
				<h2 class="text-2xl font-serif font-bold mb-4">Philip Nordquist</h2>
				<p class="text-center mb-6 font-sans font-light">
					DevSecOps Engineer based in Sweden. Passionate about creating secure, scalable, and
					observable systems.
				</p>
				<div class="flex space-x-4">
					<a
						href="https://github.com/nordquist"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
					>
						<IconGithub class="w-6 h-6" />
					</a>
					<a
						href="https://linkedin.com/in/philipnordquist"
						target="_blank"
						rel="noopener noreferrer"
						class="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
					>
						<IconLinkedin class="w-6 h-6" />
					</a>
					<a
						href="mailto:philip@nordquist.me"
						class="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
					>
						<IconEmail class="w-6 h-6" />
					</a>
				</div>
			</div>
			<div
				class="bg-sky-100 dark:bg-sky-900/30 rounded-3xl p-8 flex flex-col justify-between"
				in:fly={{ x: 20, duration: 500, delay: 300, easing: cubicOut }}
			>
				<div>
					<h2 class="text-2xl font-serif font-bold mb-4">Professional Summary</h2>
					<p class="mb-6 font-sans font-light">
						{@html aboutMeParagraph}
					</p>
				</div>
				<button
					onclick={downloadResume}
					class="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-sans font-normal rounded-full hover:bg-gray-800 transition-colors duration-200 self-start"
				>
					<IconDownload class="w-5 h-5 mr-2" />
					Download Resume
				</button>
			</div>
		</div>

		<h2 class="text-3xl font-serif font-bold mb-8 text-center">Work History</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each workHistory as job, index}
				<div
					class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm"
					in:fly={{ y: 20, duration: 500, delay: 100 * index, easing: cubicOut }}
				>
					<div class="flex items-center mb-4">
						<img src={job.logo} alt="{job.company} logo" class="w-12 h-12 mr-4" />
						<div>
							<h3 class="text-xl font-serif font-bold">{job.company}</h3>
							<p class="text-gray-600 dark:text-gray-400 font-sans font-light">{job.position}</p>
						</div>
					</div>
					<div class="mb-4 space-y-2">
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans font-light">
							<IconCalendar class="w-4 h-4 mr-2" />
							{job.period}
						</p>
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans font-light">
							<IconMapPin class="w-4 h-4 mr-2" />
							{job.location}
						</p>
					</div>
					<p class="mb-4 font-sans font-light line-clamp-3">{job.description}</p>
					<div class="mb-4">
						<h4 class="font-sans font-semibold mb-2 text-sm">Key Skills</h4>
						<div class="flex flex-wrap gap-2">
							{#each job.skills.slice(0, 3) as skill}
								<Badge text={skill} variant="skill" />
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
