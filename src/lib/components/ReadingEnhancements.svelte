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

		// Re-populate headings and observe them when the content changes
		const contentObserver = new MutationObserver(() => {
			headings = []; // Clear existing headings
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
	<div class="reading-progress-container">
		<div class="reading-progress-bar" style="width: {readingProgress}%"></div>
	</div>
{/snippet}

{#snippet tableOfContents()}
	<div class="toc-content bg-base-200 rounded-lg shadow-md p-4">
		<h2 class="text-lg font-bold mb-2">Table of Contents</h2>
		<ul class="space-y-2">
			{#each headings as heading}
				<li style="margin-left: {(heading.level - 2) * 16}px">
					<a
						href="#{heading.id}"
						class="text-base-content hover:text-primary transition-colors duration-200"
						class:font-bold={activeId === heading.id}
						class:text-primary={activeId === heading.id}
						onclick={(event) => scrollToHeading(heading.id, event)}
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#snippet floatingActionButtons()}
	<div class="fab-container">
		{#if showScrollButton && !isOpen}
			<button
				onclick={scrollToTop}
				class="btn btn-circle btn-primary fab-button"
				aria-label="Scroll to top"
			>
				<IconArrowUp />
			</button>
		{/if}
		<button
			class="btn btn-circle btn-primary fab-button"
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
			{@render tableOfContents()}
		{/if}
	</div>
{/snippet}

{@render progressBar()}
{@render floatingActionButtons()}

<style>
	.reading-progress-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.reading-progress-bar {
		height: 100%;
		background-color: var(--primary);
		transition: width 0.3s ease;
	}

	.fab-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.fab-button {
		margin-top: 10px;
	}

	.toc-content {
		position: absolute;
		bottom: 60px;
		right: 0;
		width: 250px;
		max-height: 60vh;
		overflow-y: auto;
	}

	@media (min-width: 768px) {
		.toc-content {
			width: 300px;
		}
	}
</style>
