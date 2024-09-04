/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "algo":'#0E1222',
        "card":'#ADD8E6',
        "cardD":'#1A2031'
      },
    },
  },
  plugins: [],
}

