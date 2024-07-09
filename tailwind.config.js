/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {},
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
      },
    ],
  },
};