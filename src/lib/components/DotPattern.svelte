<script>
	import { cn } from '$lib/utils';

	let {
		width = 16,
		height = 16,
		x = 0,
		y = 0,
		cx = 1,
		cy = 1,
		cr = 1,
		fillColor = 'rgb(163 163 163 / 0.8)',
		class: className = '',
		...props
	} = $props();

	let id = $state(crypto.randomUUID().toString().slice(0, 10));
</script>

<svg
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
	fill={fillColor}
	{...props}
>
	<defs>
		<pattern
			{id}
			{width}
			{height}
			patternUnits="userSpaceOnUse"
			patternContentUnits="userSpaceOnUse"
			{x}
			{y}
		>
			<circle id="pattern-circle" {cx} {cy} r={cr} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" stroke-width={0} fill={`url(#${id})`} />
</svg>
