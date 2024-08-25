import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const post = await import(`../../../content/blog/${params.slug}/+page.md`);

        const imageBasePath = post.metadata.hasImages ? `/images/blog/${params.slug}` : null;

        const result = {
            content: post.default,
            metadata: {
                ...post.metadata,
                imageBasePath,
                slug: params.slug
            }
        };
        return result;
    } catch (e) {
        throw error(404, `Could not find blog post ${params.slug}`);
    }
}