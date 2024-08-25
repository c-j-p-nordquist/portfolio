<script>
	import { onMount } from 'svelte';
	import IconList from '~icons/lucide/list';
	import IconX from '~icons/lucide/x';
	import IconArrowUp from '~icons/lucide/arrow-up';

	let headings = $state([]);
	let activeId = $state('');
	let isOpen = $state(false);
	let showScrollButton = $state(false);
	let readingProgress = $state(0);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '-100px 0px -66%' }
		);

		const observeHeadings = () => {
			headings = Array.from(document.querySelectorAll('h2, h3, h4')).map((heading) => ({
				id: heading.id,
				text: heading.textContent,
				level: parseInt(heading.tagName.charAt(1))
			}));
			headings.forEach((heading) => {
				const element = document.getElementById(heading.id);
				if (element) observer.observe(element);
			});
		};

		observeHeadings();

		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - document.documentElement.clientHeight;
			readingProgress = (scrollTop / docHeight) * 100;
			showScrollButton = scrollTop > 300;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function scrollToHeading(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			isOpen = false;
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="fixed top-[5rem] left-0 w-full h-1 bg-transparent z-40">
	<div
		class="h-full bg-accent transition-all duration-300 ease-out"
		style="width: {readingProgress}%"
	></div>
</div>

<div class="fixed bottom-4 right-4 flex flex-col items-end space-y-2 z-40">
	{#if showScrollButton && !isOpen}
		<button
			onclick={scrollToTop}
			class="p-2 bg-background text-text rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200"
			aria-label="Scroll to top"
		>
			<IconArrowUp class="w-6 h-6" />
		</button>
	{/if}
	<button
		class="p-2 bg-background text-text rounded-full shadow-md hover:bg-gray-800 transition-colors duration-200"
		onclick={toggleOpen}
		aria-label="Toggle Table of Contents"
		aria-expanded={isOpen}
	>
		{#if isOpen}
			<IconX class="w-6 h-6" />
		{:else}
			<IconList class="w-6 h-6" />
		{/if}
	</button>
	{#if isOpen}
		<div
			class="bg-background text-text shadow-xl rounded-lg w-64 max-h-[80vh] overflow-y-auto fixed bottom-20 right-4 sm:bottom-auto sm:top-24 sm:right-4"
		>
			<div class="p-4">
				<h2 class="text-xl font-bold mb-4">Table of Contents</h2>
				<div class="space-y-1">
					{#each headings as heading}
						<button
							onclick={() => scrollToHeading(heading.id)}
							class="w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 {activeId ===
							heading.id
								? 'bg-accent/10 text-accent'
								: 'text-text hover:bg-gray-800'}"
							style="padding-left: {(heading.level - 2) * 16 + 12}px"
						>
							{heading.text}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	.bg-accent {
		animation: pulse 2s ease-in-out infinite;
	}
</style>
