<script>
	import { page } from '$app/stores';
	import IconSearch from '~icons/lucide/search';
	import NavItems from './NavItems.svelte';
	import SearchModal from './SearchModal.svelte';

	let { data } = $props();

	let currentPath = $derived($page.url.pathname);
	let showSearchModal = $state(false);

	function toggleSearchModal() {
		showSearchModal = !showSearchModal;
	}
</script>

<nav class="bg-base-100 shadow-sm">
	<div class="container mx-auto px-4 py-3 flex justify-between items-center">
		<a href="/" class="text-2xl font-serif font-bold text-primary">PN</a>

		<NavItems {currentPath} {data} />

		<button
			class="text-primary hover:text-secondary transition-colors duration-200"
			onclick={toggleSearchModal}
			aria-label="Open search"
		>
			<IconSearch class="h-5 w-5" />
		</button>
	</div>
</nav>

{#if showSearchModal}
	<SearchModal onClose={toggleSearchModal} />
{/if}
