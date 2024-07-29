<script>
	import { formatDate } from '$lib/utils/formatDate';
	import IconCalendar from '~icons/lucide/calendar';
	import IconSearch from '~icons/lucide/search';
	import IconX from '~icons/lucide/x';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';
	import Badge from '$lib/components/Badge.svelte';

	let { isOpen, onClose, posts = [], postsIndexCreated = false } = $props();

	let searchTerm = $state('');
	let filteredItems = $derived(
		searchTerm && postsIndexCreated ? searchPostsIndex(searchTerm) : posts
	);

	function truncate(text, length) {
		return text?.length > length ? text.substring(0, length) + '...' : text;
	}

	function getItemUrl(item) {
		return `/blog/${item.slug}`;
	}

	$effect(() => {
		if (!postsIndexCreated && posts.length > 0) {
			createPostsIndex(posts);
		}
	});
</script>

<div class="drawer drawer-end {isOpen ? 'drawer-open' : ''}">
	<input id="search-drawer" type="checkbox" class="drawer-toggle" bind:checked={isOpen} />
	<div class="drawer-side">
		<label for="search-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="p-4 w-80 min-h-full bg-primary text-base-content flex flex-col">
			<div class="flex justify-between items-center mb-4">
				<h3 class="text-xl font-bold text-white">Search</h3>
				<button onclick={onClose} class="text-white">
					<IconX />
				</button>
			</div>
			<div class="relative mb-4">
				<input
					type="text"
					placeholder="Search..."
					class="w-full p-2 pr-10 rounded bg-secondary text-white placeholder-white/50"
					bind:value={searchTerm}
				/>
				<IconSearch class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
			</div>
			<div class="flex-grow overflow-y-auto">
				{#if filteredItems && filteredItems.length > 0}
					{#each filteredItems as item}
						<article class="mb-6 border-b border-secondary pb-4">
							<h3 class="text-lg font-serif font-bold mb-2">
								<a
									href={getItemUrl(item)}
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
							<div class="text-sm text-white/80 mb-3">
								{@html truncate(item.description, 100)}
							</div>
							{#if item.topics}
								<div class="flex flex-wrap gap-2 mb-2">
									{#each item.topics as topic}
										<Badge {topic} />
									{/each}
								</div>
							{/if}
						</article>
					{/each}
				{:else if searchTerm}
					<div class="text-center text-white/80">
						<p>No results found for "{searchTerm}"</p>
						<p class="mt-2">Try adjusting your search terms.</p>
					</div>
				{:else}
					<div class="text-center text-white/80">
						<p>Start typing to search posts.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
