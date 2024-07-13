import { error, json } from '@sveltejs/kit';
import { getAllPosts } from '$lib/utils/posts';

export async function GET() {
    try {
        const posts = getAllPosts();
        return json(posts);
    } catch (e) {
        error(404, 'Failed to load posts');
    }
}