<script>
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-darkBackground text-darkMutedText py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4 lg:gap-8">
			<div class="col-span-2 sm:col-span-1">
				<h3 class="text-darkText text-lg font-serif font-semibold mb-4">About</h3>
				<p class="text-sm mb-4 font-sans">
					I provide top-tier DevSecOps and cloud architecture consulting services through my
					company, CJP IT Consulting AB.
				</p>
				<a
					href="/about#certification"
					class="text-secondary hover:text-accent transition-colors duration-200 inline-flex items-center"
				>
					<span class="mr-2">AWS Certified Solutions Architect</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</div>
			<div>
				<h3 class="text-darkText text-lg font-serif font-semibold mb-4">Services</h3>
				<ul class="space-y-2 font-sans">
					<li>
						<a
							href="/services#cloud-architecture"
							class="hover:text-accent transition-colors duration-200">Cloud Architecture</a
						>
					</li>
					<li>
						<a href="/services#devsecops" class="hover:text-accent transition-colors duration-200"
							>DevSecOps</a
						>
					</li>
					<li>
						<a href="/services#automation" class="hover:text-accent transition-colors duration-200"
							>Automation</a
						>
					</li>
					<li>
						<a href="/services#security" class="hover:text-accent transition-colors duration-200"
							>Security</a
						>
					</li>
					<li>
						<a
							href="/services#observability"
							class="hover:text-accent transition-colors duration-200">Observability</a
						>
					</li>
				</ul>
			</div>
			<div>
				<h3 class="text-darkText text-lg font-serif font-semibold mb-4">Portfolio</h3>
				<ul class="space-y-2 font-sans">
					<li>
						<a href="/portfolio/projects" class="hover:text-accent transition-colors duration-200"
							>Projects</a
						>
					</li>
					<li>
						<a href="/portfolio/experience" class="hover:text-accent transition-colors duration-200"
							>Experience</a
						>
					</li>
					<li><a href="/blog" class="hover:text-accent transition-colors duration-200">Blog</a></li>
				</ul>
			</div>
			<div>
				<h3 class="text-darkText text-lg font-serif font-semibold mb-4">Connect</h3>
				<SocialLinks size="md" />
				<div class="mt-4">
					<a href="/contact" class="text-secondary hover:text-accent transition-colors duration-200"
						>Contact Me</a
					>
				</div>
			</div>
		</div>
		<div class="mt-8 pt-8 border-t border-gray-800">
			<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
				<p class="text-sm text-darkMutedText mb-4 sm:mb-0 font-sans">
					© {currentYear} Philip Nordquist (CJP IT Consulting AB). All rights reserved. Org. number:
					559387-5247
				</p>
				<div class="flex space-x-6">
					<a
						href="/terms"
						class="text-sm text-darkMutedText hover:text-accent transition-colors duration-200 font-sans"
						>Terms of use</a
					>
					<a
						href="/privacy"
						class="text-sm text-darkMutedText hover:text-accent transition-colors duration-200 font-sans"
						>Privacy policy</a
					>
				</div>
			</div>
		</div>
	</div>
</footer>
