const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Fonts are being loaded on `src/pages/_document.tsx`, so if you want to
      // change the font, you need to change the url there and name here.
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "telegram-bg": "var(--telegram-bg-color)",
        "telegram-text": "var(--telegram-text-color)",
        "telegram-hint": "var(--telegram-hint-color)",
        "telegram-link": "var(--telegram-link-color)",
        "telegram-button": "var(--telegram-button-color)",
        "telegram-button-text": "var(--telegram-button-text-color)",
        "telegram-secondary-bg": "var(--telegram-secondary-bg-color)",
      },
    },
  },
  plugins: [],
};
