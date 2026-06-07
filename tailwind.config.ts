import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4b0102', // New primary color
        secondary: '#1F5233', // Emerald green
        accent: '#D4AF37', // Gold
        neutral: {
          50: '#F9F7F4',
          100: '#F2EDE8',
          200: '#E5DBD0',
          300: '#D8CAB8',
          400: '#CBC9A0',
          500: '#A8A596',
          600: '#857B70',
          700: '#5C524A',
          800: '#3D3630',
          900: '#1A1815',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'noto-sans-bengali': ['Noto Sans Bengali', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-in': 'slideIn 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
