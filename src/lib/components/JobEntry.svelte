<script>
	let { job, highlightLimit = 2 } = $props();
	const visibleHighlights = job.highlights.slice(0, highlightLimit);
</script>

<article
	class="py-5 -mx-4 px-4 rounded-lg hover:bg-stone-100/60 dark:hover:bg-stone-900/50 transition-colors duration-200"
>
	<div class="flex justify-between items-baseline gap-4 mb-[5px]">
		<h3
			class="text-[14.5px] font-medium tracking-[-0.01em] leading-[1.3] text-stone-900 dark:text-stone-100"
		>
			{job.position}
		</h3>
		<span class="text-[11.5px] text-muted dark:text-muted-dark shrink-0 tabular-nums">
			{job.period}
		</span>
	</div>
	<div class="text-[12.5px] text-muted dark:text-muted-dark mb-[9px]">
		{job.company} · {job.location}
	</div>
	<p class="text-sm text-stone-600 dark:text-stone-400 leading-[1.68]" style="text-wrap: pretty;">
		{job.description}
	</p>

	{#if visibleHighlights.length > 0}
		<ul class="mt-3.5 list-none flex flex-col gap-[7px]">
			{#each visibleHighlights as highlight}
				<li class="flex gap-2.5 text-[13px] text-muted dark:text-muted-dark leading-[1.6]">
					<span class="text-stone-300 dark:text-stone-700 shrink-0 text-[15px]">–</span>
					<span style="text-wrap: pretty;">{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}
</article>
