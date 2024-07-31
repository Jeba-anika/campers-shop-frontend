/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      'primary': '#01204E',
      // 'primary': '#466A8B',
      'cs-ash': '#8B949D',
      'neutral': '#F6DCAC',
      // 'neutral': '#FFFCF7',
      'secondary': '#028391',
      // 'secondary': '#EDE2D7',
      'tertiary': '#FEAE6F',
      // 'tertiary': '#ABA08F',
      'highlight': '#493725',
      'cs-bg': '#F1F8E8'
    },
    extend: {},
  },
  plugins: [],

}

