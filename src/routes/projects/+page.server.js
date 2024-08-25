import { getProjects } from '$lib/utils/projects';

export async function load() {
    const projects = await getProjects();
    return { projects };
}