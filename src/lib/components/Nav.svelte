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
	<div class="max-w-[640px] mx-auto px-6 h-[54px] flex items-center justify-between gap-4">
		<a
			href="/"
			class="text-sm font-medium tracking-[-0.02em] text-stone-900 dark:text-stone-100 transition-opacity duration-300 {scrolled
				? 'opacity-100'
				: 'opacity-0 pointer-events-none'}"
			aria-hidden={!scrolled}
			tabindex={scrolled ? undefined : -1}
		>
			<span class="sm:hidden" aria-hidden="true">PN</span>
			<span class="hidden sm:inline whitespace-nowrap">Philip Nordquist</span>
			<span class="sr-only sm:hidden">Philip Nordquist</span>
		</a>

		<div class="flex items-center gap-[18px]">
			<a
				href="/#experience"
				class="text-[13px] text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
			>
				Experience
			</a>
			<a
				href="/#education"
				class="text-[13px] text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
			>
				Education
			</a>
			<a
				href="/files/pn_resume_26.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="text-[13px] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-100/70 dark:hover:bg-stone-900/70 rounded-full px-3 py-[3px] transition-colors"
			>
				Resume
			</a>
		</div>
	</div>
</nav>

<style>
	nav {
		background-color: transparent;
		border-bottom: 1px solid transparent;
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
