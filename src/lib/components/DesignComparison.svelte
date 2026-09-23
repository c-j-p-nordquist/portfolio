<script>
	import { page } from '$app/stores';
	let { alternate = false } = $props();
	let profile = $derived(['/philip', '/b/philip'].includes($page.url.pathname));
</script>

<nav class="design-comparison" aria-label="Design comparison">
	<span>Design comparison</span>
	<div>
		<a href={profile ? '/philip' : '/'} aria-current={!alternate ? 'page' : undefined}
			>A <span>Ivory</span></a
		><a href={profile ? '/b/philip' : '/b'} aria-current={alternate ? 'page' : undefined}
			>B <span>Forest</span></a
		>
	</div>
	<small>Local preview</small>
</nav>

<style>
	.design-comparison {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		padding: 8px 20px;
		background: #fff;
		color: #333;
		border-bottom: 1px solid #ddd;
		font:
			11px/1.4 'Geist',
			system-ui,
			sans-serif;
		position: relative;
		z-index: 30;
	}
	.design-comparison > span {
		color: #666;
	}
	.design-comparison > div {
		display: flex;
		gap: 3px;
		padding: 3px;
		background: #eeeeeb;
		border-radius: 5px;
	}
	a {
		display: flex;
		gap: 8px;
		padding: 6px 15px;
		border-radius: 3px;
		color: #555;
	}
	a[aria-current] {
		background: #263b32;
		color: #fff;
	}
	a:focus-visible {
		outline: 2px solid #304fe5;
		outline-offset: 2px;
	}
	small {
		color: #767676;
		font-size: 10px;
	}
	@media (max-width: 500px) {
		.design-comparison {
			gap: 14px;
			padding: 8px 12px;
		}
		.design-comparison small {
			display: none;
		}
		a {
			padding: 7px 12px;
		}
	}
</style>
