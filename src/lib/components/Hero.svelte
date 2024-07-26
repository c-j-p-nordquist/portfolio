<script>
	let { subtitle, description } = $props();
</script>

<div class="h-screen flex flex-col justify-center p-8">
	<h2 class="text-xl sm:text-2xl md:text-3xl font-sans mb-2 text-secondary">
		DevSecOps Engineer @Stim
	</h2>
	<h1
		class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-primary leading-tight"
	>
		Insights & Solutions for Modern IT Landscapes
	</h1>
	<nav class="flex flex-wrap gap-4 sm:gap-6">
		<a
			href="/about"
			class="text-base sm:text-lg font-semibold text-secondary hover:text-accent transition-colors duration-200"
			>About</a
		>
		<a
			href="/projects"
			class="text-base sm:text-lg font-semibold text-secondary hover:text-accent transition-colors duration-200"
			>Projects</a
		>
		<a
			href="/blog"
			class="text-base sm:text-lg font-semibold text-secondary hover:text-accent transition-colors duration-200"
			>Blog</a
		>
	</nav>
</div>
