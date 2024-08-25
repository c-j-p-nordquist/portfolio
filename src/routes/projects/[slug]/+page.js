import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const project = await import(`../../../content/projects/${params.slug}/+page.md`);

        const imageBasePath = project.metadata.hasImages ? `/images/projects/${params.slug}` : null;

        const result = {
            content: project.default,
            metadata: {
                ...project.metadata,
                imageBasePath,
                slug: params.slug
            }
        };
        return result;
    } catch (e) {
        throw error(404, `Could not find project ${params.slug}`);
    }
}