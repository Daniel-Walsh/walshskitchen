// import "tailwindcss/defaultTheme"
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "ping-once": "ping 1s cubic-bezier(0, 0, 0.2, 1) forwards",
      },
      colors: {
        "primary-light": defaultTheme.colors.red[100],
        primary: defaultTheme.colors.red[500],
        "primary-dark": defaultTheme.colors.red[700],
      },
      fontFamily: {
        display: ["Pacifico", ...defaultTheme.fontFamily.serif],
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        comic: ["Pangolin", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
