import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { createHighlighter } from 'shiki';
import { enhancedImages } from '@sveltejs/enhanced-img';


let highlighter;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: './src/routes/blog/post.svelte'
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
			rehypePlugins: [rehypeSlug]
		})
	],
	kit: {
		adapter: adapter()
	},
	plugins: [enhancedImages()]
};

export default config;