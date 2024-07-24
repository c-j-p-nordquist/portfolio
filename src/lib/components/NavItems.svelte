<script>
	import { Motion } from 'svelte-motion';
	import IconChevronDown from '~icons/lucide/chevron-down';
	import IconChevronRight from '~icons/lucide/chevron-right';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let {
		currentPath,
		isMobile = false,
		featuredProjects = [],
		featuredPosts = [],
		closeDrawer
	} = $props();

	let navItems = $state([
		{ id: 'about', name: 'About', link: '/about' },
		{ id: 'projects', name: 'Projects', link: '/projects', hasDropdown: true },
		{ id: 'blog', name: 'Blog', link: '/blog', hasDropdown: true }
	]);

	let activeIdx = $derived(navItems.findIndex((item) => currentPath.startsWith(item.link)));

	let openDropdown = $state(null);
	let dropdownRef = $state(null);

	function handleClick(index, link, id) {
		if (!isMobile && navItems[index].hasDropdown) {
			openDropdown = openDropdown === id ? null : id;
		} else {
			goto(link);
			if (isMobile && closeDrawer) closeDrawer();
		}
	}

	function handleItemClick(link) {
		goto(link);
		openDropdown = null;
		if (isMobile && closeDrawer) closeDrawer();
	}

	function getProjectLink(project) {
		return `/projects/${project.id}`;
	}

	function handleClickOutside(event) {
		if (dropdownRef && !dropdownRef.contains(event.target)) {
			openDropdown = null;
		}
	}

	$effect(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	let list = {
		visible: {
			clipPath: 'inset(0% 0% 0% 0% round 12px)',
			transition: {
				type: 'spring',
				bounce: 0,
				duration: 0.3
			}
		},
		hidden: {
			clipPath: 'inset(10% 50% 90% 50% round 12px)',
			transition: {
				type: 'spring',
				bounce: 0,
				duration: 0.3
			}
		}
	};

	let itemVariants = {
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1
			}
		}),
		hidden: { opacity: 0, y: 20 }
	};
</script>

{#if isMobile}
	<ul class="menu bg-base-200 w-full">
		{#each navItems as item, i (item.id)}
			<li>
				{#if item.hasDropdown}
					<details>
						<summary
							class="hover:bg-accent hover:text-accent-content transition-colors duration-200"
							>{item.name}</summary
						>
						<ul>
							{#if item.id === 'projects'}
								{#each featuredProjects as project}
									<li>
										<a
											href={getProjectLink(project)}
											onclick={() => handleItemClick(getProjectLink(project))}
											class="hover:bg-accent hover:text-accent-content transition-colors duration-200"
											>{project.title}</a
										>
									</li>
								{/each}
							{:else if item.id === 'blog'}
								{#each featuredPosts as post}
									<li>
										<a
											href={`/blog/${post.slug}`}
											onclick={() => handleItemClick(`/blog/${post.slug}`)}
											class="hover:bg-accent hover:text-accent-content transition-colors duration-200"
											>{post.title}</a
										>
									</li>
								{/each}
							{/if}
							<li>
								<a
									href={item.link}
									class="text-primary hover:bg-accent hover:text-accent-content transition-colors duration-200"
									onclick={() => handleItemClick(item.link)}
								>
									View all {item.name.toLowerCase()} →
								</a>
							</li>
						</ul>
					</details>
				{:else}
					<a
						href={item.link}
						class={cn(
							i === activeIdx ? 'active bg-accent text-accent-content' : '',
							'hover:bg-accent hover:text-accent-content transition-colors duration-200'
						)}
						onclick={() => handleItemClick(item.link)}
					>
						{item.name}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<div class="relative flex items-center space-x-2" role="navigation" bind:this={dropdownRef}>
		{#each navItems as item, i (item.id)}
			<div class="relative" role="menuitem">
				<button
					class={cn(
						'group relative z-[1] rounded-full px-4 py-2 transition-colors duration-200',
						i === activeIdx
							? 'bg-accent text-accent-content'
							: 'text-base-content hover:bg-accent hover:text-accent-content'
					)}
					onclick={() => handleClick(i, item.link, item.id)}
					aria-haspopup={item.hasDropdown ? 'true' : 'false'}
					aria-expanded={openDropdown === item.id ? 'true' : 'false'}
				>
					<span class="relative text-sm block font-medium">
						{item.name}
						{#if item.hasDropdown}
							<IconChevronDown
								class={cn(
									'inline-block w-4 h-4 transition-transform duration-200 ease-in-out',
									openDropdown === item.id ? 'rotate-180' : ''
								)}
							/>
						{/if}
					</span>
				</button>

				{#if item.hasDropdown}
					<Motion
						animate={openDropdown === item.id ? 'visible' : 'hidden'}
						variants={list}
						initial="hidden"
						let:motion
					>
						<ul
							use:motion
							class={cn(
								'absolute z-[1] left-0 mt-2 w-64 space-y-3 p-2.5 bg-base-100 border border-base-300 rounded-xl shadow-lg',
								openDropdown === item.id ? 'pointer-events-auto' : 'pointer-events-none'
							)}
						>
							{#if item.id === 'projects'}
								{#each featuredProjects as project, index}
									<Motion custom={index} variants={itemVariants} let:motion>
										<li use:motion>
											<a
												href={getProjectLink(project)}
												onclick={() => handleItemClick(getProjectLink(project))}
												class="group flex items-center gap-2 rounded-md border border-transparent text-base-content hover:bg-accent hover:text-accent-content focus-visible:text-accent focus-visible:border-accent focus-visible:outline-none p-2 transition-colors duration-200"
											>
												<span class="flex items-center gap-1 text-sm font-medium">
													{project.title}
													<IconChevronRight
														class="w-3 h-3 -translate-x-1 scale-0 opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0"
													/>
												</span>
											</a>
										</li>
									</Motion>
								{/each}
							{:else if item.id === 'blog'}
								{#each featuredPosts as post, index}
									<Motion custom={index} variants={itemVariants} let:motion>
										<li use:motion>
											<a
												href={`/blog/${post.slug}`}
												onclick={() => handleItemClick(`/blog/${post.slug}`)}
												class="group flex items-center gap-2 rounded-md border border-transparent text-base-content hover:bg-accent hover:text-accent-content focus-visible:text-accent focus-visible:border-accent focus-visible:outline-none p-2 transition-colors duration-200"
											>
												<span class="flex items-center gap-1 text-sm font-medium">
													{post.title}
													<IconChevronRight
														class="w-3 h-3 -translate-x-1 scale-0 opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0"
													/>
												</span>
											</a>
										</li>
									</Motion>
								{/each}
							{/if}
							<Motion
								custom={featuredProjects.length || featuredPosts.length}
								variants={itemVariants}
								let:motion
							>
								<li use:motion>
									<a
										href={item.link}
										onclick={() => handleItemClick(item.link)}
										class="group flex items-center gap-2 rounded-md border border-transparent text-primary hover:bg-accent hover:text-accent-content focus-visible:text-accent-focus focus-visible:border-accent focus-visible:outline-none p-2 transition-colors duration-200"
									>
										<span class="flex items-center gap-1 text-sm font-semibold">
											View all {item.name.toLowerCase()}
											<IconChevronRight
												class="w-3 h-3 -translate-x-1 scale-0 opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0"
											/>
										</span>
									</a>
								</li>
							</Motion>
						</ul>
					</Motion>
				{/if}
			</div>
		{/each}
	</div>
{/if}
