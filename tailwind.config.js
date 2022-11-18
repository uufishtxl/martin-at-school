/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    /**
     * @quasarSizes
     *   xs - up to 599px;
     *   sm - 600 - 1023px;
     *   md - 1024 - 1439px;
     *   lg - 1440 - 1919px;
     *   xl - 1920px and up;
     */
    screens: {
      sm: '600px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
    extend: {},
  },
  plugins: [],
}
