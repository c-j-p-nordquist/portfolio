<script>
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import { formatDate } from '$lib/utils/formatDate';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import { projects } from '$lib/data/projectData.js';

	let { featuredPosts = [] } = $props();

	let featuredProjects = $derived(projects.filter((p) => p.featured).slice(0, 3));

	let allFeaturedItems = $derived([...featuredProjects, ...featuredPosts]);
</script>

<div class="container mx-auto px-4 py-16">
	<section id="featured-insights">
		<h2 class="text-4xl font-bold mb-12 text-center font-serif">Featured Insights</h2>
		{#if allFeaturedItems.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each allFeaturedItems as item}
					<div
						class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full"
					>
						<figure class="aspect-video">
							<LazyImage
								src={item.imageUrl || '/images/placeholder.jpg'}
								alt={item.title}
								class="object-cover w-full h-full"
							/>
						</figure>
						<div class="card-body flex flex-col justify-between">
							<div>
								<h3 class="card-title font-serif text-xl mb-2">
									<a
										href={item.slug ? `/blog/${item.slug}` : `/projects/${item.id}`}
										class="hover:text-primary transition-colors duration-200"
									>
										{item.title}
									</a>
								</h3>
								{#if item.date}
									<p class="text-sm text-base-content text-opacity-70 mb-3 flex items-center">
										<IconCalendar class="inline-block mr-2" />
										{formatDate(item.date)}
									</p>
								{/if}
								<p class="mb-4 font-sans text-base-content text-opacity-80 line-clamp-3">
									{item.description || item.summary}
								</p>
							</div>
							<div class="card-actions flex flex-wrap gap-2 mt-auto">
								{#each item.topics || item.tags || [] as tag}
									<span class="badge badge-primary badge-outline text-xs py-3 px-3">
										<IconTag class="inline-block mr-1" />
										{tag}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-xl">No featured items to display at the moment.</p>
		{/if}
		<div class="text-center mt-16">
			<a href="/blog" class="btn btn-primary mr-4">Explore All Posts</a>
			<a href="/projects" class="btn btn-primary">View All Projects</a>
		</div>
	</section>
</div>
