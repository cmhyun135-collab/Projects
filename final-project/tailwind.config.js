/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emotion: {
          joy: "#FDE68A",
          sadness: "#93C5FD",
          anger: "#FCA5A5",
          calm: "#A7F3D0",
          anxiety: "#F9A8D4",
          excitement: "#FBBF24"
        }
      }
    }
  },
  plugins: []
};
