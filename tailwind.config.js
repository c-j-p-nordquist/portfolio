/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Schibsted Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
			},
			colors: {
				paper: 'var(--paper)',
				ink: 'var(--ink)',
				muted: 'var(--muted)',
				line: 'var(--line)',
				accent: 'var(--blue)',
				panel: 'var(--panel)'
			}
		}
	},
	plugins: []
};
