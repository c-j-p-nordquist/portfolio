<script>
	let canvas = $state(null);
	let ctx = $state(null);
	let width = $state(0);
	let height = $state(0);
	let isDarkMode = $state(false);

	$effect(() => {
		if (canvas) {
			ctx = canvas.getContext('2d');
			resizeCanvas();
			updateDarkMode();
			drawCurvedSplit();
			window.addEventListener('resize', handleResize);

			// Watch for system color scheme changes
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			mediaQuery.addEventListener('change', updateDarkMode);

			return () => {
				window.removeEventListener('resize', handleResize);
				mediaQuery.removeEventListener('change', updateDarkMode);
			};
		}
	});

	function resizeCanvas() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	function updateDarkMode() {
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		drawCurvedSplit();
	}

	function drawCurvedSplit() {
		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);

		// Create a curved path
		ctx.beginPath();
		ctx.moveTo(0, height);

		const cp1x = width * 0.25;
		const cp1y = height * 0.7;
		const cp2x = width * 0.75;
		const cp2y = height * 0.6;
		const endX = width;
		const endY = height * 0.5;

		ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);

		ctx.lineTo(width, height);
		ctx.lineTo(0, height);
		ctx.closePath();

		const lightColor = '#F8F8F8'; // Tailwind's bg-background
		const darkColor = '#121212'; // Tailwind's bg-darkBackground
		const backgroundColor = isDarkMode ? darkColor : lightColor;

		const gradient = ctx.createLinearGradient(0, endY, 0, height);
		gradient.addColorStop(0, `${backgroundColor}CC`);
		gradient.addColorStop(0.7, `${backgroundColor}FF`);
		gradient.addColorStop(1, `${backgroundColor}FF`);

		ctx.fillStyle = gradient;
		ctx.fill();
	}

	function handleResize() {
		resizeCanvas();
		drawCurvedSplit();
	}
</script>

<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
