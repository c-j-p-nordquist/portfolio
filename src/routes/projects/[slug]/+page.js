import { error } from '@sveltejs/kit';
import { getProjects } from '$lib/utils/projects.js';

const modules = import.meta.glob('/src/content/projects/*/+page.md');

export async function load({ params }) {
	const importer = modules[`/src/content/projects/${params.slug}/+page.md`];
	if (!importer) throw error(404, 'Project not found');

	const project = await importer();
	if (project.metadata.published !== true) throw error(404, 'Project not found');

	const allProjects = getProjects();
	const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
	const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
	const nextProject =
		currentIndex !== -1 && currentIndex < allProjects.length - 1
			? allProjects[currentIndex + 1]
			: null;

	return {
		content: project.default,
		metadata: {
			...project.metadata,
			slug: params.slug,
			index: currentIndex !== -1 ? currentIndex + 1 : 1,
			total: allProjects.length,
			prevProject,
			nextProject
		}
	};
}
