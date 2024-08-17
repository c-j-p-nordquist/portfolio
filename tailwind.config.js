/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Roboto', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#10B981',
          50: '#8CF5D2',
          100: '#79F3CB',
          200: '#53F0BC',
          300: '#2EEDAE',
          400: '#13DF9B',
          500: '#10B981',
          600: '#0C8760',
          700: '#085540',
          800: '#042320',
          900: '#000000'
        },
        secondary: {
          DEFAULT: '#3B82F6',
          50: '#EBF2FF',
          100: '#D7E5FD',
          200: '#AFCBFB',
          300: '#87B1F9',
          400: '#5F97F7',
          500: '#3B82F6',
          600: '#0B61EE',
          700: '#084BB8',
          800: '#063583',
          900: '#041F4E'
        },
        // New dark mode specific colors
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
          },
          primary: '#1ED760',
          secondary: '#4D9FFF',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-links': theme('colors.secondary.600'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': theme('colors.gray.500'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.secondary.200'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.secondary.700'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-th-borders': theme('colors.gray.200'),
            '--tw-prose-td-borders': theme('colors.gray.100'),

            // Dark mode
            '--tw-prose-invert-body': theme('colors.dark.text.primary'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.dark.secondary'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.dark.text.secondary'),
            '--tw-prose-invert-bullets': theme('colors.dark.text.secondary'),
            '--tw-prose-invert-hr': theme('colors.dark.surface'),
            '--tw-prose-invert-quotes': theme('colors.dark.text.primary'),
            '--tw-prose-invert-quote-borders': theme('colors.dark.secondary'),
            '--tw-prose-invert-captions': theme('colors.dark.text.secondary'),
            '--tw-prose-invert-code': theme('colors.dark.secondary'),
            '--tw-prose-invert-pre-code': theme('colors.dark.text.primary'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.dark.surface'),
            '--tw-prose-invert-td-borders': theme('colors.dark.surface'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}