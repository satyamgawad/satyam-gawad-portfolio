/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#080a12',
        panel: '#10131f',
        brand: '#8b5cf6',
        aqua: '#22d3ee',
      },
    },
  },
  plugins: [],
}
