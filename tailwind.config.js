// import "tailwindcss/defaultTheme"
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
      "tl-wrapper",
      "bg-purple-200",
      "hover:bg-purple-300",
      "text-purple-700",
      "hover:text-purple-900",
      "bg-blue-200",
      "hover:bg-blue-300",
      "text-blue-700",
      "hover:text-blue-900",
      "bg-green-200",
      "hover:bg-green-300",
      "text-green-700",
      "hover:text-green-900",
      "bg-gray-200",
      "hover:bg-gray-300",
      "text-gray-400",
      "hover:text-primary",
    ],
  },
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
        written: ["Caveat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    // The 'group-hover' variant will be generated in addition to the defaults
    extend: {
      translate: ["group-hover"],
      ringColor: ["group-hover"],
      ringOffsetColor: ["group-hover"],
      ringOffsetWidth: ["group-hover"],
      ringOpacity: ["group-hover"],
      ringWidth: ["group-hover"],
      scale: ["group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
