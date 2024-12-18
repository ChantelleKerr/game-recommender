/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e50914",
        secondary: "#cdcac8",
        accent: "#fadb14",
        dark: "#241e1e",
        darkGray: "#141414",
      },
      fontFamily: {
        archivo: ["Archivo"],
      },
    },
  },
  plugins: [],
};
