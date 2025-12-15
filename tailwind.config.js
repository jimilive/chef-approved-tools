/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-4',
    'md:grid-cols-2',
    'lg:grid-cols-4',
    'lg:grid-cols-[1.75fr_2fr_1fr_1fr]',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}