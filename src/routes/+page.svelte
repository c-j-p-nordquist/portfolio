<script>
	import Hero from '$lib/components/Hero.svelte';
	import IconCalendar from '~icons/lucide/calendar';
	import IconTag from '~icons/lucide/tag';
	import { formatDate } from '$lib/utils/formatDate';

	let { data } = $props();

	let name = $state('PHILIP NORDQUIST');
	let subtitle = $state('PERSONAL PORTFOLIO');

	let featuredPosts = $derived(data.featuredPosts || []);

	let pageTitle = $derived(`${name} - Tech Insights and Projects`);

	$effect(() => {
		document.title = pageTitle;
	});
</script>

<div class="flex flex-col min-h-screen">
	<Hero {name} {subtitle} />

	<main id="main-content" class="flex-grow bg-base-100">
		<div class="container mx-auto px-4 py-16">
			<section id="featured-insights" class="py-16">
				<h2 class="text-4xl font-bold mb-12 text-center font-serif">Featured Insights</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each featuredPosts as post}
						<div
							class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<div class="card-body flex flex-col justify-between">
								<div>
									<h3 class="card-title font-serif text-xl mb-2">
										<a
											href={`/blog/${post.slug}`}
											class="hover:text-primary transition-colors duration-200">{post.title}</a
										>
									</h3>
									<p class="text-sm text-base-content text-opacity-70 mb-3 flex items-center">
										<IconCalendar class="inline-block mr-2" />
										{formatDate(post.date)}
									</p>
									<p class="mb-4 font-sans text-base-content text-opacity-80">{post.description}</p>
								</div>
								<div class="card-actions flex flex-wrap gap-2 mt-auto">
									{#each post.topics as topic}
										<span class="badge badge-primary badge-outline text-xs py-3 px-3">
											<IconTag class="inline-block mr-1" />
											{topic}
										</span>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="text-center mt-16">
					<a href="/blog" class="btn btn-primary btn-wide">Explore All Posts</a>
				</div>
			</section>
		</div>
	</main>
</div>
