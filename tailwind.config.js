/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-theme-light': 'linear-gradient(90deg, hsla(288, 20%, 75%, 1) 0%, hsla(197, 65%, 42%, 1) 100%)',
        'bg-theme-dark': 'linear-gradient(90deg, hsla(205, 46%, 10%, 1) 0%, hsla(191, 28%, 23%, 1) 50%, hsla(207, 41%, 27%, 1) 100%)',
      }
    },
  },
  plugins: [],
}

