<script>
	let { service } = $props();
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
	<div class="card-body">
		<div class="flex items-start mb-4">
			<div class="flex-shrink-0 mr-4">
				{#if service.icon}
					<service.icon class="w-8 h-8 text-primary" />
				{/if}
			</div>
			<div>
				<h3 class="card-title text-2xl font-heading">{service.title}</h3>
				<p class="text-gray-400">{service.description}</p>
			</div>
		</div>
		{#if service.visual}
			<div class="mt-6">
				<service.visual />
			</div>
		{/if}
	</div>
</div>
