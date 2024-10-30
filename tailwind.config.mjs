import animations from "@midudev/tailwind-animations";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#dcf0ff',
          200: '#b2e3ff',
          300: '#6dcdff',
          400: '#20b3ff',
          500: '#009aff',
          600: '#0079df',
          700: '#0060b4',
          800: '#005294',
          900: '#003866',
          950: '#002a51'
        },
        secondary: '#F3F3F3'
      },
      fontFamily: {
        noto: ['"Noto Serif JP"', 'serif']
      }
    }
  },
  plugins: [animations]
}
