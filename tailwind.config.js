/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        active: '0 0px 10px 0px #fff',
      },
      keyframes: {
        slideInLeft: {
          '0%': { left: '100%' },
          '100%': { left: '-10%' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 3s linear forwards',
      },
    },
  },
  plugins: [],
};
