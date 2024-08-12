<script>
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';

	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-900 text-white py-8">
	<div class="container mx-auto px-4">
		<div class="flex flex-col md:flex-row justify-between items-center">
			<div class="mb-4 md:mb-0">
				<p>&copy; {currentYear} Philip Nordquist. All rights reserved.</p>
			</div>
			<div class="flex space-x-4">
				<a
					href="https://github.com/nordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-blue-400"
				>
					<IconGithub class="w-6 h-6" />
				</a>
				<a
					href="https://linkedin.com/in/philipnordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-blue-400"
				>
					<IconLinkedin class="w-6 h-6" />
				</a>
				<a href="mailto:philip@nordquist.me" class="hover:text-blue-400">
					<IconEmail class="w-6 h-6" />
				</a>
			</div>
		</div>
	</div>
</footer>
