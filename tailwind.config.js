/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(300px)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'showCart': 'slideIn .5s ease',
      },
      backgroundColor: {
        'overlay': 'rgba(0,0,0,0.3)'
      },
      boxShadow: {
        'modal': 'rgba(0, 0, 0, 0.2) 0px 6px 32px'
      },
      maxWidth: {
        "xxs": '22rem'
      },
      colors: {
        'primary': '#3861fb'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
