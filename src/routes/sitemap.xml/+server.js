import { SITE_URL } from '$lib/site.js';
import { getProjects } from '$lib/utils/projects.js';

export const prerender = true;

export function GET() {
	const projects = getProjects();

	const pages = [
		{ path: '/', priority: '1.0', lastmod: projects[0]?.date },
		{ path: '/about', priority: '0.7' },
		...projects.map((project) => ({ path: project.path, priority: '0.8', lastmod: project.date }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) =>
			`\t<url>\n\t\t<loc>${SITE_URL}${page.path === '/' ? '' : page.path}</loc>\n${
				page.lastmod
					? `\t\t<lastmod>${new Date(page.lastmod).toISOString().slice(0, 10)}</lastmod>\n`
					: ''
			}\t\t<priority>${page.priority}</priority>\n\t</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
