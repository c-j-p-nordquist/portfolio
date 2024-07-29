<script>
	import { page } from '$app/stores';
	import SearchModal from './SearchModal.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';

	let { posts } = $props();
	let showSearchModal = $state(false);

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
	}
</script>

<nav class="fixed top-0 left-0 right-0 bg-base-100 z-10">
	<div class="container px-4 py-4 flex justify-between items-center">
		<a href="/" class="text-2xl font-serif font-bold text-primary">Philip Nordquist</a>
		<div class="flex items-center space-x-4">
			<button
				class="text-secondary hover:text-primary transition-colors duration-200"
				onclick={toggleSearchModal}
				aria-label="Toggle search"
			>
				Search
			</button>
			<DarkModeToggle />
		</div>
	</div>
</nav>

{#if showSearchModal}
	<SearchModal {posts} onClose={toggleSearchModal} />
{/if}
