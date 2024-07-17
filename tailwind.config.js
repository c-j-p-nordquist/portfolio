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
          "primary": "#024950",    // Deep Teal
          "secondary": "#0FA4AF",  // Bright Teal
          "accent": "#964734",     // Rust
          "neutral": "#003135",    // Dark Teal
          "base-100": "#FFFFFF",   // White
          "info": "#AFDDE5",       // Light Blue
          "success": "#34D399",    // Emerald (kept from original)
          "warning": "#FBBF24",    // Amber (kept from original)
          "error": "#DC2626",      // Red (kept from original)

          // Custom colors
          "base-200": "#F0F7F4",   // Light background (from original light theme)
          "base-300": "#E2E8F0",   // Slightly darker for contrast

          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.25rem",
        },
        dark: {
          "primary": "#0FA4AF",    // Bright Teal
          "secondary": "#AFDDE5",  // Light Blue
          "accent": "#964734",     // Rust (same as light mode)
          "neutral": "#024950",    // Deep Teal
          "base-100": "#003135",   // Dark Teal as background
          "info": "#61DAFB",       // Bright cyan (kept from original dark theme)
          "success": "#34D399",    // Emerald (same as light mode)
          "warning": "#FBBF24",    // Amber (same as light mode)
          "error": "#DC2626",      // Red (same as light mode)

          // Custom colors
          "base-200": "#024950",   // Deep Teal for subtle contrast
          "base-300": "#0FA4AF",   // Bright Teal for more contrast when needed

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
}