import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#06B6D4",
          blue: "#2563EB",
          ink: "#0B1220",
          mist: "#F6FAFD",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 45%, #2563EB 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.12) 100%)",
        "brand-secondary":
          "linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        glow: "0 10px 30px -10px rgba(37, 99, 235, 0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        floatY: "floatY 4s ease-in-out infinite",
        slideInRight: "slideInRight 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        fadeIn: "fadeIn 220ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
