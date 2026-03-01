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
        brand: {
          navy: "#0b1426",
          charcoal: "#334155",
          blue: "#0b74b5",
          gold: "#b45309",
          bg: "#f6f8fc",
          surface: "#ffffff",
          border: "#dbe4f1",
          muted: "#eef3fb",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "elev-1": "0 10px 28px -18px rgba(11, 20, 38, 0.45)",
        "elev-2": "0 24px 48px -28px rgba(11, 20, 38, 0.55)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.15rem",
      },
      spacing: {
        128: "32rem",
        section: "5rem",
        "section-lg": "7rem",
      },
    },
  },
  plugins: [],
};

export default config;
