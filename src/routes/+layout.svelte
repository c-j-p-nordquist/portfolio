<script>
	import { onMount } from 'svelte';
	import GridPattern from '$lib/components/GridPattern.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { cn } from '$lib/utils';
	import '../app.css';

	let { children } = $props();

	let y = $state(0);

	function handleScroll() {
		y = window.scrollY;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:window on:scroll={handleScroll} />

<div class="relative min-h-screen overflow-hidden bg-base-100">
	<div class="absolute inset-0 z-0" style="transform: translateY({y * 0.5}px);">
		<GridPattern
			width={60}
			height={60}
			squareCount={20}
			columns={30}
			rows={30}
			class={cn(
				'[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]',
				'absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-12'
			)}
			fillColor="currentColor"
			squareColor="rgba(156, 163, 175, 0.2)"
		/>
	</div>

	<div class="container mx-auto px-4 py-4 relative z-50">
		<div style="transform: translateY({y * 0.2}px);">
			<Nav />
		</div>
	</div>

	<div class="relative z-10 pt-16">
		{@render children()}
	</div>
</div>
