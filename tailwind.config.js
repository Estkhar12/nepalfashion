/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#D81B60',
          'pink-dark': '#C2185B',
          'pink-deep': '#880E4F',
          'pink-light': '#FCE4EC',
          'pink-soft': '#FDF2F4',
          wine: '#4A0E2E',
          navy: '#0B192C',
          'navy-dark': '#07101E',
          'navy-light': '#1E293B',
          gold: '#D4AF37',
          'gold-light': '#FBF6E9',
          cream: '#FFF9F5',
          'cream-dark': '#F5EBE1',
          'cream-border': '#EFE2D3',
        }
      },
      fontFamily: {
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(216, 27, 96, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(11, 25, 44, 0.06), 0 4px 10px -2px rgba(0,0,0,0.03)',
        'glow-pink': '0 0 25px rgba(216, 27, 96, 0.35)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
}
