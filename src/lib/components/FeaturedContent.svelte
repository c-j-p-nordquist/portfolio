<script>
	import { formatDate } from '$lib/utils/formatDate';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import IconSearch from '~icons/lucide/search';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';

	let { featuredItems } = $props();

	let searchTerm = $state('');
	let filteredItems = $derived(searchTerm ? searchPostsIndex(searchTerm) : featuredItems);

	function truncate(text, length) {
		return text.length > length ? text.substring(0, length) + '...' : text;
	}

	$effect(() => {
		if (!isIndexCreated()) {
			createPostsIndex(featuredItems);
		}
	});
</script>

<div class="h-full flex flex-col">
	<div class="p-4 sticky top-0 bg-primary z-10">
		<div class="relative">
			<input
				type="text"
				placeholder="Search..."
				class="w-full p-2 pr-10 rounded bg-secondary text-white placeholder-white/50"
				bind:value={searchTerm}
			/>
			<IconSearch class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
		</div>
	</div>
	<div class="flex-grow overflow-y-auto smooth-scroll">
		{#each filteredItems as item}
			<article class="p-6 border-b border-secondary">
				<h3 class="text-xl font-serif font-bold mb-2">
					<a
						href={item.slug ? `/blog/${item.slug}` : `/projects/${item.id}`}
						class="text-white hover:text-accent transition-colors duration-200"
					>
						{@html item.title}
					</a>
				</h3>
				{#if item.date}
					<div class="text-sm text-white/70 mb-2 flex items-center">
						<IconCalendar class="inline-block mr-2" />
						{formatDate(item.date)}
					</div>
				{/if}
				<div class="text-base text-white/80 mb-3">
					{@html item.summary || item.description}
				</div>
				<div class="flex flex-wrap gap-2 mb-2">
					{#each item.topics || item.tags || [] as tag}
						<span class="text-xs text-white/70 flex items-center">
							<IconTag class="inline-block mr-1" />
							{tag}
						</span>
					{/each}
				</div>
				<a
					href={item.slug ? `/blog/${item.slug}` : `/projects/${item.id}`}
					class="text-accent hover:text-white transition-colors duration-200 text-sm font-semibold"
				>
					Read more →
				</a>
			</article>
		{/each}
	</div>
</div>

<style>
	.smooth-scroll {
		scroll-behavior: smooth;
	}
</style>
