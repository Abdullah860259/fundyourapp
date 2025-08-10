module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        bounce: 'bounce 1.2s infinite',
      },
      delay: {
        0: '0s',
        200: '0.2s',
        400: '0.4s',
      },
    },
  },
}