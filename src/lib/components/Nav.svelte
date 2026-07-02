<script>
	import { onMount } from 'svelte';

	let scrolled = $state(false);

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<nav
	class="sticky top-0 z-[100] transition-[background-color,border-color] duration-200 ease-out"
	class:scrolled
>
	<div class="max-w-[640px] mx-auto px-6 h-[54px] flex items-center">
		<a href="/" class="text-sm font-medium tracking-[-0.02em] text-stone-900 dark:text-stone-100">
			Philip Nordquist
		</a>
	</div>
</nav>

<style>
	nav {
		background-color: transparent;
		border-bottom: 1px solid transparent;
	}
	:global(.dark) nav,
	nav {
		/* default (top of page) */
	}
	nav.scrolled {
		background-color: rgb(250 250 249 / 0.93);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom-color: #e7e5e4;
	}
	@media (prefers-color-scheme: dark) {
		nav.scrolled {
			background-color: rgb(12 10 9 / 0.93);
			border-bottom-color: #292524;
		}
	}
</style>
