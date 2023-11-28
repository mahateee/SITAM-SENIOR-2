/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily:{
      'mono': ['ui-monospace', 'SFMono-Regular',]
    },  screens: {
      'xs': '0px',
      

      'sm': '640px',
      

      'md': '768px',
     
      'lg': '1024px',
      

      'xl': '1280px',
      

      '2xl': '1536px',
    
      'custom': '1600px',
  
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  
  ],
};
