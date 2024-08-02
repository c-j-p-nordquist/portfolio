<script>
	let email = $state('');
	let status = $state('idle');

	async function handleSubmit(event) {
		event.preventDefault();
		status = 'submitting';

		// Replace this with your actual newsletter signup logic
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Simulating a successful signup
		status = 'success';
		email = '';

		// Reset status after 3 seconds
		setTimeout(() => {
			status = 'idle';
		}, 3000);
	}
</script>

<form onsubmit={handleSubmit} class="bg-base-200 p-6 rounded-lg shadow-md">
	<h3 class="text-2xl font-bold mb-4 text-base-content">Subscribe to My Newsletter</h3>
	<p class="mb-4 text-base-content/70">
		Get the latest updates and insights directly in your inbox.
	</p>
	<div class="flex">
		<input
			type="email"
			placeholder="Your email address"
			bind:value={email}
			required
			class="flex-grow p-2 rounded-l-md border-2 border-base-300 focus:outline-none focus:border-primary"
		/>
		<button type="submit" class="btn btn-primary rounded-l-none" disabled={status === 'submitting'}>
			{#if status === 'submitting'}
				Subscribing...
			{:else if status === 'success'}
				Subscribed!
			{:else}
				Subscribe
			{/if}
		</button>
	</div>
	{#if status === 'success'}
		<p class="mt-2 text-primary">
			Thanks for subscribing! Check your email to confirm your subscription.
		</p>
	{/if}
</form>
