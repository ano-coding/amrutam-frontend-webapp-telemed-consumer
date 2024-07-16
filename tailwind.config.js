import formsPlugin from "@tailwindcss/forms";
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        dinpro: ["DINPro", "sans-serif"],
        nexalight: ["Nexa Light", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        mulish: ["Mulish Variable", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "header-leaves": "url('/background.png')",
      },
      letterSpacing: {
        tight: "-0.01em",
      },
      keyframes: {
        Morph1: {
          "0%": {
            transform: "translateX(-60%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        Morph2: {
          "0%": {
            transform: "translateX(60%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        Morph1: "Morph1 1.5s",
        Morph2: "Morph2 1.5s",
      },
      colors: {
        customgreen: {
          100: "#eaf2ea",
          200: "#f3faf1",
          300: "#dceedc",
          700: "#4e8750",
          800: "#3a643b",
          400: "#41a647",
          500: "#3a643b2e",
          600: "#3a643b29",
        },
        customlightgreen: {
          100: "#9db29d",
          200: "#3a643b1f",
          300: "#dbe3dc63",
        },
        customgray: {
          100: "#1F1F1F",
          200: "#bdbdbd",
          300: "#cdcdcd",
          400: "#8d8d8d",
          500: "#7b7b7b",
          700: "#474747",
          800: "#bcbcbc",
        },
        customyellow: {
          200: "#fff7e2",
        },
        customred: {
          500: "#d85454",
        },
        oldlace: "#fff7e2",
        ghostWhite: "#F7F7FC",
        mintcream: {
          200: "#FFFBF2",
        },
        cyan: {
          800: "#345a35",
          700: "#3a643b",
          600: "#4e744f",
          300: "#89a289",
        },
        darkolivegreen: {
          100: "rgba(58, 100, 59, 0.39)",
          200: "#3a643b",
          300: "#4e8750",
        },
        lightolivegreen: "#f2fbf2",
        seagreen: "#618a61",
        darkslategray: {
          100: "#474747",
          200: "#3c3c3c",
          300: "#2e2f2e",
        },
        dimgray: {
          100: "#646665",
          200: "#656565",
          300: "#585858",
          400: "#fef6ed",
        },
        "primary-tint-1": "#ddefdd",
        "primary-tint-2": "#eaf2ea",
        black: "#000",
        whitesmoke: {
          100: "#f4f4f4",
          200: "#ededed",
          300: "#e0e8e2",
        },
        honeydew: "#dceedc",
        beige: "rgba(207, 235, 207, 0.5)",
        lightgray: {
          100: "#d4d4d4",
          200: "#cdcdcd",
        },
        lightcustomgray: {
          100: "#0b0b0bc9",
          200: "#0b0b0b",
          300: "#838383",
        },
        // gray: {
        //   100: "#7b7b7b",
        //   200: "#767676",
        //   300: "#f0f0f0",
        //   400: "#e2e2e2",
        //   500: "#676767",
        // },
        antiquewhite: "#e6dec9",
        customWhite: "#fff7e2",
        offWhite: {
          100: "#fafafa",
          200: "#f5f3fc",
          300: "#c5c5c5",
        },
        customcream: "#fcddb8",
        custommustard: "#b26b17",
        customblack: {
          100: "#0c0c0c",
        },
        customblue: "#0c140c",
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
