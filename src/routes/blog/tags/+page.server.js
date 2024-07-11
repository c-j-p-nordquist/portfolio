import { getAllPosts } from '$lib/utils/posts';

export function load() {
    const posts = getAllPosts();
    return { posts };
}