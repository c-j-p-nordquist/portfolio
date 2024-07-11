<script>
	import { onMount } from 'svelte';
	import IconArrowUp from '~icons/lucide/arrow-up';

	let showButton = $state(false);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		const handleScroll = () => {
			showButton = window.pageYOffset > 300;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if showButton}
	<button
		onclick={scrollToTop}
		class="btn btn-circle btn-primary fixed bottom-4 right-4 z-50 opacity-70 hover:opacity-100 transition-opacity duration-300"
		aria-label="Scroll to top"
	>
		<IconArrowUp />
	</button>
{/if}
