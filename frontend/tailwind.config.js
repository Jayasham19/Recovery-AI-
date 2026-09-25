/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          950: '#000000',
          900: '#06080c',
          850: '#0c0f14',
          800: '#12161f',
        },
        coral: {
          DEFAULT: '#FF5733',
          400: '#ff6f4e',
          500: '#FF5733',
          600: '#e04320',
          glow: 'rgba(255, 87, 51, 0.45)',
        },
        olive: {
          card: '#1f2520',
          cardHover: '#29322b',
          border: '#333e35',
          text: '#9ba89e',
        }
      },
      fontFamily: {
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'coral-glow': '0 0 30px -5px rgba(255, 87, 51, 0.45)',
        'coral-glow-sm': '0 0 15px -3px rgba(255, 87, 51, 0.35)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}
