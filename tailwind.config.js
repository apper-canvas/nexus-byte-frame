/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0efff',
          100: '#e4e1ff',
          500: '#5B47E0',
          600: '#4c3acc',
          700: '#3d2eb8',
        },
        secondary: {
          50: '#f2f0ff',
          100: '#e7e4ff',
          500: '#7C6FE8',
          600: '#6b5ed6',
          700: '#5a4dc4',
        },
        accent: {
          50: '#fff2f2',
          100: '#ffe1e1',
          500: '#FF6B6B',
          600: '#f45555',
          700: '#e93f3f',
        },
        surface: '#FFFFFF',
        background: '#F7F8FA',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}