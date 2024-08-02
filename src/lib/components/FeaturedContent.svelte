<script>
	import { fade } from 'svelte/transition';
	import { formatDate } from '$lib/utils/formatDate';
	import Badge from '$lib/components/Badge.svelte';
	import IconGithub from '~icons/lucide/github';
	import IconExternalLink from '~icons/lucide/external-link';
	import { goto } from '$app/navigation';

	let { featuredPosts } = $props();
	let visiblePosts = $state([]);

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

	async function handlePostClick(path, event) {
		event.preventDefault();
		await goto(path);
		window.scrollTo(0, 0);
	}

	$effect(() => {
		const timer = setInterval(() => {
			if (visiblePosts.length < featuredPosts.length) {
				visiblePosts = [...visiblePosts, featuredPosts[visiblePosts.length]];
			} else {
				clearInterval(timer);
			}
		}, 200);

		return () => clearInterval(timer);
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	{#each visiblePosts as post, index (post.slug)}
		<article
			class="bg-base-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-rotate-1"
			in:fade={{ duration: 500, delay: index * 150 }}
		>
			{#if post.imageUrl}
				<div class="relative h-48 overflow-hidden">
					<img
						src={post.imageUrl}
						alt={post.title}
						class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent"></div>
				</div>
			{/if}
			<div class="p-6 relative">
				<h3 class="text-xl font-display font-bold mb-2 text-base-content">
					<a
						href={post.path}
						class="hover:text-primary-focus transition-colors duration-200"
						onclick={(event) => handlePostClick(post.path, event)}
					>
						{post.title}
					</a>
				</h3>
				<p class="text-sm mb-2 text-base-content">{formatDates(post.date, post.lastUpdated)}</p>
				<p class="mb-4 text-base-content">{post.description}</p>
				<div class="flex flex-wrap gap-2 mb-4">
					<Badge type={post.type} href={getFilterUrl(post.type)} variant="type" />
					{#each post.topics || [] as topic}
						<Badge {topic} href={getFilterUrl(null, topic)} variant="topic" />
					{/each}
				</div>
				{#if post.type === 'project' && (post.githubUrl || post.liveUrl)}
					<div class="flex gap-4 mt-4">
						{#if post.githubUrl}
							<a
								href={post.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-base-content hover:text-primary-focus transition-colors duration-200 flex items-center"
							>
								<IconGithub class="w-5 h-5 mr-1" /> GitHub
							</a>
						{/if}
						{#if post.liveUrl}
							<a
								href={post.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-primary hover:text-primary-focus transition-colors duration-200 flex items-center"
							>
								<IconExternalLink class="w-5 h-5 mr-1" /> Live Demo
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</article>
	{/each}
</div>
