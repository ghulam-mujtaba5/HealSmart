/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a', // green-600
        secondary: '#2563eb', // blue-600
        muted: '#f1f5f9', // slate-100
      },
    },
  },
  plugins: [],
};
