<script>
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import IconMail from '~icons/lucide/mail';
	import IconBook from '~icons/lucide/book';
	import HeroPostCard from './HeroPostCard.svelte';
	import SocialLinks from './SocialLinks.svelte';

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
			window.addEventListener('resize', initCanvas);
			animationFrameId = requestAnimationFrame(animate);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('resize', initCanvas);
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

		particles = Array.from({ length: 100 }, () => createParticle());
	}

	function createParticle() {
		return {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 5 + 1,
			speedX: Math.random() * 3 - 1.5,
			speedY: Math.random() * 3 - 1.5,
			color: `hsla(${Math.random() * 60 + 180}, 100%, 50%, ${Math.random() * 0.3 + 0.1})`
		};
	}

	function handleMouseMove(e) {
		mouse = { x: e.clientX, y: e.clientY };
	}

	function animate() {
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach((particle, index) => {
			particle.x += particle.speedX;
			particle.y += particle.speedY;

			if (particle.size > 0.2) particle.size -= 0.1;

			if (
				particle.x < 0 ||
				particle.x > canvas.width ||
				particle.y < 0 ||
				particle.y > canvas.height ||
				particle.size <= 0.2
			) {
				particles[index] = createParticle();
			}

			ctx.fillStyle = particle.color;
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fill();

			const dx = mouse.x - particle.x;
			const dy = mouse.y - particle.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				particle.size = 5;
				particle.x += dx * 0.03;
				particle.y += dy * 0.03;
			}
		});

		animationFrameId = requestAnimationFrame(animate);
	}
</script>

<div
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-base-100 to-base-300"
>
	<canvas bind:this={canvas} class="absolute inset-0"></canvas>
	<div
		class="absolute inset-0 bg-gradient-to-b from-base-100/80 via-base-100/50 to-transparent"
	></div>
	<div
		class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-between"
	>
		<div class="lg:w-1/2 lg:pr-8 mb-12 lg:mb-0 text-left">
			<h2
				class="font-display text-xl sm:text-2xl font-medium text-primary mb-4 tracking-wide"
				in:fly={{ y: -20, duration: 800, delay: 300, easing: cubicOut }}
			>
				DevSecOps Engineer @Stim
			</h2>
			<h1
				class="font-hero text-4xl sm:text-5xl md:text-6xl lg:text7xl font-extrabold leading-tight tracking-wider text-base-content mb-6"
			>
				{#each title.split(' ') as word, index}
					<span
						in:fly={{ y: 50, duration: 800, delay: 500 + index * 100, easing: cubicOut }}
						class="inline-block"
					>
						{word}&nbsp;
					</span>
				{/each}
			</h1>
			<p
				class="font-body text-lg sm:text-xl md:text-2xl text-base-content/80 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light"
				in:fly={{ y: 20, duration: 800, delay: 1200, easing: cubicOut }}
			>
				{subtitle}
			</p>
			<SocialLinks />
			<div
				class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
				in:fade={{ duration: 800, delay: 1500 }}
			>
				<a href="/posts" class="btn btn-primary btn-lg group font-display">
					<span class="flex items-center">
						Explore My Work
						<IconBook
							class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
						/>
					</span>
				</a>
				<a
					href="mailto:philip@nordquist.me"
					class="btn btn-outline btn-lg border-primary text-primary hover:bg-primary hover:text-base-100 group font-display"
				>
					<span class="flex items-center">
						Lets Connect!
						<IconMail
							class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
						/>
					</span>
				</a>
			</div>
		</div>
		{#if featuredPosts && featuredPosts.length > 0}
			<div class="lg:w-1/2 lg:pl-8 mt-12 lg:mt-0">
				<h2
					class="font-hero text-3xl font-semibold mb-6 text-center lg:text-left text-base-content"
				>
					Featured Works
				</h2>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
