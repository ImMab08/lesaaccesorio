/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#F2F2F2",
        tertiary: "#E0E0E0",
        title: "#2D2D2D",
        subtitle: "#5A5A5A",
        border: "#D9D9D9",        
        background: "#434343",
      },
      backgroundImage: {
        'hero': "url('/img/fondo.jpg')",
        'inicio': "url('/img/images.jpg')"
      }
    },
  },
  plugins: [],
};
