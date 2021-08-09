// import "tailwindcss/defaultTheme"
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#e83333",
      },
      fontFamily: {
        display: ["Pacifico", ...defaultTheme.fontFamily.serif],
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
