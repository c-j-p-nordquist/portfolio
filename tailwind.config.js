/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Literata', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
          ...require("daisyui/src/theming/themes")["cyberpunk"],
          primary: "#F4CE14",
          secondary: "#495E57",
          accent: "#45474B",
          neutral: "#3d4451",
          "base-100": "#F5F7F8",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["cyberpunk"],
          primary: "#F4CE14",
          secondary: "#495E57",
          accent: "#45474B",
          neutral: "#3d4451",
          "base-100": "#1a1a1a",  // Dark background
          "base-content": "#F5F7F8",  // Light text for dark background
        },
      },
    ],
  },
};