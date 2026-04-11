/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#fafaf9',
          dark: '#0c0a09',
        },
        subtle: {
          DEFAULT: '#f5f5f4',
          dark: '#1c1917',
        },
        border: {
          DEFAULT: '#e7e5e4',
          dark: '#292524',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.stone.600'),
            '--tw-prose-headings': theme('colors.stone.900'),
            '--tw-prose-links': theme('colors.stone.900'),
            '--tw-prose-bold': theme('colors.stone.900'),
            '--tw-prose-counters': theme('colors.stone.500'),
            '--tw-prose-bullets': theme('colors.stone.400'),
            '--tw-prose-hr': theme('colors.stone.200'),
            '--tw-prose-quotes': theme('colors.stone.900'),
            '--tw-prose-quote-borders': theme('colors.stone.300'),
            '--tw-prose-captions': theme('colors.stone.500'),
            '--tw-prose-code': theme('colors.stone.800'),
            '--tw-prose-pre-code': theme('colors.stone.200'),
            '--tw-prose-pre-bg': theme('colors.stone.900'),
            '--tw-prose-th-borders': theme('colors.stone.200'),
            '--tw-prose-td-borders': theme('colors.stone.100'),
            'a': {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.stone.300'),
              textUnderlineOffset: '3px',
              '&:hover': {
                textDecorationColor: theme('colors.stone.900'),
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            '--tw-prose-invert-body': theme('colors.stone.400'),
            '--tw-prose-invert-headings': theme('colors.stone.100'),
            '--tw-prose-invert-links': theme('colors.stone.100'),
            '--tw-prose-invert-bold': theme('colors.stone.100'),
            '--tw-prose-invert-counters': theme('colors.stone.500'),
            '--tw-prose-invert-bullets': theme('colors.stone.600'),
            '--tw-prose-invert-hr': theme('colors.stone.800'),
            '--tw-prose-invert-quotes': theme('colors.stone.300'),
            '--tw-prose-invert-quote-borders': theme('colors.stone.700'),
            '--tw-prose-invert-captions': theme('colors.stone.500'),
            '--tw-prose-invert-code': theme('colors.stone.300'),
            '--tw-prose-invert-pre-code': theme('colors.stone.300'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.stone.700'),
            '--tw-prose-invert-td-borders': theme('colors.stone.800'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
