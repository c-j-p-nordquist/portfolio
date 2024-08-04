/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Noto Sans"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.base-content'),
            h1: {
              color: theme('colors.base-content'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.base-content'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.base-content'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h4: {
              color: theme('colors.base-content'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            'h1, h2, h3, h4': {
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
            },
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