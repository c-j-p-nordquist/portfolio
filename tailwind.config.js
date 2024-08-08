/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        hero: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.base-content'),
            '--tw-prose-headings': theme('colors.primary'),
            '--tw-prose-links': theme('colors.secondary'),
            '--tw-prose-bold': theme('colors.base-content'),
            '--tw-prose-counters': theme('colors.base-content'),
            '--tw-prose-bullets': theme('colors.base-content'),
            '--tw-prose-hr': theme('colors.base-300'),
            '--tw-prose-quotes': theme('colors.base-content'),
            '--tw-prose-quote-borders': theme('colors.primary'),
            '--tw-prose-captions': theme('colors.base-content / 0.7'),
            '--tw-prose-code': theme('colors.secondary'),
            '--tw-prose-pre-code': theme('colors.base-content'),
            '--tw-prose-pre-bg': theme('colors.base-200'),
            '--tw-prose-th-borders': theme('colors.base-300'),
            '--tw-prose-td-borders': theme('colors.base-200'),
            '--tw-prose-invert-body': theme('colors.base-content'),
            '--tw-prose-invert-headings': theme('colors.primary'),
            '--tw-prose-invert-links': theme('colors.secondary'),
            '--tw-prose-invert-bold': theme('colors.base-content'),
            '--tw-prose-invert-counters': theme('colors.base-content'),
            '--tw-prose-invert-bullets': theme('colors.base-content'),
            '--tw-prose-invert-hr': theme('colors.base-300'),
            '--tw-prose-invert-quotes': theme('colors.base-content'),
            '--tw-prose-invert-quote-borders': theme('colors.primary'),
            '--tw-prose-invert-captions': theme('colors.base-content / 0.7'),
            '--tw-prose-invert-code': theme('colors.secondary'),
            '--tw-prose-invert-pre-code': theme('colors.base-content'),
            '--tw-prose-invert-pre-bg': theme('colors.base-300'),
            '--tw-prose-invert-th-borders': theme('colors.base-200'),
            '--tw-prose-invert-td-borders': theme('colors.base-300'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#58a6ff",
          "secondary": "#1f6feb",
          "accent": "#238636",
          "neutral": "#30363d",
          "base-100": "#0d1117",
          "base-200": "#161b22",
          "base-300": "#21262d",
          "base-content": "#c9d1d9",
          "info": "#3b8eea",
          "success": "#238636",
          "warning": "#d29922",
          "error": "#f85149",
        },
        light: {
          "primary": "#0969da",
          "secondary": "#1f6feb",
          "accent": "#2da44e",
          "neutral": "#d0d7de",
          "base-100": "#ffffff",
          "base-200": "#f6f8fa",
          "base-300": "#eaeef2",
          "base-content": "#24292f",
          "info": "#0969da",
          "success": "#2da44e",
          "warning": "#9a6700",
          "error": "#cf222e",
        },
      },
    ],
  },
}