// @ts-check

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['{app,src}/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          300: '#333333',
          800: '#888888',
        },
        dark: '#0a0a0a',
        light: 'hsla(0, 0%, 93%, 1)',
      },
    },
  },
  plugins: [],
};
