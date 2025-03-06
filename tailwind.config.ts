import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['"Readex Pro"', "sans-serif"],
      },
      colors: {
        primary_black: "#0C340D",
        primary_green: "#2F9519",
        primary_white: "#EBE8E8",
        secondary_green: "#A2BCA4",
      },
      fontSize: {
        "1.5xl": "22px",
      }
    },
  },
  plugins: [],
};
export default config;
