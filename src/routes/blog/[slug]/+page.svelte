<script>
	import { fade } from 'svelte/transition';
	import IconChevronLeft from '~icons/lucide/chevron-left';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import IconClock from '~icons/lucide/clock';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { calculateReadingTime } from '$lib/utils/readingTime';

	let { data } = $props();
	let visible = $state(false);
	let headings = $state([]);
	let readingTime = $state(0);

	$effect(() => {
		document.title = `${data.post.title} - Philip Nordquist's Blog`;
		visible = true;
		// Extract headings from the post content
		const parser = new DOMParser();
		const doc = parser.parseFromString(data.post.content, 'text/html');
		headings = Array.from(doc.querySelectorAll('h2, h3, h4, h5, h6')).map((heading) => ({
			id: heading.id,
			title: heading.textContent,
			level: parseInt(heading.tagName.charAt(1))
		}));
		// Calculate reading time
		readingTime = calculateReadingTime(data.post.content);
	});
</script>

<main class="container mx-auto px-4 py-8 font-sans">
	{#if visible}
		<article in:fade={{ duration: 1000 }} class="prose lg:prose-xl mx-auto">
			<a href="/blog" class="btn btn-ghost mb-4 font-mono">
				<IconChevronLeft class="w-4 h-4 mr-2" />
				Back to Blog
			</a>
			<h1 class="font-serif">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-500 mb-4">
				<IconCalendar class="w-4 h-4 mr-1" />
				<time datetime={data.post.date}>{new Date(data.post.date).toLocaleDateString()}</time>
				<span class="mx-2">•</span>
				<IconClock class="w-4 h-4 mr-1" />
				<span>{readingTime} min read</span>
			</div>
			<div class="mb-8">
				{#each data.post.topics as topic}
					<span class="badge badge-outline mr-2 font-mono">
						<IconTag class="w-4 h-4 mr-1" />
						{topic}
					</span>
				{/each}
			</div>
			<div class="flex flex-col lg:flex-row">
				<div class="lg:w-3/4 font-sans">
					{@html data.post.content}
				</div>
				<div>
					<ScrollToTop />
				</div>
			</div>
		</article>
	{/if}
</main>
