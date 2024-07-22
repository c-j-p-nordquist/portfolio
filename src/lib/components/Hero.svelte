<script>
	import IconChevronDown from '~icons/lucide/chevron-down';
	import DotPattern from './DotPattern.svelte';

	let { name, subtitle, dispatch } = $props();
</script>

<div class="relative bg-base-100 overflow-hidden min-h-screen flex items-center">
	<div class="absolute inset-0">
		<DotPattern
			width={20}
			height={20}
			cx={10}
			cy={10}
			cr={1.5}
			fillColor="currentColor"
			class="text-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]"
		/>
	</div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="sm:text-center lg:text-left">
			<h1
				class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-base-content"
			>
				<span class="block">{name}</span>
				<span class="block text-accent mt-2">{subtitle}</span>
			</h1>
			<p
				class="mt-3 text-base sm:text-lg md:text-xl text-base-content/70 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0"
			>
				Turning complicated problems into simple, effective solutions.
			</p>
			<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
				<div class="rounded-md shadow">
					<button
						class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-base-100 bg-accent hover:bg-accent/90 md:py-4 md:text-lg md:px-10"
						onclick={() => dispatch.scrollToContent()}
					>
						Explore My Work
					</button>
				</div>
				<div class="mt-3 sm:mt-0 sm:ml-3">
					<a
						href="/about"
						class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-base-200 hover:bg-base-300 md:py-4 md:text-lg md:px-10"
					>
						About Me
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 animate-bounce">
		<IconChevronDown class="w-8 h-8 text-accent/70" />
	</div>
</div>
