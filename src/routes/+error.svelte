<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} – Philip Nordquist</title>
</svelte:head>

<div class="max-w-[640px] mx-auto px-6 pt-[72px] pb-[100px]">
	<h1 class="text-6xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-100 mb-4">
		{$page.status}
	</h1>
	<p class="text-stone-600 dark:text-stone-400 mb-8">
		{$page.error?.message || "The page you're looking for doesn't exist."}
	</p>
	<div class="flex gap-4">
		<a
			href="/"
			class="text-sm text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
		>
			Go home
		</a>
		<button
			onclick={() => history.back()}
			class="text-sm text-muted dark:text-muted-dark hover:text-stone-900 dark:hover:text-stone-300 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 hover:decoration-stone-500 transition-colors"
		>
			Go back
		</button>
	</div>
</div>
