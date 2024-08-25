import { getBlogPosts } from '$lib/utils/blog';

export async function load() {
    const blogPosts = await getBlogPosts();
    return { blogPosts };
}