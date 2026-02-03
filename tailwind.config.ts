import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          DEFAULT: '#100E0C',
          warm: '#171412',
        },
        surface: {
          DEFAULT: '#1E1A16',
          hover: '#262119',
          elevated: '#2A241C',
        },
        // Accent - Copper
        copper: {
          DEFAULT: '#C4875A',
          bright: '#D4976A',
          dim: 'rgba(196, 135, 90, 0.10)',
          glow: 'rgba(196, 135, 90, 0.25)',
        },
        // Text - Cream
        cream: {
          DEFAULT: '#F0E6D6',
          secondary: '#B8A898',
          muted: '#7A6E62',
          faint: '#4A423A',
        },
        // Pitch
        pitch: {
          dark: '#1A2418',
          line: '#2A3A28',
        },
        // Semantic
        green: {
          accent: '#5A8A50',
        },
        amber: {
          accent: '#C4A85A',
        },
        red: {
          accent: '#C45A5A',
        },
        // Border
        border: '#2A241C',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom type scale
        'hero': ['clamp(36px, 4.2vw, 56px)', { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'section': ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'card-title': ['15px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'sm': '40px',
        'md': '64px',
        'lg': '88px',
      },
      borderRadius: {
        'card': '10px',
        'button': '6px',
        'tag': '3px',
      },
      boxShadow: {
        'copper-glow': '0 0 16px rgba(196, 135, 90, 0.10)',
        'copper-hover': '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 28px rgba(196, 135, 90, 0.10)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        'nav': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
