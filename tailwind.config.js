// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7D3EFF',
        secondary: '#6C757D',
        accent: '#FF4081',
        background: '#111827',
        text: '#F3F4F6',
        gradientStart: '#7D3EFF',
        gradientEnd: '#FF4081',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            h1: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h2: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h3: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h4: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h5: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h6: {
              color: theme('colors.text'),
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            strong: {
              color: theme('colors.text'),
            },
            code: {
              color: theme('colors.accent'),
            },
            figcaption: {
              color: theme('colors.text'),
            },
            blockquote: {
              color: theme('colors.text'),
              borderLeftColor: theme('colors.accent'),
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