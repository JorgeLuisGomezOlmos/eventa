/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BE1622",
          dark: "#8F0F19",
          light: "#E63946",
        },

        brandDark: "#171717",
        brandDarkSoft: "#262626",

        background: "#F8F8F8",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },

  plugins: [],
};

