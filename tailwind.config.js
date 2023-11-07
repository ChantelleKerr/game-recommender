/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3e50",
        secondary: "#c8c9cd",
        accent: "#38a1db",
        darkBlue: "#283645",
      },
    },
  },
  plugins: [require("daisyui")],
};
