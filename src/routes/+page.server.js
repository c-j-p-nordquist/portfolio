import { getPosts } from '$lib/utils/posts';
import { projects } from '$lib/data/projectData.js';

export async function load() {
    const posts = await getPosts();
    const latestPost = posts[0];

    const allItems = [...posts, ...projects].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    return {
        latestPost: latestPost ? {
            title: latestPost.title,
            url: `/blog/${latestPost.slug}`
        } : null,
        allItems
    };
}