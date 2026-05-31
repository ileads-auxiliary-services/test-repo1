import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Deep navy foundation
        ink: {
          DEFAULT: "#0a1230",
          950: "#050a1f",
          900: "#0a1230",
          800: "#101a45",
          700: "#16245c",
        },
        navy: {
          50: "#eef2ff",
          100: "#dbe3ff",
          200: "#b7c7ff",
          300: "#8aa3ff",
          400: "#5b77f5",
          500: "#3a52e4",
          600: "#2a3bc4",
          700: "#222f9c",
          800: "#1d287c",
          900: "#16245c",
        },
        // Electric blue accent
        electric: {
          50: "#ecfbff",
          100: "#d3f5ff",
          200: "#aceeff",
          300: "#73e3ff",
          400: "#34d0ff",
          500: "#06b4f2",
          600: "#0090cf",
          700: "#0073a7",
          800: "#066089",
          900: "#0b5072",
        },
        slatey: {
          50: "#f6f8fc",
          100: "#eef1f8",
          200: "#dde3ef",
          300: "#c2cce0",
          400: "#94a3c4",
          500: "#6b7ba3",
          600: "#4f5d82",
          700: "#3d496a",
          800: "#2a3350",
          900: "#1a2138",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,18,48,0.04), 0 12px 32px -12px rgba(10,18,48,0.18)",
        lift: "0 24px 60px -20px rgba(10,18,48,0.35)",
        glow: "0 0 0 1px rgba(52,208,255,0.25), 0 18px 50px -18px rgba(6,180,242,0.55)",
      },
      backgroundImage: {
        "grid-navy":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
