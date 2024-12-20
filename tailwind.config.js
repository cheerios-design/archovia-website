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
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
