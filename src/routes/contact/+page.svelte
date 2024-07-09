<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconMail from '~icons/lucide/mail';
	import IconLinkedin from '~icons/lucide/linkedin';
	import IconGithub from '~icons/lucide/github';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let visible = $state(false);

	function handleSubmit() {
		// Here you would typically send the form data to a server
		console.log('Form submitted', { name, email, message });
		alert('Thank you for your message! I will get back to you soon.');
		name = '';
		email = '';
		message = '';
	}

	onMount(() => {
		document.title = 'Contact - Philip Nordquist';
		visible = true;
	});
</script>

<main class="container mx-auto px-4 py-8">
	{#if visible}
		<div in:fade={{ duration: 1000 }}>
			<h1 class="text-4xl font-bold mb-8 text-center">Contact Me</h1>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="card bg-primary">
					<div class="card-body">
						<h2 class="card-title text-2xl mb-4">Get in Touch</h2>
						<p class="mb-4">Feel free to reach out to me through any of the following methods:</p>
						<div class="flex flex-col space-y-2">
							<a href="mailto:philip@nordquist.me" class="btn btn-outline btn-secondary">
								<IconMail class="w-5 h-5 mr-2" />
								philip@nordquist.me
							</a>
							<a
								href="https://www.linkedin.com/in/philipnordquist/"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-outline btn-secondary"
							>
								<IconLinkedin class="w-5 h-5 mr-2" />
								LinkedIn
							</a>
							<a
								href="https://github.com/philipnordquist"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-outline btn-secondary"
							>
								<IconGithub class="w-5 h-5 mr-2" />
								GitHub
							</a>
						</div>
					</div>
				</div>

				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title text-2xl mb-4">Send a Message</h2>
						<form on:submit|preventDefault={handleSubmit}>
							<div class="form-control">
								<label class="label" for="name">
									<span class="label-text">Name</span>
								</label>
								<input
									type="text"
									id="name"
									bind:value={name}
									placeholder="Your name"
									class="input input-bordered"
									required
								/>
							</div>
							<div class="form-control mt-4">
								<label class="label" for="email">
									<span class="label-text">Email</span>
								</label>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="Your email"
									class="input input-bordered"
									required
								/>
							</div>
							<div class="form-control mt-4">
								<label class="label" for="message">
									<span class="label-text">Message</span>
								</label>
								<textarea
									id="message"
									bind:value={message}
									placeholder="Your message"
									class="textarea textarea-bordered h-24"
									required
								></textarea>
							</div>
							<div class="form-control mt-6">
								<button type="submit" class="btn btn-primary">Send Message</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
