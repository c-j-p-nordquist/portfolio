import { createPostsIndex, isIndexCreated } from '$lib/utils/search';
import { getAllPosts } from '$lib/utils/posts';

export function load() {
    console.log('Running layout server load function');
    const posts = getAllPosts();
    console.log('Posts retrieved:', posts.length);
    createPostsIndex(posts);
    const indexCreated = isIndexCreated();
    console.log('Index created:', indexCreated);
    return {
        postsIndexCreated: indexCreated
    };
}