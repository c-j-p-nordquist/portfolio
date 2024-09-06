<script>
	import { onMount, onDestroy } from 'svelte';

	let {
		colors = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B'],
		particleCount = 15,
		speed = 0.5,
		size = 200
	} = $props();

	let canvas = $state(null);
	let ctx = $state(null);
	let width = $state(0);
	let height = $state(0);
	let particles = $state([]);
	let animationFrame = $state(null);

	function initCanvas() {
		if (!canvas) return;
		ctx = canvas.getContext('2d');
		width = canvas.width = canvas.offsetWidth;
		height = canvas.height = canvas.offsetHeight;

		particles = Array(particleCount)
			.fill()
			.map(() => ({
				x: Math.random() * width,
				y: Math.random() * height,
				size: size + Math.random() * 100,
				color: colors[Math.floor(Math.random() * colors.length)],
				vx: (Math.random() - 0.5) * speed,
				vy: (Math.random() - 0.5) * speed
			}));
	}

	function animate() {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);

		particles.forEach((particle) => {
			particle.x += particle.vx;
			particle.y += particle.vy;

			if (particle.x < -particle.size) particle.x = width + particle.size;
			if (particle.x > width + particle.size) particle.x = -particle.size;
			if (particle.y < -particle.size) particle.y = height + particle.size;
			if (particle.y > height + particle.size) particle.y = -particle.size;

			ctx.beginPath();
			const gradient = ctx.createRadialGradient(
				particle.x,
				particle.y,
				0,
				particle.x,
				particle.y,
				particle.size
			);
			gradient.addColorStop(0, particle.color + '40');
			gradient.addColorStop(1, particle.color + '00');
			ctx.fillStyle = gradient;
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fill();
		});

		animationFrame = requestAnimationFrame(animate);
	}

	onMount(() => {
		initCanvas();
		animate();

		const resizeObserver = new ResizeObserver(() => {
			initCanvas();
		});

		resizeObserver.observe(canvas);

		return () => {
			resizeObserver.disconnect();
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	onDestroy(() => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
