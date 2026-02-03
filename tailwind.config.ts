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
          DEFAULT: "#100E0C",
          warm: "#171412",
        },
        surface: {
          DEFAULT: "#1E1A16",
          hover: "#262119",
          elevated: "#2A241C",
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
          DEFAULT: "#F0E6D6",
          secondary: "#B8A898",
          muted: "#7A6E62",
          faint: "#4A423A",
        },
        // Pitch
        pitch: {
          dark: "#1A2418",
          line: "#2A3A28",
        },
        // Semantic
        green: {
          accent: "#5A8A50",
        },
        amber: {
          accent: "#C4A85A",
        },
        red: {
          accent: "#C45A5A",
        },
        border: "#2A241C",
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
