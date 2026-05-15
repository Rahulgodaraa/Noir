/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // safe to keep
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      }
    },
  },
  plugins: [],
};
