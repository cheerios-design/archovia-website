/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/**/*.js"], // Updated the folder name to 'scripts'
  theme: {
    extend: {
      colors: {
        primary: "#232323",
        secondary: "#151515",
        accent: "#f3f3f3",
        background: "#fefefe",
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"], // For titles
        body: ["Poppins", "sans-serif"], // For body text
        accent: ["Roboto", "sans-serif"], // Replace with your chosen accent font
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
