<script>
	import IconX from '~icons/lucide/x';

	let {
		isOpen = false,
		allTopics = [],
		selectedTopics = [],
		onClose,
		onToggleTopic,
		onClearFilters
	} = $props();
</script>

<dialog id="filter_modal" class="modal modal-bottom sm:modal-middle" class:modal-open={isOpen}>
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-4">Filter Projects</h3>
		<div class="max-h-[60vh] overflow-y-auto pr-2">
			{#each allTopics as topic}
				<label class="flex items-center space-x-2 py-2">
					<input
						type="checkbox"
						checked={selectedTopics.includes(topic)}
						onchange={() => onToggleTopic(topic)}
						class="checkbox checkbox-primary"
					/>
					<span>{topic}</span>
				</label>
			{/each}
		</div>
		<div class="modal-action">
			{#if selectedTopics.length > 0}
				<button class="btn btn-outline" onclick={onClearFilters}> Clear Filters </button>
			{/if}
			<button class="btn" onclick={onClose}>Close</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={onClose}>close</button>
	</form>
</dialog>
