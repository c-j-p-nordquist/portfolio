<script>
	import IconDownload from '~icons/lucide/download';
	import IconMail from '~icons/lucide/mail';
	import IconGithub from '~icons/lucide/github';
	import IconLinkedin from '~icons/lucide/linkedin';
	import TechIcons from '$lib/components/TechIcons.svelte';

	let resumeUrl = $state('/path/to/your/resume.pdf');

	function downloadResume() {
		window.open(resumeUrl, '_blank');
	}

	const keyAchievements = [
		'Led cloud migration projects for Fortune 500 companies',
		'Developed custom observability tools improving system reliability by 40%',
		'Implemented GitOps practices reducing deployment times by 60%',
		'Contributed to open-source Kubernetes projects'
	];
</script>

<main class="container mx-auto px-4 py-8">
	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Left Column: About Me -->
		<div class="lg:w-2/3">
			<div class="flex items-center mb-8">
				<div class="avatar placeholder mr-4">
					<div class="bg-neutral text-neutral-content w-24 rounded-full">
						<span class="text-3xl">PN</span>
					</div>
				</div>
				<div>
					<h1 class="text-4xl font-bold text-base-content">Philip Nordquist</h1>
					<p class="text-xl text-base-content/70">Solutions Architect & Problem Solver</p>
				</div>
			</div>

			<div class="prose lg:prose-xl">
				<p>
					With over a decade of experience in IT infrastructure, networking, and security, I've
					developed a passion for solving complex technical challenges. My expertise spans a wide
					range of environments, from on-premise solutions to cloud platforms, always focusing on
					finding the most efficient and scalable approach to each unique problem.
				</p>
				<p>
					Recently, I've been exploring areas such as observability tooling, continuous deployment
					methodologies, and container orchestration. These tools and approaches offer exciting
					possibilities for improving system reliability and efficiency, regardless of the
					underlying infrastructure.
				</p>
				<p>
					What drives me is not the technology itself, but the problems it can solve. I believe in
					choosing the right tool for each job, whether that's leveraging cloud services for their
					scalability and shared responsibility model, or implementing on-premise solutions when
					they better suit the needs of a project. This flexible approach allows me to design and
					implement solutions that truly address the core challenges at hand.
				</p>
				<h2 class="text-2xl font-semibold mt-6 mb-2">The Purpose of This Blog</h2>
				<p>
					This blog is a platform where I share insights gained from tackling real-world IT
					challenges. Here, I document solution approaches, analyze emerging technologies from a
					problem-solving perspective, and explore intriguing concepts in the world of IT
					infrastructure and systems design.
				</p>
				<p>
					My goal is to contribute practical knowledge to the tech community, focusing on the 'why'
					and 'how' of solving problems rather than just the tools used. Whether you're here to find
					inspiration for your own technical challenges, gain insights into effective system design,
					or explore different approaches to common problems in our field, I hope you'll find the
					content both informative and applicable to your work.
				</p>
			</div>
		</div>

		<!-- Right Column: Skills and Connect -->
		<div class="lg:w-1/3">
			<h2 class="text-3xl font-bold mb-6">Technical Expertise</h2>
			<TechIcons />

			<h2 class="text-3xl font-bold mt-12 mb-6">Connect with Me</h2>
			<div class="flex flex-col space-y-4">
				<a href="mailto:philip@nordquist.me" class="btn btn-outline btn-primary">
					<IconMail class="w-5 h-5 mr-2" />
					Email Me
				</a>
				<a
					href="https://github.com/c-j-p-nordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline"
				>
					<IconGithub class="w-5 h-5 mr-2" />
					GitHub Profile
				</a>
				<a
					href="https://linkedin.com/in/philip-nordquist-269949a0"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline"
				>
					<IconLinkedin class="w-5 h-5 mr-2" />
					LinkedIn Profile
				</a>
			</div>

			<div class="mt-8">
				<button class="btn btn-accent w-full" onclick={downloadResume}>
					<IconDownload class="w-5 h-5 mr-2" />
					Download My Resume
				</button>
			</div>
		</div>
	</div>
</main>
