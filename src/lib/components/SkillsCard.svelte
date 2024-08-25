<script>
	let { skill } = $props();
</script>

<div
	class="relative bg-gray-800 text-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105"
>
	<h3 class="text-2xl font-heading mb-2 text-white">{skill.title}</h3>
	<p class="text-gray-300">{skill.description}</p>
</div>
