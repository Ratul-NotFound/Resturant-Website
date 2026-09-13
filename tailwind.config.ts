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
          50: '#faf7f0',
          100: '#f4ede0',
          200: '#eadbc3',
          300: '#dec4a0',
          400: '#d1ab7b',
          500: '#c5a059',
          600: '#ad8745',
          700: '#8e6c37',
          800: '#755831',
          900: '#61492b',
          primary: '#c5a059',
          hover: '#dfbe7a',
          light: '#e8d39b',
          dark: '#9e7d3b',
        },
        obsidian: {
          950: '#0c0b0a',
          900: '#12110f',
          850: '#181614',
          800: '#211e1b',
          700: '#2d2925',
          600: '#3e3933',
        },
        champagne: {
          DEFAULT: '#f7f4ed',
          light: '#fcfbf8',
          dark: '#ded7c8',
        },
        bronze: {
          DEFAULT: '#9e8a6e',
          light: '#b8a58b',
          dark: '#6e5e49',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(197, 160, 89, 0.18)',
        'gold-glow-lg': '0 8px 30px -4px rgba(197, 160, 89, 0.25)',
        'gold-sm': '0 2px 10px rgba(197, 160, 89, 0.12)',
        'card-dark': '0 12px 36px -4px rgba(0, 0, 0, 0.85)',
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
