/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#D12020",
        "secondry-1": "#D9D9D9",
      },
    },
  },
  plugins: [],
}

