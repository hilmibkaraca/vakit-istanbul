import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Islamic color palette
        islamic: {
          50: '#f0f9f3',
          100: '#dbf0e1',
          200: '#bae1c8',
          300: '#8ccba6',
          400: '#5aad7e',
          500: '#3a8f60',
          600: '#2d734c',
          700: '#255c3e',
          800: '#204933',
          900: '#1b3d2c',
          950: '#0e2218',
        },
        gold: {
          50: '#fffef3',
          100: '#fffce6',
          200: '#fff8c0',
          300: '#fff08a',
          400: '#ffe454',
          500: '#ffd60a',
          600: '#e6b800',
          700: '#cc9500',
          800: '#a67c00',
          900: '#876600',
          950: '#4d3900',
        },
        sage: {
          50: '#f6f7f5',
          100: '#e9ebe6',
          200: '#d5d9cd',
          300: '#b8c0ab',
          400: '#96a086',
          500: '#7a8469',
          600: '#606853',
          700: '#4e5444',
          800: '#414538',
          900: '#383c31',
          950: '#1c1f18',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'arabic': ['Amiri', 'serif'],
        'primary': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl2': '1rem',
        '2xl2': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'islamic': '0 4px 20px rgba(58, 143, 96, 0.1)',
        'gold': '0 4px 20px rgba(255, 214, 10, 0.1)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;