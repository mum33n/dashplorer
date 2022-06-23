/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, html, jsx, tsx }'],
  theme: {
    extend: {
      colors:{
        'bgColor':'#095565',
        'popOver':'#0A637555',
        'btnColor':'#05BAE0',
        'transparent':'#0F172Af6'
      }
    },
  },
  plugins: [],
}
