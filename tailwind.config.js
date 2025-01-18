/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/**/*.js", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#232323",
        secondary: "#151515",
        accent: "#f1f1f1",
        background: "#fefefe",
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        accent: ["Roboto", "sans-serif"],
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    require("tailwindcss-motion"),
  ],
};
