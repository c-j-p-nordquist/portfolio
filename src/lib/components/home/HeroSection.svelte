<script>
	import AnimatedBackground from '$lib/components/home/AnimatedBackground.svelte';
	import GradualSpacing from '$lib/components/home/GradualSpacing.svelte';
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import CurvedCanvas from '$lib/components/home/CurvedCanvas.svelte';
	import Button from '$lib/components/Button.svelte';

	let { heroContent } = $props();
	let animationComplete = $state(false);

	function handleTitleAnimationComplete() {
		animationComplete = true;
	}
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0">
		<AnimatedBackground
			colors={['#3B82F6', '#EC4899', '#10B981', '#F59E0B']}
			particleCount={20}
			speed={10}
			size={400}
		/>
	</div>

	<!-- Canvas rendering -->
	<CurvedCanvas />

	<IntersectionObserver animation="fade-in 0.5s ease-out" once={true}>
		<div class="text-center z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
			<h1 class="mb-8">
				<GradualSpacing
					text={heroContent.title}
					duration={600}
					delay={20}
					class="text-5xl md:text-6xl font-bold tracking-wide font-serif text-text dark:text-darkText leading-tight"
					onComplete={handleTitleAnimationComplete}
				/>
			</h1>

			<h2
				class="text-lg mb-12 text-text dark:text-darkText max-w-3xl mx-auto transition-opacity duration-500 ease-out {animationComplete
					? 'opacity-100'
					: 'opacity-0'}"
			>
				{heroContent.subtitle}
			</h2>

			<div
				class="transition-opacity duration-500 ease-out delay-150 {animationComplete
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<Button variant="hero" animate={true}>{heroContent.ctaText}</Button>
			</div>
		</div>
	</IntersectionObserver>
</section>
