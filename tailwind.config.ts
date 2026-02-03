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
        // Backgrounds
        bg: {
          DEFAULT: "#1A1714",
          warm: "#211D19",
        },
        surface: {
          DEFAULT: "#2A2520",
          hover: "#332D26",
          elevated: "#3A332B",
        },
        // Accent - Copper
        copper: {
          DEFAULT: "#C4875A",
          bright: "#D4976A",
          dim: "rgba(196,135,90,0.10)",
          glow: "rgba(196,135,90,0.25)",
        },
        // Text - Cream
        cream: {
          DEFAULT: "#F2E8DA",
          secondary: "#CFC0B0",
          muted: "#9A8E82",
          faint: "#6A6058",
        },
        // Pitch
        pitch: {
          dark: "#1A2418",
          line: "#2A3A28",
        },
        // Semantic
        green: {
          accent: "#6A9A60",
        },
        amber: {
          accent: "#D0B466",
        },
        red: {
          accent: "#D06666",
        },
        border: "#3E362C",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(36px, 4.2vw, 56px)", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
        "section": ["28px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "card-title": ["15px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "sm": "40px",
        "md": "64px",
        "lg": "88px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
