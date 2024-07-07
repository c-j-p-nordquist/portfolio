<script>
	let { skill, onclick, selected = false } = $props();
</script>

<button
	class="badge badge-lg m-1"
	classList={{ 'badge-primary': selected, 'badge-outline': !selected }}
	{onclick}
>
	{skill}
</button>

<style>
	.badge {
		@apply cursor-pointer transition-colors duration-300;
	}
</style>
