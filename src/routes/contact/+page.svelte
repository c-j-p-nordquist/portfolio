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

	async function handleSubmit(event) {
		event.preventDefault();
		if (!isFormValid) return;

		isSubmitting = true;
		submitResult = null;

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			const result = await response.json();

			if (result.success) {
				submitResult = { type: 'success', message: 'Message sent successfully!' };
				name = '';
				email = '';
				message = '';
			} else {
				submitResult = {
					type: 'error',
					message: result.message || 'Failed to send message. Please try again.'
				};
			}
		} catch (error) {
			console.error('Error:', error);
			submitResult = {
				type: 'error',
				message: 'An unexpected error occurred. Please try again later.'
			};
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section
	class="relative bg-background dark:bg-darkBackground text-text dark:text-darkText overflow-hidden py-16"
>
	<div
		class="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-30 dark:opacity-20"
	>
		<div
			class="animate-float bg-gradient-to-r from-primary via-accent to-transparent w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl"
		></div>
	</div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<h1
			class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-8 text-center text-primary dark:text-darkText"
		>
			Get in Touch
		</h1>
		<p
			class="text-lg text-center max-w-2xl mx-auto mb-12 text-subtitleText dark:text-darkSubtitleText"
		>
			Have a question or want to work together? Fill out the form below, and I'll get back to you as
			soon as possible.
		</p>
		<form
			onsubmit={handleSubmit}
			class="max-w-lg mx-auto bg-white/10 dark:bg-darkBackground/30 backdrop-blur-md p-8 rounded-lg"
		>
			<div class="mb-6">
				<label for="name" class="block text-sm font-medium mb-2 text-primary dark:text-darkText"
					>Name</label
				>
				<input
					type="text"
					id="name"
					name="name"
					class="w-full px-4 py-2 bg-background dark:bg-darkBackground border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out text-text dark:text-darkText"
					bind:value={name}
					oninput={() => handleInput('name', name)}
					required
				/>
				{#if formErrors.name}
					<p class="mt-1 text-sm text-accent">{formErrors.name}</p>
				{/if}
			</div>
			<div class="mb-6">
				<label for="email" class="block text-sm font-medium mb-2 text-primary dark:text-darkText"
					>Email</label
				>
				<input
					type="email"
					id="email"
					name="email"
					class="w-full px-4 py-2 bg-background dark:bg-darkBackground border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out text-text dark:text-darkText"
					bind:value={email}
					oninput={() => handleInput('email', email)}
					required
				/>
				{#if formErrors.email}
					<p class="mt-1 text-sm text-accent">{formErrors.email}</p>
				{/if}
			</div>
			<div class="mb-6">
				<label for="message" class="block text-sm font-medium mb-2 text-primary dark:text-darkText"
					>Message</label
				>
				<textarea
					id="message"
					name="message"
					rows="5"
					class="w-full px-4 py-2 bg-background dark:bg-darkBackground border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out text-text dark:text-darkText"
					bind:value={message}
					oninput={() => handleInput('message', message)}
					required
				></textarea>
				{#if formErrors.message}
					<p class="mt-1 text-sm text-accent">{formErrors.message}</p>
				{/if}
			</div>
			<div>
				<button
					type="submit"
					class="w-full bg-accent hover:bg-secondary text-white font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent {!isFormValid ||
					isSubmitting
						? 'opacity-50 cursor-not-allowed'
						: ''}"
					disabled={!isFormValid || isSubmitting}
				>
					{isFormValid
						? isSubmitting
							? 'Sending...'
							: 'Send Message'
						: 'Please fill out all fields'}
				</button>
			</div>
		</form>
	</div>
</section>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
