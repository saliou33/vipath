/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', defaultTheme.fontFamily.sans],
        rubik: ['"Rubik"', defaultTheme.fontFamily.sans],
        lora: ['"Lora"', defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
