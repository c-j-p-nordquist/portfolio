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
	let formErrors = $state({});
	let isSubmitting = $state(false);

	function validateForm() {
		formErrors = {};
		if (!name.trim()) formErrors.name = 'Name is required';
		if (!email.trim()) formErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Invalid email format';
		if (!message.trim()) formErrors.message = 'Message is required';
		return Object.keys(formErrors).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (!validateForm()) return;

		isSubmitting = true;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});

			const result = await response.json();

			if (response.ok) {
				alert(result.message);
				name = '';
				email = '';
				message = '';
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('There was an error sending your message. Please try again later.');
		} finally {
			isSubmitting = false;
		}
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
						<form onsubmit={handleSubmit}>
							<div class="form-control">
								<label for="name" class="label">
									<span class="label-text">Name</span>
								</label>
								<input
									type="text"
									id="name"
									value={name}
									oninput={(e) => (name = e.target.value)}
									placeholder="Your name"
									class="input input-bordered"
									class:input-error={formErrors.name}
									required
								/>
								{#if formErrors.name}
									<label for="name" class="label">
										<span class="label-text-alt text-error">{formErrors.name}</span>
									</label>
								{/if}
							</div>
							<div class="form-control mt-4">
								<label for="email" class="label">
									<span class="label-text">Email</span>
								</label>
								<input
									type="email"
									id="email"
									value={email}
									oninput={(e) => (email = e.target.value)}
									placeholder="Your email"
									class="input input-bordered"
									class:input-error={formErrors.email}
									required
								/>
								{#if formErrors.email}
									<label for="email" class="label">
										<span class="label-text-alt text-error">{formErrors.email}</span>
									</label>
								{/if}
							</div>
							<div class="form-control mt-4">
								<label for="message" class="label">
									<span class="label-text">Message</span>
								</label>
								<textarea
									id="message"
									value={message}
									oninput={(e) => (message = e.target.value)}
									placeholder="Your message"
									class="textarea textarea-bordered h-24"
									class:textarea-error={formErrors.message}
									required
								></textarea>
								{#if formErrors.message}
									<label for="message" class="label">
										<span class="label-text-alt text-error">{formErrors.message}</span>
									</label>
								{/if}
							</div>
							<div class="form-control mt-6">
								<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
									{isSubmitting ? 'Sending...' : 'Send Message'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
