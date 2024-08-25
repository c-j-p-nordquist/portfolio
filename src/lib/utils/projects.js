export async function getProjects() {
    try {
        const paths = import.meta.glob('/src/content/projects/**/+page.md', { eager: true });

        const projects = Object.entries(paths)
            .map(([path, project]) => {
                const slug = path.split('/').at(-2);
                return {
                    ...project.metadata,
                    slug,
                    path: `/projects/${slug}`,
                    layout: project.metadata.layout || 'project',
                    featured: project.metadata.featured,
                    imageBasePath: project.metadata.hasImages ? `/images/projects/${slug}` : null,
                };
            })
            .filter(project => project.published !== false)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function getProjectBySlug(slug) {
    const projects = await getProjects();
    return projects.find(project => project.slug === slug);
}