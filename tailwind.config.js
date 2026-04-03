/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-cream': '#F8F5EE',
        'accent-sapphire': '#1A374D',
        'secondary-gold': '#B89B77',
        'text-dark': '#333333',
        'text-light': '#F8F5EE',
        'wix-ink': '#2c2c2c',
        'wix-paper': '#ffffff',
        'wix-warm': '#faf8f5'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Source Sans 3', 'sans-serif']
      },
      boxShadow: {
        'wix-card': '0 12px 40px -12px rgba(26, 55, 77, 0.12)',
        'wix-soft': '0 4px 24px rgba(26, 55, 77, 0.06)'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        gentleScale: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'gentle-scale': 'gentleScale 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards'
      }
    }
  },
  plugins: []
};