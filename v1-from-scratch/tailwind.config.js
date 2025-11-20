/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Vibe OS Core Palette
        midnight: {
          950: '#060b24', // Deepest background
          900: '#0f172a',
          800: '#1e293b',
        },
        aurora: {
          500: '#43bfe3', // Cyan/Blue
          400: '#ab47c7', // Purple/Pink
          300: '#5c88f5', // Deep Blue
        },
        glass: {
          stroke: 'rgba(255, 255, 255, 0.1)',
          surface: 'rgba(15, 23, 42, 0.6)',
          highlight: 'rgba(255, 255, 255, 0.05)',
        },
        // Legacy Palette Support
        primary: {
          50: '#f8f7ff',
          100: '#f1efff',
          200: '#e3e0ff',
          300: '#d0caff',
          400: '#b9acff',
          500: '#9f8bff',
          600: '#8362ff',
          700: '#6943ff',
          800: '#5536d6',
          900: '#422ea9',
          950: '#332780',
        },
      },
      backgroundImage: {
        'vibe-aurora': 'radial-gradient(circle at 20% 20%, rgba(67, 191, 227, 0.22), transparent 45%), radial-gradient(circle at 80% 10%, rgba(171, 71, 199, 0.18), transparent 55%)',
        'vibe-midnight': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f1629 100%)',
        'vibe-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'vibe-noise': "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      boxShadow: {
        'vibe-glow': '0 0 40px rgba(67, 191, 227, 0.15), 0 0 80px rgba(67, 191, 227, 0.1)',
        'vibe-pulse': '0 0 40px rgba(171, 71, 199, 0.15), 0 0 80px rgba(171, 71, 199, 0.1)',
        'vibe-depth': '0 25px 60px rgba(8, 15, 33, 0.4), 0 12px 25px rgba(8, 15, 33, 0.3)',
        'vibe-floating': '0 35px 80px rgba(8, 15, 33, 0.35), 0 15px 35px rgba(8, 15, 33, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
      animation: {
        'aurora-flow': 'auroraFlow 20s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        auroraFlow: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateX(-10px) translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateX(10px) translateY(-5px) rotate(-1deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}
