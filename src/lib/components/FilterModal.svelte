<script>
	import IconX from '~icons/lucide/x';

	let { isOpen, allTopics, selectedTopics, onClose, onToggleTopic, onClearFilters } = $props();

	$effect(() => {
		const modal = document.getElementById('filter_modal');
		if (isOpen && modal) {
			modal.showModal();
		} else if (modal) {
			modal.close();
		}
	});

	function handleClose() {
		onClose();
	}
</script>

<dialog id="filter_modal" class="modal" onclose={handleClose}>
	<div class="modal-box max-h-[80vh] flex flex-col p-6">
		<h3 id="filter-title" class="text-2xl font-serif font-bold text-primary mb-4">Filter</h3>
		<div class="flex-grow overflow-y-auto mb-4 pr-2">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
				{#each allTopics as topic}
					<button
						class="text-left py-2 px-3 rounded text-sm {selectedTopics.includes(topic)
							? 'bg-accent text-white'
							: 'bg-secondary/10 text-secondary hover:bg-secondary/20'} transition-colors duration-200 truncate"
						onclick={() => onToggleTopic(topic)}
						aria-pressed={selectedTopics.includes(topic)}
					>
						{topic}
					</button>
				{/each}
			</div>
		</div>
		<div class="flex justify-between mt-auto pt-4 border-t border-secondary/20">
			<button
				class="text-secondary hover:text-primary transition-colors duration-200"
				onclick={onClearFilters}
			>
				Clear Filters
			</button>
			<button
				class="text-primary hover:text-accent transition-colors duration-200"
				onclick={handleClose}
			>
				Apply Filters
			</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	.modal-box {
		width: 90vw;
		max-width: 32rem;
	}

	.modal-box > div:nth-child(2) {
		max-height: calc(80vh - 8rem);
	}
</style>
