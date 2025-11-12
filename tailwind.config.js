/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/context/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 20px rgba(0, 255, 255, 0.5)',
      },
    },
  },
  safelist: [
    'bg-gradient-to-r',
    'from-yellow-400','to-orange-500',
    'from-blue-400','to-indigo-500',
    'from-green-400','to-emerald-500',
    'from-purple-400','to-pink-500',
    'from-red-400','to-rose-500',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};