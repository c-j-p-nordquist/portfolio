import { SITE_URL } from '$lib/site.js';
import { getPosts } from '$lib/utils/posts.js';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	const pages = [
		{ path: '/', priority: '1.0' },
		{ path: '/philip', priority: '0.8' },
		...(posts.length ? [{ path: '/posts', priority: '0.6' }] : []),
		...posts.map((post) => ({ path: post.path, priority: '0.5', lastmod: post.date }))
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
