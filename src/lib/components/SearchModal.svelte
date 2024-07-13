<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createPostsIndex, searchPostsIndex, isIndexCreated } from '$lib/utils/search';

	let { onClose } = $props();
	let searchTerm = $state('');
	let results = $state([]);
	let isIndexReady = $state(false);
	let dialogRef = $state(null);
	let inputRef = $state(null);

	onMount(async () => {
		if (!isIndexCreated()) {
			const response = await fetch('/api/search');
			const posts = await response.json();
			createPostsIndex(posts);
		}
		isIndexReady = true;
		if (dialogRef) {
			dialogRef.showModal();
		}
	});

	$effect(() => {
		if (dialogRef && dialogRef.open) {
			inputRef.focus();
		}
	});

	$effect(() => {
		if (isIndexReady && searchTerm) {
			results = searchPostsIndex(searchTerm);
		} else {
			results = [];
		}
	});

	function handleResultClick(slug) {
		goto(`/blog/${slug}`);
		closeModal();
	}

	function closeModal() {
		if (dialogRef) {
			dialogRef.close();
		}
		onClose();
	}
</script>

<dialog bind:this={dialogRef} class="modal" onclose={closeModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold mb-4">Search</h3>
		<input
			type="text"
			placeholder="Search..."
			class="input input-bordered w-full mb-4"
			bind:value={searchTerm}
			bind:this={inputRef}
			aria-label="Search input"
		/>

		{#if !isIndexReady}
			<div class="text-center py-4" role="status">Loading search index...</div>
		{:else if results.length > 0}
			<ul class="space-y-2 max-h-96 overflow-y-auto" role="listbox">
				{#each results as result}
					<li role="option">
						<button
							onclick={() => handleResultClick(result.slug)}
							class="block w-full text-left p-2 hover:bg-base-200 rounded"
						>
							<div class="font-semibold">{@html result.title}</div>
							<div class="text-sm mt-1">{@html result.content[0]}</div>
						</button>
					</li>
				{/each}
			</ul>
		{:else if searchTerm}
			<div class="text-center py-4" role="status">No results found</div>
		{/if}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
