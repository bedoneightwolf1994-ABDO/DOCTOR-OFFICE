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
          50: '#fbf7ea',
          100: '#f5ecc9',
          200: '#ecdba0',
          300: '#e6cd8c',
          400: '#e0c179',
          500: '#c9a24b',
          600: '#a3791f',
          700: '#80600f',
          800: '#5e460b',
          900: '#3d2d07',
        },
        gold: {
          50: '#fbf7ea',
          100: '#f5ecc9',
          200: '#ecdba0',
          300: '#e6cd8c',
          400: '#e0c179',
          500: '#c9a24b',
          600: '#a3791f',
          700: '#80600f',
          800: '#5e460b',
          900: '#3d2d07',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      }
    },
  },
  plugins: [],
}
export default config
