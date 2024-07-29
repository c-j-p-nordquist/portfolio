import { createPostsIndex, isIndexCreated } from '$lib/utils/search';
import { getPosts } from '$lib/utils/posts';

export async function load() {
    const posts = await getPosts();

    createPostsIndex(posts);
    const indexCreated = isIndexCreated();

    return {
        posts,
        postsIndexCreated: indexCreated
    };
}