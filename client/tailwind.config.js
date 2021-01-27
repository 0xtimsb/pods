const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },

    extend: {
      colors: {
        cream: {
          50: "#F6F2EF",
          100: "#EBE8E6",
          200: "#E2DEDB",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
