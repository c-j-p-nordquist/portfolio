<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';

	let visible = $state(false);
	let blogPosts = $state([
		{
			slug: 'implementing-zero-trust-architecture',
			title: 'Implementing Zero Trust Architecture',
			date: '2023-12-01',
			excerpt:
				'An exploration of Zero Trust Architecture and its implementation in modern systems.',
			topics: ['Security', 'Architecture']
		},
		{
			slug: 'cloud-native-monitoring-solutions',
			title: 'Cloud-Native Monitoring Solutions',
			date: '2023-11-15',
			excerpt: 'A deep dive into various cloud-native monitoring solutions and their benefits.',
			topics: ['Cloud', 'Monitoring']
		}
		// Add more blog posts here
	]);

	onMount(() => {
		document.title = 'Blog - Philip Nordquist';
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center">Blog</h1>

			<div class="space-y-8">
				{#each blogPosts as post}
					<article class="card bg-base-200 shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl">
								<a href={`/blog/${post.slug}`} class="hover:underline">{post.title}</a>
							</h2>
							<div class="flex items-center text-sm text-gray-500 mb-2">
								<IconCalendar class="w-4 h-4 mr-1" />
								<time datetime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
							</div>
							<p class="mb-4">{post.excerpt}</p>
							<div class="card-actions justify-end">
								{#each post.topics as topic}
									<div class="badge badge-outline">
										<IconTag class="w-4 h-4 mr-1" />
										{topic}
									</div>
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}
</main>
