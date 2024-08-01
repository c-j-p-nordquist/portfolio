<script>
	import { fly, scale } from 'svelte/transition';
	import IconUser from '~icons/lucide/user';
	import IconBook from '~icons/lucide/book';

	let { subtitle, title } = $props();
	let typedText = $state('');
	let currentIndex = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			if (currentIndex < title.length) {
				typedText += title[currentIndex];
				currentIndex++;
			} else {
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	});
</script>

<div class="text-center max-w-4xl mx-auto relative">
	<div class="mb-8">
		<h2
			class="text-xl sm:text-2xl md:text-3xl font-light mb-4 text-primary-200"
			in:fly={{ y: 20, duration: 1000, delay: 300 }}
		>
			DevSecOps Engineer @Stim
		</h2>
		<h1
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 leading-tight relative"
		>
			<span class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
				{typedText}<span class="animate-pulse">|</span>
			</span>
			<span class="opacity-0">{title}</span>
		</h1>
		<p
			class="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-primary-100"
			in:fly={{ y: 20, duration: 1000, delay: 700 }}
		>
			{subtitle}
		</p>
	</div>
	<div
		class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
		in:scale={{ duration: 1000, delay: 900 }}
	>
		<a href="/posts" class="btn btn-primary btn-lg group overflow-hidden relative">
			<span class="relative z-10">Explore My Work</span>
			<span
				class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
			></span>
			<IconBook class="w-5 h-5 ml-2 relative z-10" />
		</a>
		<a
			href="/about"
			class="btn btn-outline btn-lg group overflow-hidden relative text-white border-white hover:border-primary-300"
		>
			<span class="relative z-10">About Me</span>
			<span
				class="absolute inset-0 bg-primary-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
			></span>
			<IconUser class="w-5 h-5 ml-2 relative z-10" />
		</a>
	</div>
</div>
