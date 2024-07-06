<script>
	import { onMount } from 'svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	function handleSubmit() {
		// Here you would typically send the form data to a server
		console.log('Form submitted', { name, email, message });
		alert('Thank you for your message!');
		name = '';
		email = '';
		message = '';
	}

	onMount(() => {
		document.title = 'Contact Me - Portfolio';
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-6">Contact Me</h1>
	<form on:submit|preventDefault={handleSubmit} class="max-w-md">
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
		<div class="form-control">
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
		<div class="form-control">
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
</main>
