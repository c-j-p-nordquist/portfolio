export async function getPosts() {
    const paths = import.meta.glob('/src/content/blog/**/+page.md', { eager: true });

    return Object.entries(paths)
        .map(([path, post]) => ({
            ...post.metadata,
            slug: path.split('/').at(-2),
            path: `/blog/${path.split('/').at(-2)}`
        }))
        .filter(post => post.published !== false)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}