/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      colors: {
        paper: '#FDFCF8',
        ink: '#2C3333',
        orange: '#E85D04',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}