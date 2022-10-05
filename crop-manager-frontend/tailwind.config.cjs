const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto Mono', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
