/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      'mono': ['ui-monospace', 'SFMono-Regular',]
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  
  ],
};
