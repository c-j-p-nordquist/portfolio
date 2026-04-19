<script>
	let { job, defaultOpen = false } = $props();
	let open = $state(defaultOpen);
	const has = job.highlights.length > 0;
</script>

<div
	class="py-5"
	class:cursor-pointer={has}
	onclick={() => has && (open = !open)}
	role={has ? 'button' : undefined}
	tabindex={has ? 0 : undefined}
	onkeydown={(e) => {
		if (has && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			open = !open;
		}
	}}
>
	<div class="flex justify-between items-baseline gap-4 mb-[5px]">
		<span
			class="text-[14.5px] font-medium tracking-[-0.01em] leading-[1.3] text-stone-900 dark:text-stone-100"
		>
			{job.position}
		</span>
		<span
			class="text-[11.5px] text-stone-400 dark:text-stone-600 shrink-0 tabular-nums"
		>
			{job.period}
		</span>
	</div>
	<div class="text-[12.5px] text-stone-400 dark:text-stone-600 mb-[9px]">
		{job.company} · {job.location}
	</div>
	<p
		class="text-sm text-stone-600 dark:text-stone-400 leading-[1.68]"
		style="text-wrap: pretty;"
	>
		{job.description}
	</p>

	{#if has && open}
		<ul class="mt-3.5 list-none flex flex-col gap-[7px]">
			{#each job.highlights as highlight}
				<li
					class="flex gap-2.5 text-[13px] text-stone-400 dark:text-stone-600 leading-[1.6]"
				>
					<span class="text-stone-200 dark:text-stone-800 shrink-0 text-[15px]">—</span>
					<span style="text-wrap: pretty;">{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}

	{#if has}
		<div
			class="mt-[11px] text-[11.5px] text-stone-400 dark:text-stone-600 flex items-center gap-[5px]"
		>
			<span
				class="inline-flex items-center justify-center w-[14px] h-[14px] border border-stone-200 dark:border-stone-800 rounded-[3px] text-[12px] leading-none text-stone-400 dark:text-stone-600"
			>
				{open ? '−' : '+'}
			</span>
			{open ? 'Collapse' : 'Show highlights'}
		</div>
	{/if}
</div>
