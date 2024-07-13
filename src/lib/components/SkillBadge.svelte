<script>
	let { skill, onclick, selected = false } = $props();
</script>

<button
	class="badge badge-lg m-1 cursor-pointer transition-colors duration-300"
	class:badge-primary={selected}
	class:badge-outline={!selected}
	{onclick}
>
	{skill}
</button>
