const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        jersey: ["var(--font-jersey)", ...fontFamily.jersey],
        inter: ["var(--font-inter)", ...fontFamily.inter],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light", // first theme will be the default
      "dark",
      "cupcake", // you can add more themes if you want
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
  },
  darkMode: 'class',
};
