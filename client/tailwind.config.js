import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0a0a0a',
        surfaceSoft: '#1a1a1a',
        accent: '#f97316',
        accentDark: '#ea580c',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(249, 115, 22, 0.15)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(249, 115, 22, 0.16), transparent 40%), radial-gradient(circle at bottom right, rgba(234, 88, 12, 0.15), transparent 35%)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(24px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 12s linear infinite alternate',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
