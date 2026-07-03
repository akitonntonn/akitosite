import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#a855f7",
          violet: "#7c3aed",
          blue: "#3b82f6",
          sky: "#38bdf8",
          pink: "#ec4899",
          rose: "#f472b6",
        },
      },
      fontFamily: {
        display: [
          "'Trajan Pro'",
          "'Times New Roman'",
          "Georgia",
          "serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Hiragino Kaku Gothic ProN'",
          "'Noto Sans JP'",
          "'Yu Gothic'",
          "Meiryo",
          "sans-serif",
        ],
      },
      boxShadow: {
        neon: "0 0 20px rgba(168,85,247,0.45), 0 0 40px rgba(59,130,246,0.25)",
        "neon-pink": "0 0 24px rgba(236,72,153,0.5), 0 0 48px rgba(168,85,247,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(0, -24px) scale(1.06)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        progress: {
          "0%": { width: "6%" },
          "100%": { width: "96%" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 3s linear infinite",
        "spin-slower": "spin-slow 6s linear infinite reverse",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        progress: "progress 2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
