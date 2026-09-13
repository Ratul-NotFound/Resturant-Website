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
        gold: {
          50: '#faf7ed',
          100: '#f4ecd0',
          200: '#eddca1',
          300: '#e4c76b',
          400: '#dcb33e',
          500: '#c69b28',
          600: '#a67b1e',
          700: '#845c1b',
          800: '#6d4a1b',
          900: '#5a3d1b',
          primary: '#d4af37',
          hover: '#f3e5ab',
          light: '#dfba53',
          dark: '#aa8528',
        },
        obsidian: {
          950: '#070709',
          900: '#0a0a0c',
          850: '#0f0f13',
          800: '#14141a',
          700: '#1d1d26',
          600: '#2a2a37',
        },
        champagne: {
          DEFAULT: '#faebd7',
          light: '#fff8f0',
          dark: '#d6c4aa',
        },
        bronze: {
          DEFAULT: '#8c7853',
          light: '#a9946d',
          dark: '#625338',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 50px -10px rgba(212, 175, 55, 0.4)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.2)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
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
