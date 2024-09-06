<script>
	import { fly, fade } from 'svelte/transition';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
		script.async = true;
		document.body.appendChild(script);
	});
</script>

<svelte:head>
	<title>About Philip Nordquist - DevSecOps Engineer & Consultant</title>
	<meta
		name="description"
		content="Learn about Philip Nordquist's experience in DevSecOps, cloud architecture, and IT infrastructure management. Founder of CJP IT Consulting AB."
	/>
</svelte:head>

<div class="bg-background dark:bg-darkBackground text-text dark:text-darkText">
	<div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
		<div
			in:fly={{ y: 50, duration: 500 }}
			class="flex flex-col md:flex-row items-center md:items-start mb-16"
		>
			<img
				src="/images/portrait.webp"
				alt="Philip Nordquist"
				class="w-48 h-48 rounded-full object-cover mb-6 md:mb-0 md:mr-8 shadow-lg"
			/>
			<div class="text-center md:text-left">
				<h1 class="text-4xl sm:text-5xl font-serif font-bold mb-4 text-primary dark:text-darkText">
					Philip Nordquist
				</h1>
				<p class="text-xl mb-4 text-subtitleText dark:text-darkSubtitleText">
					DevSecOps Engineer & Founder of CJP IT Consulting AB
				</p>
				<SocialLinks size="lg" />
			</div>
		</div>

		<section class="mb-16">
			<h2 class="text-3xl font-serif font-semibold mb-6 text-primary dark:text-darkText">
				About Me
			</h2>
			<p class="mb-4 text-lg">
				With over a decade of experience in designing and implementing secure, scalable IT
				infrastructures, I specialize in cloud platforms, infrastructure as code, and embedding
				security-by-design principles into every stage of development.
			</p>
			<p class="text-lg">
				My expertise spans across AWS, GCP, Azure, Kubernetes, Terraform, and various programming
				languages including Python and Go. I'm passionate about delivering high-performance systems
				through GitOps, observability best practices, and automation.
			</p>
		</section>

		<section id="certification" class="mb-16">
			<h2 class="text-3xl font-serif font-semibold mb-6 text-primary dark:text-darkText">
				Certifications
			</h2>
			<div
				class="flex flex-col sm:flex-row items-center sm:items-start bg-white/10 dark:bg-darkBackground/30 p-6 rounded-lg shadow-lg"
			>
				<div
					data-iframe-width="150"
					data-iframe-height="270"
					data-share-badge-id="734c3bb0-b876-4220-ac99-2f7b441c42e6"
					data-share-badge-host="https://www.credly.com"
				></div>
				<div class="mt-4 sm:mt-0 sm:ml-8">
					<h3 class="text-2xl font-semibold mb-2 text-primary dark:text-darkText">
						AWS Certified Solutions Architect
					</h3>
					<p class="text-subtitleText dark:text-darkSubtitleText">
						This certification validates my expertise in designing and deploying scalable, highly
						available, and fault-tolerant systems on AWS. It demonstrates my ability to define
						solutions using architectural design principles based on customer requirements.
					</p>
				</div>
			</div>
		</section>

		<section class="mb-16">
			<h2 class="text-3xl font-serif font-semibold mb-6 text-primary dark:text-darkText">
				CJP IT Consulting AB
			</h2>
			<p class="mb-4 text-lg">
				Founded in 2023, CJP IT Consulting AB (Org. number: 559387-5247) is my vehicle for providing
				top-tier DevSecOps and cloud architecture consulting services. As the sole consultant, I
				offer professional services with the backing of a registered Swedish company.
			</p>
		</section>
	</div>
</div>
