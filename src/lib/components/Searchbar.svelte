<script>
	import IconSearch from '~icons/lucide/search';

	let { onSearch = () => {} } = $props();
	let searchTerm = $state('');

	function handleSearch() {
		onSearch(searchTerm);
	}
</script>

<div class="form-control">
	<div class="input-group">
		<input
			type="text"
			placeholder="Search posts..."
			class="input input-bordered"
			bind:value={searchTerm}
			oninput={handleSearch}
		/>
		<button class="btn btn-square" onclick={handleSearch}>
			<IconSearch />
		</button>
	</div>
</div>
