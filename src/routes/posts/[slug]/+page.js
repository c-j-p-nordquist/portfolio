import { error } from '@sveltejs/kit';
import { calculateReadingTime } from '$lib/utils/readingTime';

export async function load({ params }) {
	let post, raw;

	try {
		post = await import(`../../../content/posts/${params.slug}/+page.md`);
		raw = await import(`../../../content/posts/${params.slug}/+page.md?raw`);
	} catch (e) {
		console.error('Error loading post:', e);
		throw error(404, `Could not find ${params.slug}`);
	}

	if (post.metadata.published === false) {
		throw error(404, `Could not find ${params.slug}`);
	}

	const imageBasePath = post.metadata.hasImages ? `/images/posts/${params.slug}` : null;
	const bodyText = raw.default.replace(/^---[\s\S]*?---/, '');
	const readingTime = calculateReadingTime(bodyText);

	return {
		content: post.default,
		metadata: {
			...post.metadata,
			imageBasePath,
			slug: params.slug,
			readingTime
		}
	};
}
