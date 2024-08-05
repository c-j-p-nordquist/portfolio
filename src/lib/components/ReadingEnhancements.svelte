<script>
	import { onMount } from 'svelte';
	import IconList from '~icons/lucide/list';
	import IconX from '~icons/lucide/x';
	import IconArrowUp from '~icons/lucide/arrow-up';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import IconChevronDown from '~icons/lucide/chevron-down';

	let headings = $state([]);
	let activeId = $state('');
	let isOpen = $state(false);
	let showScrollButton = $state(false);
	let readingProgress = $state(0);

	function populateHeadings() {
		const contentElement = document.querySelector('.prose');
		if (contentElement) {
			headings = Array.from(contentElement.querySelectorAll('h2, h3, h4')).map((heading) => ({
				id: heading.id,
				text: heading.textContent,
				level: parseInt(heading.tagName.charAt(1))
			}));
		}
	}

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

		populateHeadings();

		const observeHeadings = () => {
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

		const contentObserver = new MutationObserver(() => {
			headings = [];
			populateHeadings();
			observeHeadings();
		});

		contentObserver.observe(document.body, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			contentObserver.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function scrollToHeading(id, event) {
		event.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			isOpen = false;
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		window.dispatchEvent(new CustomEvent('showNavbar'));
	}
</script>

{#snippet progressBar()}
	<div class="fixed top-0 left-0 w-full h-1 bg-base-300 z-50">
		<div
			class="h-full bg-primary transition-all duration-300 ease-out"
			style="width: {readingProgress}%"
		></div>
	</div>
{/snippet}

{#snippet tableOfContents()}
	<div class="bg-base-200 rounded-lg shadow-lg p-4 w-64 md:w-80 max-h-[80vh] overflow-y-auto">
		<h2 class="text-xl font-bold mb-4 text-base-content">Table of Contents</h2>
		<div class="space-y-1">
			{#each headings as heading}
				<button
					onclick={(event) => scrollToHeading(heading.id, event)}
					class="w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-between"
					class:bg-base-300={activeId === heading.id}
					style="padding-left: {(heading.level - 2) * 16 + 12}px"
				>
					<span class="text-sm">{heading.text}</span>
					{#if activeId === heading.id}
						<IconChevronDown class="w-4 h-4 text-primary" />
					{:else}
						<IconChevronRight class="w-4 h-4" />
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet floatingActionButtons()}
	<div class="fixed bottom-4 right-4 flex flex-col items-end space-y-2 z-40">
		{#if showScrollButton && !isOpen}
			<button onclick={scrollToTop} class="btn btn-circle btn-primary" aria-label="Scroll to top">
				<IconArrowUp />
			</button>
		{/if}
		<button
			class="btn btn-circle btn-primary"
			onclick={toggleOpen}
			aria-label="Toggle Table of Contents"
		>
			{#if isOpen}
				<IconX />
			{:else}
				<IconList />
			{/if}
		</button>
		{#if isOpen}
			<div class="absolute bottom-16 right-0">
				{@render tableOfContents()}
			</div>
		{/if}
	</div>
{/snippet}

{@render progressBar()}
{@render floatingActionButtons()}
