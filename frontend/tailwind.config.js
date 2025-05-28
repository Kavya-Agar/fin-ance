/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      keyframes: {
        moveUp: {
          '0%': { transform: 'translateY(0)', opacity: '0.7' },
          '80%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
      },
      animation: {
        // You can adjust the durations as you like
        'moveUp-10s': 'moveUp 10s linear infinite',
        'moveUp-12s': 'moveUp 12s linear infinite',
        'moveUp-14s': 'moveUp 14s linear infinite',
        'moveUp-16s': 'moveUp 16s linear infinite',
      },
    },
  },
  plugins: [],
}

