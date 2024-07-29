import { getPosts } from '$lib/utils/posts';
import { createPostsIndex, isIndexCreated } from '$lib/utils/search';

export async function load() {
    const posts = await getPosts();

    if (!isIndexCreated()) {
        createPostsIndex(posts);
    }

    return {
        posts
    };
}