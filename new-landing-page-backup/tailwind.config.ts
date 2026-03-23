import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // FrankX Brand Colors
        'frankx-purple': '#6B46C1',
        'frankx-blue': '#00D4FF',
        'frankx-gold': '#FFD700',
        'frankx-charcoal': '#1A1A2E',
        'frankx-cloud': '#F7F7F7',

        // Arcanean Spectrum
        'arcanea-void': '#0a0a0f',
        'arcanea-shadow': '#1a1a2e',
        'arcanea-deep': '#2d2d44',
        'arcanea-dusk': '#3f3f5a',
        'arcanea-twilight': '#525270',
        'arcanea-mist': '#656586',
        'arcanea-slate': '#79799c',
        'arcanea-ash': '#8d8db2',
        'arcanea-silver': '#a1a1c8',
        'arcanea-pearl': '#b5b5de',
        'arcanea-opal': '#c9c9f4',
        'arcanea-transcendent': '#d6d9f2',

        // Academy Colors
        'harmonix-red': '#ff6b6b',
        'scripta-teal': '#4ecdc4',
        'lumina-blue': '#45b7d1',
        'kinetix-green': '#96ceb4',
        'syntaxa-yellow': '#feca57',
        'nexus-purple': '#ff9ff3',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
