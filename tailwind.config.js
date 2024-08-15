/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.secondary.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.400'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-quote-borders': theme('colors.secondary.500'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.secondary.300'),
            '--tw-prose-pre-code': theme('colors.gray.300'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-th-borders': theme('colors.gray.700'),
            '--tw-prose-td-borders': theme('colors.gray.800'),
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'code': {
              backgroundColor: theme('colors.gray.800'),
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
              fontWeight: '400',
              fontSize: '0.875em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}