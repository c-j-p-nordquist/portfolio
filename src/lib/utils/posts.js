export async function getPosts() {
    try {
        const paths = import.meta.glob('/src/content/posts/**/+page.md', { eager: true });

        const posts = Object.entries(paths)
            .map(([path, post]) => {
                const slug = path.split('/').at(-2);

                return {
                    ...post.metadata,
                    slug,
                    path: `/posts/${slug}`,
                    type: post.metadata.type || 'post',
                    featured: post.metadata.featured,
                    imageBasePath: post.metadata.hasImages ? `/images/posts/${slug}` : null,
                };
            })
            .filter(post => post.published !== false)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export function getPostBySlug(slug) {
    const posts = getPosts();
    return posts.find(post => post.slug === slug);
}

export function getPostsByType(type) {
    const posts = getPosts();
    return posts.filter(post => post.type === type);
}