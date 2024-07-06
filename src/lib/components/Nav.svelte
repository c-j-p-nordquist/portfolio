<script>
	let currentPath = $state('/');

	$effect(() => {
		currentPath = window.location.pathname;
	});
</script>

<nav class="bg-base-100">
	<div class="navbar container mx-auto">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Portfolio</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/" class:active={currentPath === '/'}>Home</a></li>
				<li><a href="/about" class:active={currentPath === '/about'}>About</a></li>
				<li><a href="/projects" class:active={currentPath === '/projects'}>Projects</a></li>
				<li><a href="/contact" class:active={currentPath === '/contact'}>Contact</a></li>
			</ul>
		</div>
	</div>
</nav>
