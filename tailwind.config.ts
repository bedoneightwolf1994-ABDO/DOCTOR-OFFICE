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
          600: '#a3791f',
          500: '#c9a24b',
          400: '#e0c179',
        },
        gold: {
          500: '#c9a24b',
          400: '#e0c179',
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
