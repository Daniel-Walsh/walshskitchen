// import "tailwindcss/defaultTheme"

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#e83333",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
