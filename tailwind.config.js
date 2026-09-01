/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Geist"', 'system-ui', 'sans-serif'],
        body: ['"Geist"', 'system-ui', 'sans-serif']
      },
      colors: {
        accent: {
          50: '#eef2fc',
          100: '#d6e0f7',
          200: '#b3c7f0',
          300: '#89a9e7',
          400: '#6b8fdf',
          500: '#4675d8',
          600: '#3a5fbf',
          700: '#314c9e',
          800: '#2b3f82',
          900: '#26366b',
        },
        surface: {
          50: '#f8f7f5',
          100: '#f0eeeb',
          200: '#e2ded9',
          300: '#cdc6bf',
          400: '#b4aaa1',
          500: '#827973',
          600: '#6c645f',
          700: '#544e4a',
          800: '#3d3835',
          900: '#2a2624',
          950: '#1e1b1a'
        },
        warm: {
          50: '#faf8f6',
          100: '#f3eeea',
          200: '#e7ddd5',
          300: '#d6c7b8',
          400: '#c2ad99',
          500: '#b39782',
          600: '#a6846f',
          700: '#8b6f5e',
          800: '#735c50',
          900: '#5e4c43',
          950: '#322723'
        }
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
