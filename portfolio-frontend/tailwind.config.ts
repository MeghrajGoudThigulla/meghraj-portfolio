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
          navy: "#FFFFFF",
          charcoal: "#94A3B8",
          blue: "#38BDF8",
          gold: "#F59E0B",
          bg: "#0B0F19",
          surface: "#111827",
          border: "#1E293B",
          muted: "#1E293B",
          accent: "#8B5CF6"
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
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
