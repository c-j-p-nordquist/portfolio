<script>
	import { fade } from 'svelte/transition';
	import IconGithub from '~icons/mdi/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import IconBook from '~icons/lucide/book';

	let { project, index } = $props();

	let cardClass = $derived.by(() => {
		let baseClass =
			'rounded-3xl p-8 transition-all duration-300 h-full flex flex-col justify-between max-w-md w-full';
		return `${baseClass} ${project.type === 'project' ? 'bg-emerald-100 dark:bg-dark-surface/80' : 'bg-sky-100 dark:bg-dark-surface/80'}`;
	});

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	}
</script>

<div role="article" class={cardClass} in:fade={{ duration: 300, delay: 50 * index }}>
	<div>
		<div class="flex items-start justify-between mb-4">
			<div>
				<h3 class="text-2xl font-serif font-bold mb-2 text-gray-900 dark:text-dark-text-primary">
					{project.title}
				</h3>
				<p class="text-sm font-sans font-light text-gray-600 dark:text-dark-text-secondary">
					{formatDate(project.date)}
				</p>
			</div>
			{#if project.icon}
				<span class="text-3xl">{project.icon}</span>
			{/if}
		</div>
		<p
			class="text-base font-sans font-light text-gray-700 dark:text-dark-text-secondary mb-6 line-clamp-4"
		>
			{project.description}
		</p>
	</div>
	<div class="mt-auto">
		{#if project.type === 'project'}
			<div class="flex flex-wrap gap-3">
				{#if project.githubUrl}
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-6 py-3 text-sm font-sans font-normal bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-200"
					>
						<IconGithub class="w-4 h-4 mr-2" />
						View on GitHub
					</a>
				{/if}
				{#if project.liveUrl}
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-6 py-3 text-sm font-sans font-normal bg-emerald-500 dark:bg-dark-primary text-white dark:text-dark-bg rounded-full hover:bg-emerald-600 dark:hover:bg-dark-primary/90 transition-colors duration-200"
					>
						<IconExternalLink class="w-4 h-4 mr-2" />
						Visit Site
					</a>
				{/if}
			</div>
		{:else if project.type === 'blog'}
			<a
				href={`/posts/${project.slug}`}
				class="inline-flex items-center px-6 py-3 text-sm font-sans font-normal bg-sky-500 dark:bg-dark-secondary text-white dark:text-dark-bg rounded-full hover:bg-sky-600 dark:hover:bg-dark-secondary/90 transition-colors duration-200"
			>
				<IconBook class="w-4 h-4 mr-2" />
				Read Article
			</a>
		{/if}
	</div>
</div>
