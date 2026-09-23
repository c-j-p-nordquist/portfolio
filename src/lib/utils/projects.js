// Every finished project is one markdown file: src/content/projects/<slug>/+page.md.
// Drafts stay hidden until their frontmatter says `published: true`.
const modules = import.meta.glob('/src/content/projects/*/+page.md', { eager: true });

export function getProjects() {
	return Object.entries(modules)
		.map(([path, mod]) => {
			const slug = path.split('/').at(-2);
			return { ...mod.metadata, slug, path: `/projects/${slug}` };
		})
		.filter((project) => project.published === true)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
