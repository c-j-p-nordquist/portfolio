<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconUser from '~icons/lucide/user';
	import IconBook from '~icons/lucide/book';
	import HeroPostCard from './HeroPostCard.svelte';

	let { title, subtitle, featuredPosts } = $props();

	let canvas = $state(null);
	let ctx = $state(null);
	let particles = $state([]);
	let mouse = $state({ x: 0, y: 0 });
	let animationFrameId = $state(null);

	$effect(() => {
		if (canvas) {
			initCanvas();
			window.addEventListener('mousemove', handleMouseMove);
			animationFrameId = requestAnimationFrame(animate);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
				}
			};
		}
	});

	function initCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d');

		particles = Array.from({ length: 50 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			radius: Math.random() * 2 + 1,
			vx: Math.random() * 2 - 1,
			vy: Math.random() * 2 - 1
		}));
	}

	function handleMouseMove(e) {
		mouse = { x: e.clientX, y: e.clientY };
	}

	function animate() {
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = 'lighter';

		particles.forEach((p, index) => {
			p.x += p.vx;
			p.y += p.vy;

			if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
			if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

			ctx.beginPath();
			ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(88, 166, 255, 0.5)';
			ctx.fill();

			for (let j = index + 1; j < particles.length; j++) {
				let p2 = particles[j];
				let dx = p.x - p2.x;
				let dy = p.y - p2.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					ctx.beginPath();
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance / 100})`;
					ctx.stroke();
				}
			}
		});

		animationFrameId = requestAnimationFrame(animate);
	}
</script>

<div class="relative min-h-screen flex items-center overflow-hidden bg-base-100">
	<canvas bind:this={canvas} class="absolute inset-0"></canvas>
	<div class="absolute inset-0 bg-gradient-to-b from-base-100 via-base-100/70 to-base-100/20"></div>
	<div
		class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-between"
	>
		<div class="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0">
			<h2
				class="text-xl sm:text-2xl font-light text-base-content opacity-60 mb-4"
				in:fly={{ x: -50, duration: 800, delay: 300, easing: cubicOut }}
			>
				DevSecOps Engineer
			</h2>
			<h1
				class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-base-content mb-6"
			>
				{#each title.split(' ') as word, index}
					<span
						in:fly={{ x: -50, duration: 800, delay: 500 + index * 100, easing: cubicOut }}
						class="inline-block"
					>
						{word}&nbsp;
					</span>
				{/each}
			</h1>
			<p
				class="text-lg sm:text-xl md:text-2xl text-base-content opacity-80 max-w-xl mb-12"
				in:fly={{ x: -50, duration: 800, delay: 1200, easing: cubicOut }}
			>
				{subtitle}
			</p>
			<div
				class="flex flex-col sm:flex-row gap-4 sm:gap-6"
				in:fade={{ duration: 800, delay: 1500 }}
			>
				<a href="/posts" class="btn btn-primary">
					<span class="flex items-center">
						Explore My Work
						<IconBook class="w-5 h-5 ml-2" />
					</span>
				</a>
				<a
					href="/about"
					class="btn btn-outline border-primary text-primary hover:bg-primary hover:text-base-100"
				>
					<span class="flex items-center">
						About Me
						<IconUser class="w-5 h-5 ml-2" />
					</span>
				</a>
			</div>
		</div>
		{#if featuredPosts && featuredPosts.length > 0}
			<div class="lg:w-1/2 lg:pl-8">
				<h2 class="text-2xl font-bold mb-4">Featured Works</h2>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-4"
					in:fly={{ x: 50, duration: 800, delay: 800, easing: cubicOut }}
				>
					{#each featuredPosts as post, index}
						<div in:fade={{ duration: 500, delay: 1000 + index * 200 }}>
							<HeroPostCard {post} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
