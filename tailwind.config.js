/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.resume-title': {
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      })
    })
  ],
}
