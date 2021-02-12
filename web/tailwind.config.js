const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter", "Poppins", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        green: colors.green,
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
