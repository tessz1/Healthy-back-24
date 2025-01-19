/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/src/**/*.{html,js,jsx,ts,tsx}"], // исправлено
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"], // исправлено
      },
    },
  },
  plugins: [],
};
