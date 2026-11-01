import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nb: {
          950: "#060A12",
          900: "#09101E",
          850: "#0E182B",
          800: "#13213A",
          700: "#1C3156",
          blue: "#2563EB",
          cyan: "#38BDF8",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        bengali: ["var(--font-bengali)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
