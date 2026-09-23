import { getProjects } from '$lib/utils/projects.js';

export function load() {
	return { projects: getProjects() };
}
