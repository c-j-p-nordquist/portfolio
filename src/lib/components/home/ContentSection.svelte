<script>
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import Button from '$lib/components/Button.svelte';

	let { section, index } = $props();
</script>

<IntersectionObserver
	animation="slide-in-bottom 0.5s ease-out"
	animation_out="slide-out-bottom 0.5s ease-in"
	once={false}
	top={100}
	bottom={100}
>
	<section class="py-32 relative overflow-hidden bg-background dark:bg-darkBackground">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div
				class="flex flex-col md:flex-row items-center {index % 2 !== 0
					? 'md:flex-row-reverse'
					: ''} gap-16"
			>
				<div class="md:w-1/2">
					<h2
						class="text-4xl md:text-5xl font-bold mb-6 font-serif text-text dark:text-darkText leading-tight"
					>
						{section.title}
					</h2>
					<h3 class="text-lg mb-8 text-text dark:text-darkText leading-relaxed">
						{section.subtitle}
					</h3>
					{#if Array.isArray(section.content)}
						<ul class="mb-8 space-y-4 text-md text-text dark:text-darkText">
							{#each section.content as item}
								<li class="flex items-start">
									<span class="text-indigo-600 mr-3">•</span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="mb-8 text-md text-text dark:text-darkText leading-relaxed">
							{section.content}
						</p>
					{/if}
					<Button variant="primary" animate={true}>{section.ctaText}</Button>
				</div>
				<div class="md:w-1/2">
					<div
						class="w-full aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl shadow-lg flex items-center justify-center"
					>
						<span class="text-6xl text-indigo-600">{index + 1}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</IntersectionObserver>
