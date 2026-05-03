import { getPosts } from '$lib/utils/posts';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const posts = await getPosts();

	if (posts.length === 0) {
		throw redirect(307, '/');
	}

	return { posts };
}
