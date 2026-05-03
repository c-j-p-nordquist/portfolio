import { error } from '@sveltejs/kit';

export async function load({ params }) {
	let post;

	try {
		post = await import(`../../../content/posts/${params.slug}/+page.md`);
	} catch (e) {
		console.error('Error loading post:', e);
		throw error(404, `Could not find ${params.slug}`);
	}

	if (post.metadata.published === false) {
		throw error(404, `Could not find ${params.slug}`);
	}

	const imageBasePath = post.metadata.hasImages ? `/images/posts/${params.slug}` : null;

	return {
		content: post.default,
		metadata: {
			...post.metadata,
			imageBasePath,
			slug: params.slug
		}
	};
}
