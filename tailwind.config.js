/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8102E',
          darkred: '#9B0A21',
          crimson: '#E50914',
          gold: '#F4A61D',
          amber: '#E69500',
          green: '#488A3C',
          dark: '#141212',
          charcoal: '#1E1B1B',
          cream: '#FFF9F2',
          surface: '#FDFBF7'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        bangla: ['var(--font-hind-siliguri)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'custom-card': '0 12px 36px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'dish': '0 25px 50px -12px rgba(190, 24, 43, 0.25)',
        'glow-gold': '0 0 25px rgba(244, 166, 29, 0.45)',
        'glow-red': '0 0 30px rgba(200, 16, 46, 0.45)'
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-4deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-1deg)' }
        },
        'float-alt': {
          '0%, 100%': { transform: 'translateY(0px) rotate(2deg)' },
          '50%': { transform: 'translateY(-9px) rotate(6deg)' }
        },
        'bob-drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-7px) rotate(1deg)' }
        },
        'fiery-sheen': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'shimmer-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(150%)' }
        },
        'ember-glow-border': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(244, 166, 29, 0.3), 0 20px 45px -10px rgba(0, 0, 0, 0.45)',
            borderColor: 'rgba(244, 166, 29, 0.45)'
          },
          '50%': {
            boxShadow: '0 0 30px 4px rgba(244, 166, 29, 0.55), 0 25px 55px -10px rgba(190, 24, 43, 0.5)',
            borderColor: 'rgba(254, 215, 170, 0.85)'
          }
        },
        'badge-pop': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4) rotate(12deg)' },
          '75%': { transform: 'scale(0.9) rotate(-6deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        }
      },
      animation: {
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'float-alt': 'float-alt 4.5s ease-in-out infinite',
        'bob-drift': 'bob-drift 3.2s ease-in-out infinite',
        'fiery-sheen': 'fiery-sheen 3.6s ease infinite',
        'ember-glow': 'ember-glow-border 3.5s ease-in-out infinite',
        'badge-pop': 'badge-pop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    },
  },
  plugins: [],
}
