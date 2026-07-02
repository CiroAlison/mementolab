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
        // Brand palette — see DECISIONS.md
        ink: {
          DEFAULT: "#082E56", // navy — primary text / brand
          soft: "#123f6d",
          light: "#1B4B7A",
        },
        flame: {
          DEFAULT: "#EB5634", // burnt orange — accent
          soft: "#f0744f",
          deep: "#c8442a",
        },
        paper: {
          DEFAULT: "#FAF6EF", // warm crema — background
          soft: "#F3ECE0",
          deep: "#EDE3D3",
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
