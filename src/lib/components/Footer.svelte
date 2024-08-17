<script>
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer
	class="relative z-10 bg-gray-50 dark:bg-dark-surface py-6 border-t border-gray-200 dark:border-dark-surface"
>
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center">
			<p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-2">
				&copy; {currentYear} Philip Nordquist. All rights reserved.
			</p>
			<p class="text-xs text-gray-500 dark:text-dark-text-secondary mb-4">
				Made with <a
					href="https://kit.svelte.dev"
					class="text-emerald-600 dark:text-dark-primary hover:underline">SvelteKit</a
				>,
				<a href="https://svelte.dev" class="text-emerald-600 dark:text-dark-primary hover:underline"
					>Svelte 5</a
				>, and
				<a
					href="https://tailwindcss.com"
					class="text-emerald-600 dark:text-dark-primary hover:underline">TailwindCSS</a
				>
			</p>
			<SocialLinks size="md" />
		</div>
	</div>
</footer>
