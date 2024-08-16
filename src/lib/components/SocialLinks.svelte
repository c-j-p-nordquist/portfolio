<script>
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconEmail from '~icons/mdi/email';

	let { size = 'md' } = $props();

	const sizeClasses = {
		sm: 'w-5 h-5',
		md: 'w-6 h-6',
		lg: 'w-8 h-8'
	};

	const iconClass = $derived(sizeClasses[size] || sizeClasses.md);
</script>

<div class="flex items-center space-x-4">
	<a
		href="https://github.com/c-j-p-nordquist"
		target="_blank"
		rel="noopener noreferrer"
		class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
	>
		<IconGithub class={iconClass} />
	</a>
	<a
		href="https://linkedin.com/in/philip-nordquist-269949a0"
		target="_blank"
		rel="noopener noreferrer"
		class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
	>
		<IconLinkedin class={iconClass} />
	</a>
	<a
		href="mailto:philip@nordquist.me"
		class="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
	>
		<IconEmail class={iconClass} />
	</a>
</div>
