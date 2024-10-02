// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    extend: {
      borderRadius: {
        '7xl': '7.5rem',
      },
      fontFamily: {
        iranyekan: ['IRANYekan', 'sans-serif'], 
      },
    },
  },
  plugins: [daisyui],
}
