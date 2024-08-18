<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconDownload from '~icons/lucide/download';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconBriefcase from '~icons/lucide/briefcase';
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

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20" in:fade={{ duration: 500 }}>
			<div
				class="bg-emerald-100 dark:bg-dark-surface/30 rounded-3xl p-8 flex flex-col items-center"
				in:fly={{ x: -20, duration: 500, delay: 200, easing: cubicOut }}
			>
				<picture>
					<source srcset="/images/portrait.webp" type="image/webp" />
					<source srcset="/images/portrait.jpg" type="image/jpeg" />
					<img
						src="/images/portrait.jpg"
						alt="Philip Nordquist"
						class="w-40 h-40 rounded-full mb-6 object-cover"
					/>
				</picture>
				<h2 class="text-2xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
					Philip Nordquist
				</h2>
				<p class="text-center mb-6 font-sans font-light text-gray-600 dark:text-gray-400">
					DevSecOps Engineer crafting secure, scalable, and efficient IT infrastructures. Based in
					Sweden, committed to driving digital transformation and operational excellence on global
					platforms.
				</p>
				<div class="flex">
					<SocialLinks size="md" />
				</div>
			</div>
			<div
				class="bg-sky-100 dark:bg-dark-surface/30 rounded-3xl p-8 flex flex-col justify-between"
				in:fly={{ x: 20, duration: 500, delay: 300, easing: cubicOut }}
			>
				<div>
					<h2 class="text-2xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
						Professional Summary
					</h2>
					<div
						class="space-y-4 mb-6 text-base font-sans font-light text-gray-700 dark:text-gray-400"
					>
						<p>
							DevSecOps Engineer with <span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>10+ years of experience</span
							>
							in architecting and implementing
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>secure, scalable IT infrastructures</span
							>.
						</p>
						<p>
							Expertise in <span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>cloud platforms</span
							>
							(AWS, GCP, Azure),
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>infrastructure as code</span
							>
							(Terraform), and embedding
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>security-by-design principles</span
							> into every stage of development.
						</p>
						<p>
							Adept at delivering <span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>high-performance systems</span
							>
							through GitOps,
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>observability best practices</span
							>, and a proactive approach to
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>automation</span
							>. Proven track record of driving
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>digital transformation</span
							>
							and
							<span
								class="font-medium bg-primary-100 dark:bg-primary-800/50 px-1 rounded text-primary-800 dark:text-primary-200"
								>operational excellence</span
							> in diverse environments.
						</p>
					</div>
				</div>
				<a
					href={resumeUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Download resume"
					class="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-sans font-normal rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200 self-start"
				>
					<IconDownload class="w-5 h-5 mr-2" />
					Download Resume
				</a>
			</div>
		</div>

		<h2 class="text-3xl font-serif font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
			Work History
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each workHistory as job, index}
				<div
					class="bg-white dark:bg-dark-surface/50 rounded-3xl p-6"
					in:fly={{ y: 20, duration: 500, delay: 100 * index, easing: cubicOut }}
				>
					<div class="flex items-center mb-4">
						<img src={job.logo} alt="{job.company} logo" class="w-12 h-12 mr-4 rounded-full" />
						<div>
							<h3 class="text-xl font-serif font-bold text-gray-800 dark:text-gray-200">
								{job.company}
							</h3>
							<p class="text-gray-600 dark:text-gray-400 font-sans font-light">
								{job.position}
							</p>
						</div>
					</div>
					<div class="mb-4 space-y-2">
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans font-light">
							<IconCalendar class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
							{job.period}
						</p>
						<p class="flex items-center text-gray-600 dark:text-gray-400 font-sans font-light">
							<IconMapPin class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
							{job.location}
						</p>
					</div>
					<p class="mb-4 text-base font-sans font-light text-gray-700 dark:text-gray-300">
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
