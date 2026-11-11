import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { createHighlighter } from 'shiki';

let highlighter;

// Custom rehype plugin for inline code
function rehypeInlineCode() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (
				node.tagName === 'code' &&
				(!node.properties.className || !node.properties.className.includes('language-'))
			) {
				node.properties.className = node.properties.className || [];
				node.properties.className.push('inline-code');
			}
		});
	};
}

// Wraps markdown images with alt text into <figure> + <figcaption> so the description
// is visible below each image instead of hidden in the alt attribute.
function rehypeFigureCaptions() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (!parent || typeof index !== 'number' || node.tagName !== 'img') return;
			if (parent.tagName === 'figure') return;

			const alt = typeof node.properties?.alt === 'string' ? node.properties.alt.trim() : '';
			const children = [node];
			if (alt) {
				children.push({
					type: 'element',
					tagName: 'figcaption',
					properties: { className: ['project-figcaption'] },
					children: [{ type: 'text', value: alt }]
				});
			}

			parent.children[index] = {
				type: 'element',
				tagName: 'figure',
				properties: { className: ['project-figure'] },
				children
			};
		});
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: './src/routes/projects/project.svelte'
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {
					if (!highlighter) {
						highlighter = await createHighlighter({
							themes: ['github-light', 'github-dark'],
							langs: []
						});
					}

					if (!highlighter.getLoadedLanguages().includes(lang)) {
						try {
							await highlighter.loadLanguage(lang);
						} catch {
							console.warn(`Failed to load language: ${lang}. Falling back to plain text.`);
							lang = 'text';
						}
					}

					const html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
							themes: {
								light: 'github-light',
								dark: 'github-dark'
							},
							defaultColor: false
						})
					);
					return `{@html \`${html}\`}`;
				}
			},
			remarkPlugins: [remarkUnwrapImages],
			rehypePlugins: [rehypeSlug, rehypeInlineCode, rehypeFigureCaptions]
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
