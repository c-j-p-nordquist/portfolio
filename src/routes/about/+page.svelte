<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconDownload from '~icons/lucide/download';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconCalendar from '~icons/lucide/calendar';
	import Badge from '$lib/components/Badge.svelte';
	import { workHistory } from '$lib/data/workHistory.js';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	let resumeUrl = $state('/files/resume.pdf');
</script>

<svelte:head>
	<title>About Philip Nordquist - DevSecOps Engineer</title>
	<meta
		name="description"
		content="Philip Nordquist, a seasoned DevSecOps Engineer with expertise in cloud platforms, security engineering, and IT management. Explore my work history, skills, and contributions to digital transformation in global platforms."
	/>
</svelte:head>

<main
	class="min-h-screen w-full bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 py-24 px-6 sm:px-8 lg:px-12"
>
	<div class="max-w-5xl mx-auto">
		<h1
			class="text-5xl md:text-6xl font-serif font-bold mb-16 text-center text-gray-900 dark:text-dark-text-primary"
			in:fly={{ y: -20, duration: 500, delay: 100, easing: cubicOut }}
		>
			About Me
		</h1>

		<div class="mb-20" in:fade={{ duration: 500 }}>
			<div class="flex flex-col md:flex-row items-center md:items-start gap-12 mb-12">
				<div class="md:w-1/3 flex flex-col items-center">
					<div class="mb-6">
						<picture>
							<source srcset="/images/portrait.webp" type="image/webp" />
							<source srcset="/images/portrait.jpg" type="image/jpeg" />
							<img
								src="/images/portrait.jpg"
								alt="Philip Nordquist"
								class="w-48 h-48 rounded-full object-cover"
							/>
						</picture>
					</div>
					<h2
						class="text-3xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200 text-center"
					>
						Philip Nordquist
					</h2>
					<div class="space-y-2 mb-6 text-center">
						<p class="font-sans text-gray-600 dark:text-gray-400">DevSecOps Engineer at STIM</p>
						<p class="font-sans text-gray-600 dark:text-gray-400">Owner of CJP IT Consulting AB</p>
					</div>
					<SocialLinks size="md" />
				</div>
				<div class="md:w-2/3">
					<div class="space-y-4 mb-6 text-base font-sans text-gray-700 dark:text-gray-300">
						<p>
							DevSecOps Engineer with <span class="font-medium text-gray-900 dark:text-gray-100"
								>10+ years of experience</span
							>
							in architecting and implementing
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>secure, scalable IT infrastructures</span
							>.
						</p>
						<p>
							Expertise in <span class="font-medium text-gray-900 dark:text-gray-100"
								>cloud platforms</span
							>
							(AWS, GCP, Azure),
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>infrastructure as code</span
							>
							(Terraform), and embedding
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>security-by-design principles</span
							> into every stage of development.
						</p>
						<p>
							Adept at delivering <span class="font-medium text-gray-900 dark:text-gray-100"
								>high-performance systems</span
							>
							through GitOps,
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>observability best practices</span
							>, and a proactive approach to
							<span class="font-medium text-gray-900 dark:text-gray-100">automation</span>. Proven
							track record of driving
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>digital transformation</span
							>
							and
							<span class="font-medium text-gray-900 dark:text-gray-100"
								>operational excellence</span
							> in diverse environments.
						</p>
					</div>
					<a
						href={resumeUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Download resume"
						class="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-sans font-normal rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
					>
						<IconDownload class="w-5 h-5 mr-2" />
						Download Resume
					</a>
				</div>
			</div>
		</div>

		<h2 class="text-3xl font-serif font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
			Work History
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each workHistory as job, index}
				<div
					class="bg-white dark:bg-dark-surface/50 rounded-3xl p-6 shadow-sm"
					in:fly={{ y: 20, duration: 500, delay: 100 * index, easing: cubicOut }}
				>
					<div class="flex items-center mb-4">
						<img src={job.logo} alt="{job.company} logo" class="w-12 h-12 mr-4 rounded-full" />
						<div>
							<h3 class="text-xl font-serif font-bold text-gray-800 dark:text-gray-200">
								{job.company}
							</h3>
							<p class="text-gray-600 dark:text-gray-400 font-sans">
								{job.position}
							</p>
						</div>
					</div>
					<div class="mb-4 space-y-2">
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans">
							<IconCalendar class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
							{job.period}
						</p>
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans">
							<IconMapPin class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
							{job.location}
						</p>
					</div>
					<p class="mb-4 text-base font-sans text-gray-700 dark:text-gray-300">
						{job.description}
					</p>
					<div class="mb-4">
						<h4 class="font-sans font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
							Key Skills
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each job.skills as skill}
								<Badge text={skill} variant="skill" />
							{/each}
						</div>
					</div>
					<div>
						<h4 class="font-sans font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
							Tech Stack
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each job.techstack as tech}
								<Badge text={tech} variant="tech" />
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
