/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        "purple-1000":"#23013d",
        "purple-1100":"#3d2757",
        "purple-1200":"#2E2637",
      }
    },
  },
  plugins: [],
}

