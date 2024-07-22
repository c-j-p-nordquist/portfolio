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

	function generateUniqueId() {
		if (typeof crypto !== 'undefined' && crypto.randomUUID) {
			return crypto.randomUUID().toString().slice(0, 10);
		}
		return Math.random().toString(36).substring(2, 12);
	}

	let id = $state(generateUniqueId());
	let animationId = $state(generateUniqueId());
	let scrollY = $state(0);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				scrollY = window.scrollY;
			};
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<svg
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
	{...props}
	style="transform: translateY({scrollY * 0.2}px);"
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
			<circle id="pattern-circle" {cx} {cy} r={cr} fill={fillColor}>
				<animate
					attributeName="opacity"
					values="0.5;1;0.5"
					dur="4s"
					repeatCount="indefinite"
					id={animationId}
				/>
			</circle>
		</pattern>
	</defs>
	<rect width="100%" height="100%" stroke-width={0} fill={`url(#${id})`} />
</svg>
