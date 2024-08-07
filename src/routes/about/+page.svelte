<script>
	import IconDownload from '~icons/lucide/download';
	import IconMail from '~icons/lucide/mail';
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import TechIcons from '$lib/components/TechIcons.svelte';

	let resumeUrl = $state('/files/resume.pdf');

	function downloadResume() {
		window.open(resumeUrl, '_blank');
	}
</script>

<div class="flex min-h-screen">
	<main class="flex-grow p-8">
		<div class="max-w-4xl mx-auto">
			<div class="flex items-center mb-8">
				<div class="avatar placeholder mr-4">
					<div class="bg-neutral text-neutral-content w-24 rounded-full">
						<span class="text-3xl">PN</span>
					</div>
				</div>
				<div>
					<h1 class="text-4xl font-bold text-primary">Philip Nordquist</h1>
					<p class="text-xl text-secondary">DevSecOps Engineer & Problem Solver</p>
				</div>
			</div>

			<div class="prose lg:prose-xl">
				<p>
					I've spent over a decade crafting robust cloud infrastructures and optimizing operations.
					I'm passionate about solving complex challenges through automation, security, and
					innovation. My expertise spans from designing cloud architectures to implementing
					DevSecOps best practices. I'm always eager to explore new technologies and find creative
					solutions.
				</p>
				<!-- ... rest of the content ... -->
			</div>

			<div class="mt-12">
				<h2 class="text-3xl font-bold mb-6 text-primary">Technical Expertise</h2>
				<TechIcons />

				<h2 class="text-3xl font-bold mt-12 mb-6 text-primary">Connect with Me</h2>
				<div class="flex flex-wrap gap-4">
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
					<button class="btn btn-accent w-full sm:w-auto" onclick={downloadResume}>
						<IconDownload class="w-5 h-5 mr-2" />
						Download My Resume
					</button>
				</div>
			</div>
		</div>
	</main>
</div>
