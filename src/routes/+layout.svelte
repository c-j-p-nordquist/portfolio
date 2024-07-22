<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import Nav from '$lib/components/Nav.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import '../app.css';

	let { data, children } = $props();

	let isNavVisible = $state(true);
	let lastScrollTop = $state(0);

	function handleInternalNavigation(event) {
		const target = event.target.closest('a');
		if (target && target.hostname === window.location.hostname) {
			const targetId = target.getAttribute('href').split('#')[1];
			if (targetId) {
				event.preventDefault();
				const element = document.getElementById(targetId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
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
			document.body.addEventListener('click', handleInternalNavigation);

			return () => {
				window.removeEventListener('scroll', handleScroll, false);
				document.body.removeEventListener('click', handleInternalNavigation);
			};
		}
	});
</script>

<div class="min-h-screen bg-base-100 flex flex-col">
	<Nav {isNavVisible} {data} />

	<main id="main-content" class="flex-grow pt-16 z-20">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 150, delay: 150 }}>
				{@render children()}
			</div>
		{/key}
	</main>

	<ScrollToTop />
</div>
