import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const post = await import(`../../../content/posts/${params.slug}/+page.md`);
        const imageBasePath = post.metadata.hasImages ? `/images/posts/${params.slug}` : null;

        return {
            content: post.default,
            metadata: {
                ...post.metadata,
                imageBasePath,
                slug: params.slug
            }
        };
    } catch (e) {
        console.error('Error loading post:', e);
        throw error(404, `Could not find ${params.slug}`);
    }
}