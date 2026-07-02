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
        // Brand palette — arancione dominante, navy come inchiostro. Vedi DECISIONS.md
        flame: {
          DEFAULT: "#F1500F", // arancione vivido del brand — SFONDO dominante
          soft: "#FF6A34",
          deep: "#D63F07",
          bright: "#FC5300",
        },
        ink: {
          DEFAULT: "#0A2A4C", // navy — testo / brand
          soft: "#123f6d",
          light: "#1B4B7A",
        },
        sky: {
          DEFAULT: "#2E93C8", // azzurro pennellato della spirale — accento
          soft: "#63b4df",
        },
        paper: {
          DEFAULT: "#FBF1E4", // crema — pannelli di contrasto
          soft: "#F6E7D5",
          deep: "#EEDBC4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.12em",
        wide2: "0.22em",
      },
      maxWidth: {
        wrap: "1240px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "slow-spin": "slow-spin 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
