/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.handlebars"],
  theme: {
    extend: {
      colors: {
        "primary": "#ef4444",
        "bg-primary": "#ef4444",
      }
    },
  },
  plugins: [require("daisyui")],
};
