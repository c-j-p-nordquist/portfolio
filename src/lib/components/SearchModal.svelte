<script>
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';
	import IconSearch from '~icons/lucide/search';
	import IconX from '~icons/lucide/x';

	let { posts, onClose } = $props();
	let searchTerm = $state('');
	let results = $derived(searchTerm ? searchPostsIndex(searchTerm) : []);
	let inputRef;

	$effect(() => {
		if (!isIndexCreated()) {
			createPostsIndex(posts);
		}
	});

	$effect(() => {
		inputRef?.focus();

		const handleKeydown = (event) => {
			if (event.key === 'Escape') {
				onClose();
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
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	<div
		class="bg-base-100 dark:bg-secondary-800 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden"
		in:fly={{ y: -20, duration: 300 }}
		out:fly={{ y: 20, duration: 300 }}
	>
		<div class="relative">
			<IconSearch
				class="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-primary-300"
			/>
			<input
				bind:this={inputRef}
				type="text"
				placeholder="Search..."
				class="w-full p-4 pl-12 text-lg text-base-content placeholder-secondary-400 dark:placeholder-secondary-500 border-b border-secondary-200 dark:border-secondary-700 focus:outline-none bg-transparent"
				bind:value={searchTerm}
			/>
		</div>
		<div class="max-h-[60vh] overflow-y-auto p-4">
			{#if results.length > 0}
				<ul class="space-y-4">
					{#each results as result}
						<li>
							<button
								onclick={() => handleResultClick(result.slug)}
								class="text-left w-full p-2 rounded hover:bg-primary-100 transition-colors duration-200"
							>
								<h3 class="text-lg font-semibold text-base-content">
									{@html result.title}
								</h3>
								<p class="text-sm text-secondary-600 dark:text-secondary-400">
									{@html result.description}
								</p>
							</button>
						</li>
					{/each}
				</ul>
			{:else if searchTerm}
				<p class="text-center text-secondary-500 dark:text-secondary-400 py-4">No results found</p>
			{/if}
		</div>
	</div>
	<button
		onclick={onClose}
		class="absolute top-4 right-4 text-white hover:text-accent-300 transition-colors duration-200"
	>
		<IconX class="w-6 h-6" />
	</button>
</div>
