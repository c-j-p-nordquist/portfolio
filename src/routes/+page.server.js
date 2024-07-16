import { getPosts } from '$lib/utils/posts';

export async function load() {
    const posts = await getPosts();
    const latestPost = posts[0];

    return {
        latestPost: latestPost ? {
            title: latestPost.title,
            url: `/blog/${latestPost.slug}`
        } : null
    };
}