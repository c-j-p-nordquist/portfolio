<script>
	let { subtitle } = $props();
</script>

<div class="relative bg-background text-text text-center overflow-visible py-16">
	<div class="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
		<div
			class="animate-float bg-gradient-to-r from-primary via-accent to-transparent opacity-30 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-2xl"
		></div>
	</div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 z-10 animate-fadeIn">
		<h1
			class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight"
		>
			Engineer with <span
				class="bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent"
				>a Decade of Expertise</span
			> in Secure, Scalable IT Infrastructures
		</h1>
		<p class="text-base sm:text-lg md:text-xl lg:text-2xl font-sans mb-8 max-w-2xl mx-auto">
			{subtitle}
		</p>
		<div
			class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
		>
			<a
				href="#featured-services"
				class="w-full sm:w-auto inline-block bg-accent text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 hover:bg-primary"
				>View My Work</a
			>
			<a
				href="/contact"
				class="w-full sm:w-auto inline-block border border-accent text-accent font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 hover:border-primary hover:text-primary"
				>Contact Me</a
			>
		</div>
	</div>
</div>

<style>
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
