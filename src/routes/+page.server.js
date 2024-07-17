import { getPosts } from '$lib/utils/posts';

export async function load() {
    const posts = await getPosts();
    const latestPost = posts[0];
    const featuredPosts = posts.slice(0, 3); // Get the first 3 posts as featured

    return {
        latestPost: latestPost ? {
            title: latestPost.title,
            url: `/blog/${latestPost.slug}`
        } : null,
        featuredPosts
    };
}