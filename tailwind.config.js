module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        80: "20rem",
        128: "32rem",
      },
      margin: {
        y: {
          60: "15.5rem",
        },
      },
      gridTemplateColumns: {
        32: "repeat(32, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
