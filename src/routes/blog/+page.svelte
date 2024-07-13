<script>
	import { fade } from 'svelte/transition';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';

	let { data } = $props();
	let visible = $state(false);

	$effect(() => {
		document.title = 'Blog - Philip Nordquist';
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8 font-sans">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center font-mono">Blog</h1>

			<div class="space-y-8">
				{#each data.posts as post}
					<article class="card bg-base-200 shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl font-serif">
								<a href={`/blog/${post.slug}`} class="hover:underline">
									{post.title}
								</a>
							</h2>
							<div class="flex items-center text-sm text-gray-500 mb-2">
								<IconCalendar class="w-4 h-4 mr-1" />
								<time datetime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
							</div>
							<p class="mb-4 font-sans">
								{post.excerpt}
							</p>
							<div class="card-actions justify-end">
								{#each post.topics as topic}
									<div class="badge badge-outline font-mono">
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
