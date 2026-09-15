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
        brand: {
          red: '#C8102E',
          darkred: '#9B0A21',
          gold: '#F4A61D',
          green: '#488A3C',
          dark: '#1A1818',
          cream: '#FFF9F2',
        },
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
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'var(--font-montserrat)', 'Oswald', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'custom-card': '0 12px 36px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'dish': '0 20px 40px -10px rgba(190, 24, 43, 0.15)',
        'gold-glow': '0 4px 20px -2px rgba(197, 160, 89, 0.18)',
        'plate-pop': '0 20px 35px -8px rgba(0, 0, 0, 0.22), 0 8px 16px -4px rgba(0, 0, 0, 0.12)',
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
