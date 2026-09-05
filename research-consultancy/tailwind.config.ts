import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a1628',
          900: '#0f2140',
          800: '#16324f',
          700: '#1e4363',
        },
        teal: {
          600: '#0f766e',
          500: '#14b8a6',
          400: '#2dd4bf',
        },
        gold: {
          500: '#c9a24b',
          400: '#d9b96a',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
