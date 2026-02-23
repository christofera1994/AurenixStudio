import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12",
        accent: "#C9A84C",
        background: "#FAF8F5",
        "text-dark": "#2A2A35",
      },
      fontFamily: {
        sans: "var(--font-inter), system-ui, sans-serif",
        drama: "var(--font-playfair), Georgia, serif",
        mono: "var(--font-jetbrains), monospace",
      },
      borderRadius: {
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
      },
      animation: {
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "aurora-1": "aurora-1 28s ease-in-out infinite",
        "aurora-2": "aurora-2 32s ease-in-out infinite",
        "aurora-3": "aurora-3 24s ease-in-out infinite",
        spin: "spin 8s linear infinite",
        laser: "laser 3s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(15%, -10%) scale(1.08)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(-12%, 12%) scale(1.05)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(10%, -8%) scale(1.06)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        laser: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        wave: {
          "0%, 100%": { strokeDashoffset: "200" },
          "50%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
