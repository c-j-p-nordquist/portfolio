<script>
	import { page } from '$app/stores';
	import IconHome from '~icons/lucide/home';
	import IconArrowLeft from '~icons/lucide/arrow-left';
</script>

<svelte:head>
	<title>404 - Page Not Found</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen bg-base-200 px-4">
	<div class="text-center">
		<h1 class="text-9xl font-bold text-primary mb-4">404</h1>
		<p class="text-2xl font-semibold mb-4 text-base-content">Oops! Page not found</p>
		<p class="text-base-content mb-8">
			The page you're looking for doesn't exist or has been moved.
		</p>
		<div class="flex justify-center space-x-4">
			<a href="/" class="btn btn-primary">
				<IconHome class="w-5 h-5 mr-2" />
				Go Home
			</a>
			<button onclick={() => history.back()} class="btn btn-outline">
				<IconArrowLeft class="w-5 h-5 mr-2" />
				Go Back
			</button>
		</div>
	</div>
</div>
