import { getPosts } from '$lib/utils/posts';

export async function load() {
    const posts = await getPosts();
    return { posts };
}