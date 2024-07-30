<script>
	let {
		isOpen,
		allTopics,
		selectedTopics,
		selectedType,
		onClose,
		onToggleTopic,
		onChangeType,
		onClearFilters
	} = $props();

	function handleTopicToggle(topic) {
		onToggleTopic(topic);
	}

	function handleTypeChange(event) {
		const newType = event.target.value;
		onChangeType(newType);
	}
</script>

<div class={`modal ${isOpen ? 'modal-open' : ''}`}>
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-4">Filter Content</h3>

		<div class="mb-4">
			<h4 class="font-semibold mb-2">Content Type</h4>
			<select
				class="select select-bordered w-full"
				value={selectedType}
				onchange={handleTypeChange}
			>
				<option value="all">All</option>
				<option value="post">Blog Posts</option>
				<option value="project">Projects</option>
			</select>
		</div>

		<div>
			<h4 class="font-semibold mb-2">Topics</h4>
			<div class="flex flex-wrap gap-2">
				{#each allTopics as topic (topic)}
					<button
						class={`btn btn-sm ${selectedTopics.includes(topic) ? 'btn-primary' : 'btn-outline'}`}
						onclick={() => handleTopicToggle(topic)}
					>
						{topic}
					</button>
				{/each}
			</div>
		</div>

		<div class="modal-action">
			<button class="btn btn-outline" onclick={onClearFilters}>Clear Filters</button>
			<button class="btn" onclick={onClose}>Close</button>
		</div>
	</div>
</div>
