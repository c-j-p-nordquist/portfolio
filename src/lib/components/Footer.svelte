<script>
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="relative z-10 bg-gray-50 dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800"
>
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center">
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
				&copy; {currentYear} Philip Nordquist. All rights reserved.
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-500 mb-4">
				Made with <a
					href="https://kit.svelte.dev"
					class="text-emerald-600 dark:text-emerald-400 hover:underline">SvelteKit</a
				>,
				<a href="https://svelte.dev" class="text-emerald-600 dark:text-emerald-400 hover:underline"
					>Svelte 5</a
				>, and
				<a
					href="https://tailwindcss.com"
					class="text-emerald-600 dark:text-emerald-400 hover:underline">TailwindCSS</a
				>
			</p>
			<div class="flex space-x-4">
				<a
					href="https://github.com/nordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
				>
					<IconGithub class="w-6 h-6" />
				</a>
				<a
					href="https://linkedin.com/in/philipnordquist"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
				>
					<IconLinkedin class="w-6 h-6" />
				</a>
				<a
					href="mailto:philip@nordquist.me"
					class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
				>
					<IconEmail class="w-6 h-6" />
				</a>
			</div>
		</div>
	</div>
</footer>
