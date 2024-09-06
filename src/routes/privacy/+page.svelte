<script>
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Privacy Policy - CJP IT Consulting AB</title>
	<meta
		name="description"
		content="Privacy policy for CJP IT Consulting AB, outlining our practices regarding information on our website."
	/>
</svelte:head>

<div class="bg-background dark:bg-darkBackground text-text dark:text-darkText">
	<div in:fly={{ y: 50, duration: 500 }} class="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl sm:text-5xl font-serif font-bold mb-8 text-primary dark:text-darkText">
			Privacy Policy
		</h1>
		<div class="space-y-8 text-lg">
			<p class="text-subtitleText dark:text-darkSubtitleText">
				At CJP IT Consulting AB, we respect your privacy. This policy outlines our practices
				regarding information on our website.
			</p>
			<section>
				<h2 class="text-2xl font-serif font-semibold mb-4 text-primary dark:text-darkText">
					Information Collection
				</h2>
				<p class="text-subtitleText dark:text-darkSubtitleText">
					We do not collect personal data through our website. We do not use cookies or any tracking
					technologies.
				</p>
			</section>
			<section>
				<h2 class="text-2xl font-serif font-semibold mb-4 text-primary dark:text-darkText">
					Contact
				</h2>
				<p class="text-subtitleText dark:text-darkSubtitleText">
					If you have any questions about this policy, please contact us at <span class="font-bold"
						>privacy@nordquist.me</span
					>
				</p>
			</section>
		</div>
	</div>
</div>
