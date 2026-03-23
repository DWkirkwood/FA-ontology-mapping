/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#ffffff',
          card: '#f8fafc',
          border: '#e2e8f0'
        },
        primary: {
          DEFAULT: '#1a73e8',
          hover: '#1557b0'
        }
      }
    },
  },
  plugins: [],
}
