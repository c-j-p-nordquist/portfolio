/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        body: ['Inter']
      },
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50: '#fff9ec',
          100: '#ffefc2',
          200: '#ffdf85',
          300: '#ffc847',
          400: '#ffb21d',
          500: '#ff9203',
          600: '#e27000',
          700: '#bb4d02',
          800: '#983b08',
          900: '#7c310b',
          950: '#481700',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#14b8a6",
          "secondary": "#d946ef",
          "accent": "#ff9203",
          "neutral": "#115e59",
          "base-100": "#f0fdfa",
          "base-200": "#ccfbf1",
          "base-300": "#99f6e4",
          "info": "#06b6d4",
          "success": "#22c55e",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#5eead4",
          "secondary": "#f0abfc",
          "accent": "#ffc847",
          "neutral": "#99f6e4",
          "base-100": "#042f2e",
          "base-200": "#134e4a",
          "base-300": "#115e59",
          "info": "#67e8f9",
          "success": "#4ade80",
          "warning": "#fde047",
          "error": "#fca5a5",
        }
      }
    ],
  },
}