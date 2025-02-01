/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark","forest","halloween","business","dim","night","valentine","cupcake","bumblebee","emerald","corporate","dracula"],
  },
  plugins: [require("daisyui")],
}

