<script>
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let formErrors = $state({});

	let isFormValid = $derived(
		name.trim() !== '' &&
			email.trim() !== '' &&
			message.trim() !== '' &&
			Object.keys(formErrors).length === 0
	);

	function validateEmail(email) {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return re.test(String(email).toLowerCase());
	}

	function handleInput(field, value) {
		if (field === 'email' && !validateEmail(value)) {
			formErrors = { ...formErrors, [field]: 'Please enter a valid email address' };
		} else if (value.trim() === '') {
			formErrors = { ...formErrors, [field]: 'This field is required' };
		} else {
			let newErrors = { ...formErrors };
			delete newErrors[field];
			formErrors = newErrors;
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!isFormValid) return;

		isSubmitting = true;

		// Simulate form submission
		setTimeout(() => {
			console.log('Form submitted', { name, email, message });
			name = '';
			email = '';
			message = '';
			isSubmitting = false;
			alert('Message sent successfully!');
		}, 1500);
	}
</script>

<section class="relative bg-background text-text overflow-hidden">
	<div class="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
		<div
			class="animate-float bg-gradient-to-r from-primary via-accent to-transparent opacity-30 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-2xl"
		></div>
	</div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
		<h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-8 text-center">
			Get in Touch
		</h2>
		<form
			onsubmit={handleSubmit}
			class="max-w-lg mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg"
		>
			<div class="mb-6">
				<label for="name" class="block text-sm font-medium mb-1">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					class="w-full px-4 py-2 bg-white/20 border border-text/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out"
					bind:value={name}
					oninput={() => handleInput('name', name)}
					required
				/>
				{#if formErrors.name}
					<p class="mt-1 text-sm text-red-400">{formErrors.name}</p>
				{/if}
			</div>
			<div class="mb-6">
				<label for="email" class="block text-sm font-medium mb-1">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					class="w-full px-4 py-2 bg-white/20 border border-text/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out"
					bind:value={email}
					oninput={() => handleInput('email', email)}
					required
				/>
				{#if formErrors.email}
					<p class="mt-1 text-sm text-red-400">{formErrors.email}</p>
				{/if}
			</div>
			<div class="mb-6">
				<label for="message" class="block text-sm font-medium mb-1">Message</label>
				<textarea
					id="message"
					name="message"
					rows="5"
					class="w-full px-4 py-2 bg-white/20 border border-text/20 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out"
					bind:value={message}
					oninput={() => handleInput('message', message)}
					required
				></textarea>
				{#if formErrors.message}
					<p class="mt-1 text-sm text-red-400">{formErrors.message}</p>
				{/if}
			</div>
			<div>
				<button
					type="submit"
					class="w-full bg-accent text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 hover:bg-primary {!isFormValid ||
					isSubmitting
						? 'opacity-50 cursor-not-allowed'
						: ''}"
					disabled={!isFormValid || isSubmitting}
				>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</div>
		</form>
	</div>
</section>

<style>
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
