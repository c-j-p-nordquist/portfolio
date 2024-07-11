<script>
	import { fade } from 'svelte/transition';
	import IconChevronLeft from '~icons/lucide/chevron-left';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';

	let { data } = $props();
	let visible = $state(false);

	$effect(() => {
		document.title = `${data.post.title} - Philip Nordquist's Blog`;
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8 font-sans">
	{#if visible}
		<article in:fade={{ duration: 1000 }} class="prose lg:prose-xl mx-auto">
			<a href="/blog" class="btn btn-ghost mb-4 font-mono">
				<IconChevronLeft class="w-4 h-4 mr-2" />
				Back to Blog
			</a>
			<h1 class="font-mono">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-500 mb-4">
				<IconCalendar class="w-4 h-4 mr-1" />
				<time datetime={data.post.date}>{new Date(data.post.date).toLocaleDateString()}</time>
			</div>
			<div class="mb-8">
				{#each data.post.topics as topic}
					<span class="badge badge-outline mr-2 font-mono">
						<IconTag class="w-4 h-4 mr-1" />
						{topic}
					</span>
				{/each}
			</div>
			<div class="font-sans">
				{@html data.post.content}
			</div>
		</article>
	{/if}
</main>
