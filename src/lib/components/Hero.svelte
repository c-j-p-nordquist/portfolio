<script>
	import IconChevronDown from '~icons/lucide/chevron-down';
	import DotPattern from './DotPattern.svelte';
	import TechIcons from './TechIcons.svelte';
	import TypewriterEffect from './TypewriterEffect.svelte';

	let { dispatch } = $props();
	let visible = $state(false);
	let showSecondLine = $state(false);

	$effect(() => {
		visible = true;
	});

	function onFirstLineComplete() {
		setTimeout(() => {
			showSecondLine = true;
		}, 500);
	}
</script>

<div
	class="relative bg-gradient-to-br from-base-100 to-base-200 overflow-hidden min-h-screen flex items-center"
>
	<DotPattern
		width={20}
		height={20}
		cx={10}
		cy={10}
		cr={1.5}
		fillColor="currentColor"
		class="text-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]"
	/>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
		<div class="flex flex-col lg:flex-row items-center justify-between">
			<div class="w-full lg:w-1/2 lg:pr-8">
				<div class="h-24 sm:h-28 md:h-32 lg:h-40 relative mb-4">
					<h1
						class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-base-content absolute top-0 left-0 leading-none"
					>
						<span class="text-primary">
							<TypewriterEffect text="Hello," onComplete={onFirstLineComplete} />
						</span>
					</h1>
					{#if showSecondLine}
						<h1
							class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-base-content absolute top-1/2 left-0 leading-none"
						>
							<TypewriterEffect text="I'm Philip." />
						</h1>
					{/if}
				</div>
				{#if visible}
					<p
						class="mt-2 text-base sm:text-lg md:text-xl text-base-content/70 font-light max-w-2xl transition-opacity duration-1000 ease-in-out delay-500 opacity-0 animate-fade-in"
					>
						I specialize in transforming complex infrastructure challenges into efficient, scalable
						solutions.
					</p>
					<div
						class="mt-8 flex flex-row gap-4 transition-opacity duration-1000 ease-in-out delay-1000 opacity-0 animate-fade-in"
					>
						<button
							class="px-6 py-2 text-base font-semibold rounded-md text-base-100 bg-accent hover:bg-accent/90 transition-colors duration-200"
							onclick={() => dispatch.scrollToContent()}
						>
							Explore My Work
						</button>
						<a
							href="/about"
							class="px-6 py-2 text-base font-semibold rounded-md text-primary bg-base-200 hover:bg-base-300 transition-colors duration-200"
						>
							About Me
						</a>
					</div>
				{/if}
			</div>
			<div
				class="w-full lg:w-1/2 mt-12 lg:mt-0 transition-opacity duration-1000 ease-in-out delay-1500 opacity-0 animate-fade-in"
			>
				<TechIcons />
			</div>
		</div>
	</div>
	<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 animate-bounce">
		<IconChevronDown class="w-8 h-8 text-primary/70" />
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in {
		animation: fadeIn 1s forwards;
	}
</style>
