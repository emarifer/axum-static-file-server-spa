/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
      },
      fontFamily: {
        kanit: ["Kanit", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
