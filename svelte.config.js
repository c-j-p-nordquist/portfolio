import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { createHighlighter } from 'shiki';
import { enhancedImages } from '@sveltejs/enhanced-img';

let highlighter;

// Custom rehype plugin for inline code
function rehypeInlineCode() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'code' && (!node.properties.className || !node.properties.className.includes('language-'))) {
				node.properties.className = node.properties.className || [];
				node.properties.className.push('inline-code');
			}
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
				_: './src/routes/posts/post.svelte'
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {
					if (!highlighter) {
						highlighter = await createHighlighter({
							themes: ['github-dark'],
							langs: []
						});
						await highlighter.loadTheme('github-dark');
					}

					if (!highlighter.getLoadedLanguages().includes(lang)) {
						try {
							await highlighter.loadLanguage(lang);
						} catch (error) {
							console.warn(`Failed to load language: ${lang}. Falling back to plain text.`);
							lang = 'text';
						}
					}

					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark' }));
					return `{@html \`${html}\`}`;
				}
			},
			remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
			rehypePlugins: [rehypeSlug, rehypeInlineCode]
		})
	],
	kit: {
		adapter: adapter()
	},
	plugins: [enhancedImages()]
};

export default config;