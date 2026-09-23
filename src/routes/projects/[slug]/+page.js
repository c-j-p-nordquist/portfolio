import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/src/content/projects/*/+page.md');

export async function load({ params }) {
	const importer = modules[`/src/content/projects/${params.slug}/+page.md`];
	if (!importer) throw error(404, 'Project not found');

	const project = await importer();
	if (project.metadata.published !== true) throw error(404, 'Project not found');

	return { content: project.default, metadata: { ...project.metadata, slug: params.slug } };
}
