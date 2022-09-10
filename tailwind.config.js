/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./tests/**/app/**/*.hbs'],
  theme: {
    extend: {},
  },
  plugins: [],
  ...(process.env.EMBER_ENV == 'development') && {
    safelist: [
      { pattern: /.*/ },
    ],
  },
};
