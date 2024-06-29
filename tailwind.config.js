import formsPlugin from "@tailwindcss/forms";
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        nunito: ["Nunito Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        mulish: ["Mulish Variable", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cyan: {
          800: "#345a35",
          700: "#3a643b",
          600: "#4e744f",
          300: "#89a289",
        },
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1025px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },

  plugins: [formsPlugin(), flowbite.plugin()],
};
