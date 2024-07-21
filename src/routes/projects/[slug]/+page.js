import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projectData.js';

export function load({ params }) {
    const project = projects.find(p => p.id.toString() === params.slug);

    if (project) {
        return { project };
    }

    throw error(404, 'Project not found');
}