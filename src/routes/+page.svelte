<script>
	import { heroContent, sections, callToActionContent } from '$lib/data/landingPageContent.js';
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
</script>

{#snippet button(ctaText)}
	<button
		class="px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 text-lg bg-darkBackground text-darkText dark:bg-background dark:text-text"
		aria-label="Click to {ctaText}"
	>
		{ctaText}
	</button>
{/snippet}

<div class="relative">
	{#snippet hero()}
		<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div class="absolute inset-0">
				<AnimatedBackground
					colors={['#3B82F6', '#EC4899', '#10B981', '#F59E0B']}
					particleCount={20}
					speed={10}
					size={400}
				/>
			</div>
			<IntersectionObserver animation="fade-in 1s ease-out" once={true}>
				<div class="text-center z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
					<h1
						class="text-5xl md:text-6xl font-thin mb-8 font-heading text-text dark:text-darkText leading-tight"
					>
						{heroContent.title}
					</h1>
					<h2 class="text-lg mb-12 text-text dark:text-darkText max-w-3xl mx-auto">
						{heroContent.subtitle}
					</h2>
					{@render button(heroContent.ctaText)}
				</div>
			</IntersectionObserver>
		</section>
	{/snippet}

	{#snippet contentSection(section, index)}
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
								class="text-4xl md:text-5xl font-thin mb-6 font-heading text-text dark:text-darkText leading-tight"
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
							{@render button(section.ctaText)}
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
	{/snippet}

	{#snippet cta()}
		<IntersectionObserver animation="fade-in 1s ease-out" once={true}>
			<section
				class="py-32 relative overflow-hidden flex items-center bg-gradient-to-br from-blue-600 to-purple-600"
			>
				<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<h2 class="text-5xl sm:text-6xl font-bold mb-6 font-heading leading-tight text-white">
						{callToActionContent.title}
					</h2>
					<p class="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
						{callToActionContent.subtitle}
					</p>
					<button
						class="px-8 py-4 rounded-none font-bold transition-all duration-300 transform hover:scale-105 text-xl bg-white text-blue-600 hover:bg-gray-100"
						aria-label="Click to {callToActionContent.ctaText}"
					>
						{callToActionContent.ctaText}
					</button>
				</div>
			</section>
		</IntersectionObserver>
	{/snippet}

	{@render hero()}

	{#each sections as section, index}
		{@render contentSection(section, index)}
	{/each}

	{@render cta()}
</div>
