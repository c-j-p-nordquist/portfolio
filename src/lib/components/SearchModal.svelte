<script>
	import { goto } from '$app/navigation';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';
	import { onMount } from 'svelte';

	let { posts, onClose } = $props();
	let searchTerm = $state('');
	let results = $derived(searchTerm ? searchPostsIndex(searchTerm) : []);
	let inputRef;

	$effect(() => {
		if (!isIndexCreated()) {
			createPostsIndex(posts);
		}
	});

	onMount(() => {
		inputRef?.focus();
	});

	function handleResultClick(slug) {
		goto(`/posts/${slug}`);
		onClose();
	}
</script>

<div class="fixed inset-0 bg-primary bg-opacity-90 z-50 flex items-center justify-center p-4">
	<div class="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
		<input
			bind:this={inputRef}
			type="text"
			placeholder="Search..."
			class="w-full p-4 text-lg text-primary placeholder-secondary border-b border-secondary focus:outline-none"
			bind:value={searchTerm}
		/>
		<div class="max-h-[60vh] overflow-y-auto p-4">
			{#if results.length > 0}
				<ul class="space-y-4">
					{#each results as result}
						<li>
							<button onclick={() => handleResultClick(result.slug)} class="text-left w-full">
								<h3 class="text-lg font-semibold text-primary">{@html result.title}</h3>
								<p class="text-sm text-secondary">{@html result.description}</p>
							</button>
						</li>
					{/each}
				</ul>
			{:else if searchTerm}
				<p class="text-center text-secondary py-4">No results found</p>
			{/if}
		</div>
	</div>
	<button
		onclick={onClose}
		class="absolute top-4 right-4 text-white hover:text-accent transition-colors duration-200"
	>
		Close
	</button>
</div>
