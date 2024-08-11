<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
	let activeTab = $state('all');

	let filteredPosts = $derived.by(() => {
		if (activeTab === 'all') return data.posts;
		return data.posts.filter((post) => post.type === activeTab);
	});

	function setActiveTab(tab) {
		activeTab = tab;
	}
</script>

<svelte:head>
	<title>Philip Nordquist - Projects & Articles</title>
</svelte:head>

<main class="min-h-screen w-full bg-[#0c0f1a] text-white relative">
	<div class="absolute inset-0 z-0 opacity-5 mix-blend-overlay">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<filter id="noiseFilter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.65"
					numOctaves="3"
					stitchTiles="stitch"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#noiseFilter)" />
		</svg>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<h1
			class="text-6xl sm:text-7xl font-display mb-12 tracking-tighter text-center"
			in:fly={{ y: -50, duration: 1000, delay: 300, easing: cubicOut }}
		>
			Projects <span class="text-blue-400 font-black italic">&</span> Articles
		</h1>

		<div class="flex justify-center mb-12" in:fade={{ duration: 1000, delay: 600 }}>
			<div class="inline-flex rounded-md shadow-lg overflow-hidden" role="tablist">
				{#each ['all', 'project', 'blog'] as tab}
					<button
						type="button"
						role="tab"
						aria-selected={activeTab === tab}
						class="px-6 py-3 text-sm font-medium {activeTab === tab
							? 'bg-blue-500 text-white'
							: 'bg-[#1c2028] text-gray-300 hover:bg-[#2a3349] hover:text-white'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0c0f1a] focus:ring-blue-500 transition-all duration-200"
						onclick={() => setActiveTab(tab)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredPosts as post, index}
				<div
					in:fly={{ y: 20, duration: 500, delay: 100 * index, easing: cubicOut }}
					out:fade={{ duration: 300 }}
				>
					<PostCard {post} />
				</div>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<p class="text-center text-gray-400 mt-12 font-sans" in:fade={{ duration: 500, delay: 300 }}>
				No posts found in this category.
			</p>
		{/if}
	</div>
</main>
