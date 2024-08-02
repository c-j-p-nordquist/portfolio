<script>
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';
	import IconSearch from '~icons/lucide/search';
	import IconX from '~icons/lucide/x';

	let { posts, onClose } = $props();
	let searchTerm = $state('');
	let results = $derived(() => untrack(() => (searchTerm ? searchPostsIndex(searchTerm) : [])));
	let inputRef;
	let selectedIndex = $state(-1);

	$effect(() => {
		if (!isIndexCreated()) {
			untrack(() => createPostsIndex(posts));
		}
	});

	$effect(() => {
		inputRef?.focus();

		const handleKeydown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			} else if (event.key === 'ArrowDown') {
				event.preventDefault();
				selectedIndex = (selectedIndex + 1) % results.length;
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				selectedIndex = (selectedIndex - 1 + results.length) % results.length;
			} else if (event.key === 'Enter' && selectedIndex !== -1) {
				handleResultClick(results[selectedIndex].slug);
			}
		};

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	function handleResultClick(slug) {
		goto(`/posts/${slug}`);
		onClose();
	}

	function highlightMatch(text, query) {
		if (!query) return text;
		const regex = new RegExp(`(${query})`, 'gi');
		return text.replace(regex, '<mark class="bg-primary text-primary-content">$1</mark>');
	}
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
	<div class="bg-base-100 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
		<div class="relative">
			<IconSearch class="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
			<input
				bind:this={inputRef}
				type="text"
				placeholder="Search..."
				class="w-full p-4 pl-12 text-lg text-base-content placeholder-base-content/50 border-b border-base-300 focus:outline-none bg-transparent"
				bind:value={searchTerm}
			/>
		</div>
		<div class="max-h-[60vh] overflow-y-auto p-4">
			{#if results.length > 0}
				<ul class="space-y-4">
					{#each results as result, index}
						<li>
							<button
								onclick={() => handleResultClick(result.slug)}
								class="text-left w-full p-2 rounded hover:bg-base-200 transition-colors duration-200"
								class:bg-base-200={index === selectedIndex}
							>
								<h3 class="text-lg font-semibold text-base-content">
									{@html highlightMatch(result.title, searchTerm)}
								</h3>
								<p class="text-sm text-base-content/70">
									{@html highlightMatch(result.description, searchTerm)}
								</p>
							</button>
						</li>
					{/each}
				</ul>
			{:else if searchTerm}
				<p class="text-center text-base-content/70 py-4">No results found</p>
			{/if}
		</div>
	</div>
	<button
		onclick={onClose}
		class="absolute top-4 right-4 text-base-content hover:text-primary transition-colors duration-200"
	>
		<IconX class="w-6 h-6" />
	</button>
</div>
