/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/**/*.js"], // Updated the folder name to 'scripts'
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        secondary: "#F4C430",
        accent: "#66BB6A",
        background: "#F8F4E3",
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
