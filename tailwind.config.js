/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sealia-green': '#A7E3B5',
        'sealia-deep': '#1E4D2B',
        'sealia-gray': '#e0e0e0',
        'sealia-mint': '#A7E3B5',
        'sealia-forest': '#1E4D2B',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}