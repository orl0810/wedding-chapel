/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#9E7D4A',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          warm: '#F5EFE4',
        },
        charcoal: {
          DEFAULT: '#2C2825',
          light: '#4A443E',
        },
        blush: {
          DEFAULT: '#F2E8E0',
          deep: '#E8C5B0',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
