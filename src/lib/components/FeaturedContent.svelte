<script>
	import { formatDate } from '$lib/utils/formatDate';
	import Badge from '$lib/components/Badge.svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';

	let { featuredPosts } = $props();

	function formatDates(publishedDate, lastUpdatedDate) {
		let dateString = `Published on ${formatDate(publishedDate)}`;
		if (lastUpdatedDate && lastUpdatedDate !== publishedDate) {
			dateString += ` • Last updated on ${formatDate(lastUpdatedDate)}`;
		}
		return dateString;
	}

	function getFilterUrl(type, topic) {
		const params = new URLSearchParams();
		if (type) params.append('type', type);
		if (topic) params.append('topic', topic);
		return `/posts?${params.toString()}`;
	}
</script>

<div class="h-full p-8 flex flex-col" data-theme="dark">
	<h2 class="text-3xl font-serif font-bold mb-8 text-primary">Featured Work</h2>
	<div class="space-y-8 overflow-y-auto">
		{#each featuredPosts as post}
			<article class="pb-6 border-b border-neutral/20 last:border-b-0">
				<h3 class="text-xl font-serif font-bold mb-2">
					<a href={post.path} class="text-primary hover:text-accent transition-colors duration-200">
						{post.title}
					</a>
				</h3>
				<p class="text-sm mb-2 text-secondary">{formatDates(post.date, post.lastUpdated)}</p>
				<p class="mb-3 text-neutral">{post.description}</p>
				<div class="flex flex-wrap gap-2 mb-3">
					<Badge type={post.type} href={getFilterUrl(post.type)} variant="type" />
					{#each post.topics || [] as topic}
						<Badge {topic} href={getFilterUrl(null, topic)} variant="topic" />
					{/each}
				</div>
				{#if post.type === 'project' && (post.githubUrl || post.liveUrl)}
					<div class="flex gap-4">
						{#if post.githubUrl}
							<a
								href={post.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-secondary hover:text-primary transition-colors duration-200"
							>
								<IconGithub class="inline mr-1" /> GitHub
							</a>
						{/if}
						{#if post.liveUrl}
							<a
								href={post.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-secondary hover:text-primary transition-colors duration-200"
							>
								<IconExternalLink class="inline mr-1" /> Live Demo
							</a>
						{/if}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</div>
