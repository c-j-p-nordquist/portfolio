<script>
	import { fade } from 'svelte/transition';
	import IconMail from '~icons/lucide/mail';
	import IconLinkedin from '~icons/lucide/linkedin';
	import IconGithub from '~icons/lucide/github';

	let visible = $state(false);

	$effect(() => {
		document.title = 'Contact - Philip Nordquist';
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center">Contact Me</h1>

			<div class="card bg-base-200 max-w-md mx-auto">
				<div class="card-body">
					<h2 class="card-title text-2xl mb-4">Get in Touch</h2>
					<p class="mb-6">Feel free to reach out to me through any of the following methods:</p>
					<div class="flex flex-col space-y-4">
						<a href="mailto:philip@nordquist.me" class="btn btn-primary">
							<IconMail class="w-5 h-5 mr-2" />
							philip@nordquist.me
						</a>
						<a
							href="https://www.linkedin.com/in/philipnordquist/"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-secondary"
						>
							<IconLinkedin class="w-5 h-5 mr-2" />
							Connect on LinkedIn
						</a>
						<a
							href="https://github.com/philipnordquist"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-accent"
						>
							<IconGithub class="w-5 h-5 mr-2" />
							Follow on GitHub
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
