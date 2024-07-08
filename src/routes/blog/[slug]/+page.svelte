<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import IconChevronLeft from '~icons/lucide/chevron-left';

	let { data } = $props();

	let visible = $state(false);
	let post = $derived(data.post);

	onMount(() => {
		document.title = `${post.title} - Philip Nordquist's Blog`;
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	{#if visible}
		<article in:fade={{ duration: 1000 }} class="prose lg:prose-xl mx-auto">
			<a href="/blog" class="btn btn-ghost mb-4">
				<IconChevronLeft class="w-4 h-4 mr-2" />
				Back to Blog
			</a>
			<h1>{post.title}</h1>
			<div class="flex items-center text-sm text-gray-500 mb-4">
				<IconCalendar class="w-4 h-4 mr-1" />
				<time datetime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
			</div>
			<div class="mb-8">
				{#each post.topics as topic}
					<div class="badge badge-outline mr-2">
						<IconTag class="w-4 h-4 mr-1" />
						{topic}
					</div>
				{/each}
			</div>
			<div>{@html post.content}</div>
		</article>
	{/if}
</main>
