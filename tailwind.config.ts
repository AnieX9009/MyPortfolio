/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F3F1EA',
        ink: '#202022',
        muted: '#77756F',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Fustat', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      lineHeight: {
        tightest: '0.95',
      },
    },
  },
  plugins: [],
}
