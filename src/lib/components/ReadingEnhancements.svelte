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

<div class="fixed top-0 left-0 w-full bg-gray-200 z-50">
	<div
		class="h-full bg-blue-500 transition-all duration-300 ease-out"
		style="width: {readingProgress}%"
	></div>
</div>

<div class="fixed bottom-4 right-4 flex flex-col items-end space-y-2 z-40">
	{#if showScrollButton && !isOpen}
		<button
			onclick={scrollToTop}
			class="p-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
			aria-label="Scroll to top"
		>
			<IconArrowUp class="w-5 h-5" />
		</button>
	{/if}
	<button
		class="p-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
		onclick={toggleOpen}
		aria-label="Toggle Table of Contents"
	>
		{#if isOpen}
			<IconX class="w-5 h-5" />
		{:else}
			<IconList class="w-5 h-5" />
		{/if}
	</button>
	{#if isOpen}
		<div
			class="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64 max-h-[80vh] overflow-y-auto"
		>
			<h2 class="text-xl font-semibold mb-4 text-gray-800">Table of Contents</h2>
			<div class="space-y-1">
				{#each headings as heading}
					<button
						onclick={() => scrollToHeading(heading.id)}
						class="w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 {activeId ===
						heading.id
							? 'bg-blue-100 text-blue-800'
							: 'text-gray-600 hover:bg-gray-100'}"
						style="padding-left: {(heading.level - 2) * 16 + 12}px"
					>
						{heading.text}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
