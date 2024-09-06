// $lib/utils/featuredItems.js
import { workHistory } from '$lib/data/workHistory';
import { services } from '$lib/data/services';
import { getProjects } from '$lib/utils/projects';
import { getBlogPosts } from '$lib/utils/blog';

export const getFeaturedExperiences = () => {
    return workHistory.slice(0, 2);
};

export const getFeaturedServices = () => {
    return services.slice(0, 3);
};

export const getFeaturedProjects = async () => {
    const projects = await getProjects();
    return projects.filter(project => project.featured).slice(0, 2);
};

export const getFeaturedBlogPosts = async () => {
    const posts = await getBlogPosts();
    return posts.filter(post => post.featured).slice(0, 2);
};