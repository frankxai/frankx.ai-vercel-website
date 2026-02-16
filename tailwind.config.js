/** @type {import('tailwindcss').Config} */
module.exports = {
  // Safelist for dynamic color classes in student pages
  safelist: [
    // Text colors
    { pattern: /text-(rose|blue|emerald|purple|cyan|amber|violet|indigo)-(300|400|500)/ },
    // Background colors
    { pattern: /bg-(rose|blue|emerald|purple|cyan|amber|violet|indigo)-(400|500|500\/10)/ },
    // Border colors
    { pattern: /border-(rose|blue|emerald|purple|cyan|amber|violet|indigo)-(400|500)/ },
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // =====================================================
        // FRANKX UNIFIED DESIGN SYSTEM
        // Dual-spectrum palette: Tech (emerald/cyan) + Soul (amber/gold)
        // See /lib/design-system.ts for full documentation
        // =====================================================

        // BACKGROUNDS - Dark-first Foundation (Brand v2.0)
        void: '#0a0a0b',          // Page background
        space: '#111113',         // Section background
        navy: '#0F172A',          // Brand primary dark
        elevated: '#1a1a1f',      // Card backgrounds
        subtle: '#252530',        // Hover states
        'muted-bg': '#3a3a4a',    // Disabled states

        // TECH SPECTRUM - For AI/technical content (emerald/cyan)
        tech: {
          primary: '#10b981',     // Emerald-500 - CTAs, links
          secondary: '#06b6d4',   // Cyan-500 - highlights
          light: '#34d399',       // Emerald-400 - hovers
          dark: '#059669',        // Emerald-600 - pressed
          glow: 'rgba(16, 185, 129, 0.15)',
        },

        // SOUL SPECTRUM - For Soulbook/personal content (amber/gold)
        soul: {
          primary: '#f59e0b',     // Amber-500 - CTAs, links
          secondary: '#fbbf24',   // Amber-400 - highlights
          light: '#fcd34d',       // Amber-300 - hovers
          dark: '#d97706',        // Amber-600 - pressed
          glow: 'rgba(245, 158, 11, 0.15)',
        },

        // BRAND ACCENTS (v2.0)
        'brand-purple': '#AB47C7',
        'brand-blue': '#43BFE3',
        'brand-magenta': '#E040FB',
        'brand-obsidian': '#1E0A3C',
        'brand-arcanea-glow': '#7C3AED',
        'brand-gold': '#F59E0B',
        'brand-rose': '#F43F5E',
        'brand-starlight': '#38BDF8',

        // HYBRID - Legacy alias
        hybrid: '#AB47C7',        // Brand purple

        // SEMANTIC COLORS - Status and feedback
        success: {
          base: '#22c55e',
          light: '#86efac',
          dark: '#16a34a',
          glow: 'rgba(34, 197, 94, 0.12)',
          // Legacy compatibility
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          base: '#f59e0b',
          light: '#fcd34d',
          dark: '#d97706',
          glow: 'rgba(245, 158, 11, 0.12)',
          // Legacy compatibility
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#a16207',
        },
        error: {
          base: '#ef4444',
          light: '#fca5a5',
          dark: '#dc2626',
          glow: 'rgba(239, 68, 68, 0.12)',
          // Legacy compatibility
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
        info: {
          base: '#06b6d4',
          light: '#67e8f9',
          dark: '#0891b2',
          glow: 'rgba(6, 182, 212, 0.12)',
          // Legacy compatibility
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },

        // LEGACY COLORS - Preserved for backward compatibility
        // TODO: Migrate components to new tech/soul palette
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
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#060b24'
        },
        accent: {
          50: '#fdf7f0',
          100: '#fbeee0',
          200: '#f6dac1',
          300: '#efc197',
          400: '#e6a36b',
          500: '#de8a4a',
          600: '#d0713f',
          700: '#ad5937',
          800: '#8a4732',
          900: '#703c2b',
          950: '#3c1e16',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },

        // TAILWIND STANDARD COLORS - For tech/soul palette
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        gold: {
          100: '#fbf7ef',
          200: '#f5ebd6',
          300: '#ebd9b0',
          400: '#dec083',
          500: '#d4a855',
          600: '#c49043',
          700: '#a37336',
          800: '#835c30',
          900: '#6b4d2a',
          950: '#3a2817',
        },

        // SHADCN UI COMPATIBILITY
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },

      // =====================================================
      // BACKGROUND GRADIENTS - Ambient effects
      // =====================================================
      backgroundImage: {
        // Brand v2.0 aurora gradients (LOW opacity)
        'tech-aurora': 'radial-gradient(ellipse 120% 80% at 20% 50%, rgba(171,71,199,0.12), transparent 60%), radial-gradient(ellipse 100% 60% at 80% 30%, rgba(67,191,227,0.08), transparent 50%)',
        'soul-aurora': 'radial-gradient(ellipse 120% 80% at 30% 60%, rgba(245,158,11,0.15), transparent 60%), radial-gradient(ellipse 100% 60% at 70% 20%, rgba(249,112,102,0.12), transparent 50%)',
        'brand-gradient': 'linear-gradient(135deg, #AB47C7, #43BFE3)',
        // Legacy (preserved for backward compat)
        'midnight-radial': 'radial-gradient(circle at 20% 20%, rgba(171, 71, 199, 0.12), transparent 55%)',
        'aurora-vortex': 'radial-gradient(circle at 80% 10%, rgba(67, 191, 227, 0.08), transparent 45%)',
        'pulse-halo': 'radial-gradient(circle at 50% 80%, rgba(171, 71, 199, 0.12), transparent 55%)',
        'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },

      // =====================================================
      // TYPOGRAPHY - Perfect Fourth Scale (1.333)
      // See /lib/design-system.ts for full scale
      // =====================================================
      fontFamily: {
        // INTER - Primary brand font for all body/UI text (DO NOT CHANGE)
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // POPPINS - Display headings only (≥18px per brand v2.0)
        display: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
        // PLAYFAIR DISPLAY - Editorial italic quotes ONLY
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        quote: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        // JETBRAINS MONO - Code blocks and inline code
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
        // LORA - Book body reading text (transitional serif, screen-optimized)
        book: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['5.653rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['4.243rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3.183rem', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Heading sizes (Perfect Fourth scale)
        'heading-1': ['2.369rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-2': ['1.777rem', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }],
        'heading-3': ['1.333rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'heading-4': ['1rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],

        // Legacy heading sizes (for backward compatibility)
        'heading-5': ['1.875rem', { lineHeight: '2.25rem' }],
        'heading-6': ['1.5rem', { lineHeight: '2rem' }],

        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],

        // Utility sizes
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        'label-base': ['0.813rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        caption: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '400' }],
        overline: ['0.688rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
      },

      // =====================================================
      // SPACING - 4px Base Grid
      // =====================================================
      spacing: {
        18: '4.5rem',    // 72px
        88: '22rem',     // 352px
        128: '32rem',    // 512px
      },

      // =====================================================
      // BORDER RADIUS - Consistent curvature
      // =====================================================
      borderRadius: {
        '4xl': '2rem',    // 32px
        '5xl': '2.5rem',  // 40px
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      // =====================================================
      // SHADOWS - Elevation hierarchy
      // =====================================================
      boxShadow: {
        // Brand v2.0 glow effects
        'glow-purple': '0 0 40px rgba(171, 71, 199, 0.35)',
        'glow-blue': '0 0 40px rgba(67, 191, 227, 0.35)',
        'glow-emerald': '0 0 40px rgba(16, 185, 129, 0.35)',
        'glow-gold': '0 0 40px rgba(245, 158, 11, 0.35)',
        'glow-magenta': '0 0 40px rgba(224, 64, 251, 0.35)',
        'glow-arcanea': '0 0 40px rgba(124, 58, 237, 0.35)',
        // Legacy aliases
        'glow-tech': '0 0 40px rgba(16, 185, 129, 0.35)',
        'glow-soul': '0 0 40px rgba(245, 158, 11, 0.35)',
        'soul-glow': '0 0 40px rgba(171, 71, 199, 0.45)',

        // Standard elevation
        glass: '0 20px 60px rgb(8 15 33 / 0.45)',
        'elevation-1': '0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)',
        'elevation-2': '0 3px 6px rgb(0 0 0 / 0.16), 0 3px 6px rgb(0 0 0 / 0.23)',
        'elevation-3': '0 10px 20px rgb(0 0 0 / 0.19), 0 6px 6px rgb(0 0 0 / 0.23)',
      },

      // =====================================================
      // ANIMATIONS - Consistent motion
      // =====================================================
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'logo-marquee': 'logoMarquee 40s linear infinite',

        // Radix Navigation animations
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
      },
      animationDelay: {
        '1000': '1000ms',
        '2000': '2000ms',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradient: {
          '0%, 100%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center',
          },
          '50%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        logoMarquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        // Radix Navigation keyframes
        scaleIn: {
          '0%': { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          '100%': { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        enterFromRight: {
          '0%': { opacity: '0', transform: 'translateX(200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-200px)' },
        },
      },

      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgba(255, 255, 255, 0.75)',
            '--tw-prose-headings': 'rgba(255, 255, 255, 0.95)',
            '--tw-prose-lead': 'rgba(255, 255, 255, 0.65)',
            '--tw-prose-links': 'rgba(255, 255, 255, 0.85)',
            '--tw-prose-bold': 'rgba(255, 255, 255, 0.95)',
            '--tw-prose-counters': 'rgba(255, 255, 255, 0.5)',
            '--tw-prose-bullets': 'rgba(255, 255, 255, 0.4)',
            '--tw-prose-hr': 'rgba(255, 255, 255, 0.1)',
            '--tw-prose-quotes': 'rgba(255, 255, 255, 0.8)',
            '--tw-prose-quote-borders': 'rgba(255, 255, 255, 0.2)',
            '--tw-prose-captions': 'rgba(255, 255, 255, 0.5)',
            '--tw-prose-code': 'rgba(255, 255, 255, 0.85)',
            '--tw-prose-pre-code': 'rgba(255, 255, 255, 0.85)',
            '--tw-prose-pre-bg': 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
