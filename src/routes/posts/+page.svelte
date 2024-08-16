<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props();
	let activeTab = $state('all');
	let mounted = $state(false);

	let filteredProjects = $derived.by(() => {
		if (activeTab === 'all') return data.posts;
		return data.posts.filter((post) => post.type === activeTab);
	});

	function setActiveTab(tab) {
		activeTab = tab;
	}

	$effect(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Philip Nordquist - Projects & Articles</title>
</svelte:head>

<main
	class="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-24 px-4 sm:px-6 lg:px-8"
>
	<div class="max-w-5xl mx-auto">
		<h1
			class="text-5xl md:text-6xl font-serif font-bold mb-16 text-center"
			in:fly={{ y: -20, duration: 500, delay: 100, easing: cubicOut }}
		>
			Projects & Articles
		</h1>

		<div
			class="flex justify-center mb-20"
			in:fly={{ y: -15, duration: 500, delay: 200, easing: cubicOut }}
		>
			<div class="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 p-1">
				{#each ['all', 'project', 'blog'] as tab}
					<button
						type="button"
						class="px-8 py-4 rounded-full text-base font-sans font-normal transition-all duration-200 {activeTab ===
						tab
							? 'bg-white dark:bg-gray-700 shadow-md'
							: 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
						onclick={() => setActiveTab(tab)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				{/each}
			</div>
		</div>

		{#if mounted}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
				{#each filteredProjects as project, index}
					<div in:fly={{ y: 20, duration: 400, delay: 100 * index, easing: cubicOut }}>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{/if}

		{#if filteredProjects.length === 0}
			<p
				class="text-center text-gray-600 dark:text-gray-400 mt-12 font-sans font-light"
				in:fade={{ duration: 300 }}
			>
				No items found in this category.
			</p>
		{/if}
	</div>
</main>
