/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'light-green': '#00b19d',
      'dark-green': '#00535e',
      'medium-gray': '#73879c',
      'dark-gray': '#334155',
      'light-red': '#e85e42'
    }
  },
  plugins: []
}
