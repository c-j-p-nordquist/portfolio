import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/utils/posts';

export async function GET() {
    const posts = await getPosts();

    const searchablePosts = posts.map(post => ({
        title: post.title || 'Untitled',
        slug: post.slug,
        description: post.description || '',
        // Add any other fields you want to make searchable
    }));

    return json(searchablePosts);
}