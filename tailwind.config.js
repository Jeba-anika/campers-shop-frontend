/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      'primary': '#466A8B',
      'cs-ash': '#8B949D',
      'neutral': '#FFFCF7',
      'secondary': '#EDE2D7',
      'tertiary': '#ABA08F',
      'highlight': '#493725'
    },
    extend: {},
  },
  plugins: [],
}

