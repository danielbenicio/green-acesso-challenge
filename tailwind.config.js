module.exports = {
  plugins: [require('tailwind-scrollbar')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: '#00B5CC',
        app: '#060B28',
      },
      backgroundImage: {
        hero: `url('/background.png')`,
      },
      backgroundColor: {
        app: '#060B28',
      },
    },
  },
}
