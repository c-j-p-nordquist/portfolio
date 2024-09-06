<script>
	let { service, observed } = $props();
</script>

<div
	class="group flex flex-col h-full p-6 bg-transparent backdrop-blur-sm rounded-lg transition-all duration-300 hover:-translate-y-1"
>
	<div class="mb-4">
		<service.icon
			class="w-12 h-12 transition-colors duration-300 group-hover:text-secondary {observed
				? 'text-secondary md:text-primary/30 dark:md:text-darkText/30'
				: 'text-primary/30 dark:text-darkText/30'}"
		/>
	</div>
	<h3 class="text-xl font-bold mb-3 font-serif text-primary dark:text-darkText">{service.title}</h3>
	<p class="text-subtitleText dark:text-darkSubtitleText flex-grow font-sans">
		{service.description}
	</p>
</div>
