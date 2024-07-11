<script>
	import { fade } from 'svelte/transition';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Highlighter from '$lib/components/Highlighter.svelte';
	import { fuzzySearch } from '$lib/utils/fuzzySearch';

	let { data } = $props();
	let visible = $state(false);
	let searchResults = $state(data.posts.map((item) => ({ item, matches: [] })));
	let searchTerm = $state('');

	$effect(() => {
		document.title = 'Blog - Philip Nordquist';
		visible = true;
	});

	function handleSearch(term) {
		searchTerm = term;
		if (searchTerm) {
			searchResults = fuzzySearch(data.posts, searchTerm, ['title', 'excerpt', 'topics']);
		} else {
			searchResults = data.posts.map((item) => ({ item, matches: [] }));
		}
	}

	function getHighlightLine(matches, key, fullText = null) {
		const filtered = matches.filter((m) => m.key === key);
		if (key === 'topics') {
			return fullText.map((topic) => {
				const isMatch = searchTerm && topic.toLowerCase().includes(searchTerm.toLowerCase());
				return [{ text: topic, matches: isMatch, key }];
			});
		}
		if (filtered.length === 0 && fullText) {
			return [{ text: fullText, matches: false, key }];
		}
		return filtered;
	}
</script>

<main class="container mx-auto px-4 py-8 font-sans">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center font-mono">Blog</h1>

			<div class="mb-8">
				<SearchBar onSearch={handleSearch} />
			</div>

			<div class="space-y-8">
				{#each searchResults as { item: post, matches }}
					<article class="card bg-base-200 shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl font-mono">
								<a href={`/blog/${post.slug}`} class="hover:underline">
									<Highlighter line={getHighlightLine(matches, 'title', post.title)} />
								</a>
							</h2>
							<div class="flex items-center text-sm text-gray-500 mb-2">
								<IconCalendar class="w-4 h-4 mr-1" />
								<time datetime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
							</div>
							<p class="mb-4 font-sans">
								<Highlighter line={getHighlightLine(matches, 'excerpt', post.excerpt)} />
							</p>
							<div class="card-actions justify-end">
								{#each getHighlightLine(matches, 'topics', post.topics) as topicLine}
									<div class="badge badge-outline font-mono">
										<IconTag class="w-4 h-4 mr-1" />
										<Highlighter line={topicLine} />
									</div>
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}
</main>
