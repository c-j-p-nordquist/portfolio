<script>
	import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
</script>

<svelte:head>
	<title>Work Experience - Philip Nordquist</title>
	<meta
		name="description"
		content="Explore Philip Nordquist's professional journey and work experience in DevSecOps, cloud architecture, and IT infrastructure management."
	/>
</svelte:head>

<section class="bg-background dark:bg-darkBackground text-text dark:text-darkText py-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h1
			class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center mb-8 text-primary dark:text-darkText"
		>
			Work Experience
		</h1>
		<p
			class="text-lg text-center max-w-3xl mx-auto mb-16 text-subtitleText dark:text-darkSubtitleText"
		>
			From DevSecOps engineering to IT infrastructure management, my career spans over a decade of
			driving digital transformation and operational excellence across diverse environments.
		</p>
		<ExperienceTimeline />
	</div>
</section>
