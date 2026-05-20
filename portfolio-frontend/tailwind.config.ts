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
          navy: "rgb(var(--brand-navy-rgb))",
          charcoal: "rgb(var(--brand-charcoal-rgb))",
          blue: "rgb(var(--brand-blue-rgb))",
          gold: "#F59E0B",
          bg: "rgb(var(--brand-bg-rgb))",
          surface: "rgb(var(--brand-surface-rgb))",
          border: "rgb(var(--brand-border-rgb))",
          muted: "rgb(var(--brand-muted-rgb))",
          accent: "rgb(var(--brand-accent-rgb))"
        },
      },
      fontFamily: {
        serif: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "elev-1": "0 10px 30px -15px rgba(0, 0, 0, 0.8)",
        "elev-2": "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
        "glass": "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
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
