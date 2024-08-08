<script>
	import { fade, fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import IconDownload from '~icons/mdi/download';
	import IconMail from '~icons/lucide/mail';
	import IconGithub from '~icons/mdi/github';
	import IconLinkedin from '~icons/mdi/linkedin';

	let resumeUrl = $state('/files/resume.pdf');
	let hoveredIndex = $state(-1);

	const iconSpring = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.15
		}
	);

	function downloadResume() {
		window.open(resumeUrl, '_blank');
	}

	let socialLinks = $state([
		{ href: 'https://github.com/c-j-p-nordquist', icon: IconGithub, label: 'GitHub' },
		{
			href: 'https://linkedin.com/in/philip-nordquist-269949a0',
			icon: IconLinkedin,
			label: 'LinkedIn'
		},
		{ href: '#', icon: IconDownload, label: 'Resume', action: downloadResume }
	]);

	function handleMouseEnter(index) {
		hoveredIndex = index;
		iconSpring.set({ x: 0, y: -5 });
	}

	function handleMouseLeave() {
		hoveredIndex = -1;
		iconSpring.set({ x: 0, y: 0 });
	}
</script>

<div class="flex flex-wrap gap-6 mb-8" in:fade={{ duration: 300, delay: 300 }}>
	{#each socialLinks as link, index}
		<div
			in:fly={{ y: 50, duration: 1000, delay: 300 + 150 * index, easing: elasticOut }}
			class="relative group"
		>
			{#if link.action}
				<button
					onclick={link.action}
					onmouseenter={() => handleMouseEnter(index)}
					onmouseleave={handleMouseLeave}
					class="text-base-content/70 hover:text-primary transition-colors duration-200 flex items-center"
					aria-label={link.label}
				>
					<svelte:component
						this={link.icon}
						class="w-6 h-6 transform transition-transform duration-300 ease-out"
						style={hoveredIndex === index
							? `transform: translate(${$iconSpring.x}px, ${$iconSpring.y}px)`
							: ''}
					/>
				</button>
			{:else}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					onmouseenter={() => handleMouseEnter(index)}
					onmouseleave={handleMouseLeave}
					class="text-base-content/70 hover:text-primary transition-colors duration-200 flex items-center"
					aria-label={link.label}
				>
					<svelte:component
						this={link.icon}
						class="w-6 h-6 transform transition-transform duration-300 ease-out"
						style={hoveredIndex === index
							? `transform: translate(${$iconSpring.x}px, ${$iconSpring.y}px)`
							: ''}
					/>
				</a>
			{/if}
			<span
				class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-base-300 text-base-content px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
			>
				{link.label}
			</span>
		</div>
	{/each}
</div>
