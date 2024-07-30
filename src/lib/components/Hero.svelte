<script>
	import IconUser from '~icons/lucide/user';
	import IconBook from '~icons/lucide/book';

	let { subtitle, title } = $props();
</script>

<div class="flex flex-col justify-center h-full">
	<h2 class="text-xl sm:text-2xl md:text-3xl font-sans mb-2 text-secondary">
		DevSecOps Engineer @Stim
	</h2>
	<h1
		class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 sm:mb-8 text-primary leading-tight"
	>
		{title}
	</h1>
	<p class="text-lg sm:text-xl md:text-2xl text-secondary mb-6 sm:mb-10 max-w-2xl">
		{subtitle}
	</p>
	<div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
		<a
			href="/posts"
			class="btn btn-accent flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
		>
			<IconBook class="w-5 h-5 mr-2" />
			View My Work
		</a>
		<a
			href="/about"
			class="btn btn-outline btn-primary flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-accent hover:text-neutral-content hover:border-neutral"
		>
			<IconUser class="w-5 h-5 mr-2" />
			About Me
		</a>
	</div>
</div>
