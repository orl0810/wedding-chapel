/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'], // Elegant serif for headlines
        body: ['"Source Sans Pro"', 'sans-serif'], // Clean sans-serif for body
      },
      colors: {
        'primary-cream': '#F8F5EE', // Soft, warm cream
        'secondary-gold': '#B89B77', // Muted, elegant gold
        'accent-sapphire': '#1A374D', // Deep, calming sapphire blue
        'text-dark': '#333333',
        'text-light': '#F8F5EE',
        'border-light': '#E0DBD2',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/images/hero-bg.jpg')", // Example hero background
        'texture-subtle': "url('/assets/images/subtle-texture.png')", // Example subtle texture
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        scaleIn: 'scaleIn 0.6s ease-out forwards',
        slideInLeft: 'slideInLeft 0.7s ease-out forwards',
      }
    },
  },
  plugins: [],
}
