import { getPosts } from '$lib/utils/posts';

export async function load() {
    try {
        const posts = await getPosts();
        const latestPost = posts[0];

        return {
            latestPost: latestPost ? {
                title: latestPost.title,
                url: `/posts/${latestPost.slug}`
            } : null,
            posts
        };
    } catch (error) {
        console.error('Error in server load function:', error);
        return {
            latestPost: null,
            posts: []
        };
    }
}