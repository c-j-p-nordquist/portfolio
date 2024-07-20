<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import '../app.css';

	let { children } = $props();

	let isHomePage = $derived($page.url.pathname === '/');
	let name = $state('PHILIP NORDQUIST');
	let subtitle = $state('PERSONAL PORTFOLIO');
	let isNavVisible = $state(true);
	let lastScrollTop = $state(0);

	function handleScrollToContent() {
		if (browser) {
			const contentSection = document.getElementById('main-content');
			if (contentSection) {
				contentSection.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	$effect(() => {
		if (browser) {
			const handleScroll = () => {
				const st = window.scrollY;
				if (st > lastScrollTop && st > 100) {
					isNavVisible = false;
				} else if (st < lastScrollTop) {
					isNavVisible = true;
				}
				lastScrollTop = st <= 0 ? 0 : st;
			};

			window.addEventListener('scroll', handleScroll, false);

			return () => {
				window.removeEventListener('scroll', handleScroll, false);
			};
		}
	});
</script>

<div class="min-h-screen bg-base-100 flex flex-col">
	<Nav {isNavVisible} />

	{#if isHomePage}
		<Hero {name} {subtitle} dispatch={{ scrollToContent: handleScrollToContent }} />
	{/if}

	<main id="main-content" class="flex-grow pt-16 z-20">
		{@render children()}
	</main>

	<ScrollToTop />
</div>
