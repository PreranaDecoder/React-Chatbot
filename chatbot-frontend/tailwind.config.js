/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00E6E6',
          dark: '#00B3B3',
          light: '#33FFFF',
        },
        secondary: {
          DEFAULT: '#1A1A2E',
          light: '#2A2A3E',
          dark: '#0A0A1E',
        }
      }
    },
  },
  plugins: [],
};