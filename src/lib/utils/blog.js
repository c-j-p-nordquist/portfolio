export async function getBlogPosts() {
    try {
        const paths = import.meta.glob('/src/content/blog/**/+page.md', { eager: true });

        const posts = Object.entries(paths)
            .map(([path, post]) => {
                const slug = path.split('/').at(-2);
                return {
                    ...post.metadata,
                    slug,
                    path: `/blog/${slug}`,
                    layout: post.metadata.layout || 'blog',
                    featured: post.metadata.featured,
                    imageBasePath: post.metadata.hasImages ? `/images/blog/${slug}` : null,
                };
            })
            .filter(post => post.published !== false)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPostBySlug(slug) {
    const posts = await getBlogPosts();
    return posts.find(post => post.slug === slug);
}