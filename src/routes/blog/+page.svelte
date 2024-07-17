<script>
	import { formatDate } from '$lib/utils/formatDate';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-8 max-w-3xl">
	<h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
	<ul class="space-y-4">
		{#each data.posts as post}
			<li class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title font-serif">
						<a href={post.path} class="link link-hover">{post.title}</a>
					</h2>
					<p class="text-base-content font-sans text-opacity-60">
						Published on {formatDate(post.date)}
					</p>
					{#if post.description}
						<p class="font-sans">{post.description}</p>
					{/if}
					{#if post.topics}
						<div class="card-actions justify-end">
							{#each post.topics as topic}
								<div class="badge badge-outline">{topic}</div>
							{/each}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>
