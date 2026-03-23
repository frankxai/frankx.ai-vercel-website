# FrankX Design System
**Official Design Token Documentation & Component Style Guide**

*Version: 1.0*
*Last Updated: 2026-01-14*
*Maintained By: FrankX Design Team*

---

## 🎨 Design Philosophy

The FrankX design system embodies:
- **Consciousness-First**: Beautiful, soulful interfaces that feel alive
- **Creator-Focused**: Designed for musicians, artists, and AI architects
- **Premium Glassmorphism**: Frosted glass effects with depth and elegance
- **Accessibility-First**: WCAG AAA compliance as the foundation
- **Performance-Optimized**: Beautiful without sacrificing speed

---

## 🎯 Core Principles

### 1. Visual Hierarchy
- Clear focal points with gradient-enhanced headings
- 8px spacing grid for mathematical consistency
- Purposeful use of whitespace to guide the eye
- Premium depth through layered glassmorphism

### 2. Accessibility Standards
- **WCAG AAA** compliance for all interactive elements
- **Minimum contrast**: 7:1 for normal text, 4.5:1 for large text
- **Touch targets**: 44x44px minimum for all buttons
- **Keyboard navigation**: Full support with visible focus states
- **Screen reader**: Semantic HTML + ARIA labels where needed

### 3. Responsive Design
- **Mobile-first** approach with progressive enhancement
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch-optimized**: Larger targets, reduced hover animations on mobile
- **Reduced motion**: Respects user preference for minimal animation

---

## 🎨 Design Tokens

### Color Palette

#### Brand Colors (From BRAND_IDENTITY.md)

```css
/* Conscious & Spirituality */
--conscious-purple: #8B5CF6;      /* Primary brand color */
--conscious-deep: #6D28D9;        /* Darker variant */
--conscious-light: #C4B5FD;       /* Lighter variant */

/* AI & Technology */
--tech-cyan: #06B6D4;             /* Secondary brand color */
--tech-electric: #0891B2;         /* Darker variant */
--tech-bright: #67E8F9;           /* Lighter variant */

/* Music & Creativity */
--music-orange: #F97316;          /* Accent color */
--music-vibrant: #EA580C;         /* Darker variant */
--music-warm: #FDBA74;            /* Lighter variant */

/* Personal Development */
--growth-green: #10B981;          /* Success/growth color */
--growth-forest: #059669;         /* Darker variant */
--growth-fresh: #6EE7B7;          /* Lighter variant */

/* Foundational */
--deep-navy: #0F172A;             /* Background base */
--midnight: #1E293B;              /* Surface color */
--cosmic-dark: #0F1629;           /* Deep background */
--cosmic-purple: #AB47C7;         /* Accent purple */
--aurora-blue: #43BFE3;           /* Accent blue */
--gold-accent: #F59E0B;           /* Warning/highlight */
```

#### Tailwind Config Colors (Mapped to Brand)

```javascript
// Primary: Conscious Purple Family
primary: {
  50: '#f8f7ff',
  100: '#f1efff',
  200: '#e3e0ff',
  300: '#d0caff',
  400: '#b9acff',
  500: '#9f8bff',    // Base: close to conscious-purple
  600: '#8362ff',    // Matches #8B5CF6 range
  700: '#6943ff',
  800: '#5536d6',
  900: '#422ea9',
  950: '#332780',
}

// Secondary: Tech Cyan Family
secondary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',    // Base: close to tech-cyan
  600: '#0284c7',    // Matches #06B6D4 range
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
}

// Accent: Music Orange Family
accent: {
  50: '#fdf7f0',
  100: '#fbeee0',
  200: '#f6dac1',
  300: '#efc197',
  400: '#e6a36b',
  500: '#de8a4a',    // Base
  600: '#d0713f',    // Close to #F97316
  700: '#ad5937',
  800: '#8a4732',
  900: '#703c2b',
  950: '#3c1e16',
}

// Semantic Colors
success: {
  50: '#f0fdf4',
  500: '#22c55e',    // Matches growth-green family
  700: '#15803d'
}

warning: {
  50: '#fffbeb',
  500: '#f59e0b',    // Matches gold-accent
  700: '#a16207'
}

error: {
  50: '#fef2f2',
  500: '#ef4444',
  700: '#b91c1c'
}

info: {
  50: '#eff6ff',
  500: '#3b82f6',
  700: '#1d4ed8'
}

// Neutrals (Slate Scale)
neutral: {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',    // Matches midnight
  900: '#0f172a',    // Matches deep-navy
  950: '#060b24'
}
```

### Typography

#### Font Families

```css
--font-heading: 'Poppins', sans-serif;     /* Brand identity (NOT IMPLEMENTED) */
--font-body: 'Inter', sans-serif;          /* Currently used for all */
--font-code: 'JetBrains Mono', monospace;  /* Code blocks */

/* NOTE: Tailwind config uses Inter for both sans and display */
/* DISCREPANCY: Brand identity specifies Poppins for headings */
```

#### Font Scale (Tailwind Custom Tokens)

```javascript
fontSize: {
  // Headings
  'heading-1': ['4.5rem', { lineHeight: '1' }],      // 72px
  'heading-2': ['3.75rem', { lineHeight: '1' }],     // 60px
  'heading-3': ['3rem', { lineHeight: '1' }],        // 48px
  'heading-4': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
  'heading-5': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  'heading-6': ['1.5rem', { lineHeight: '2rem' }],   // 24px

  // Body
  'body': ['1rem', { lineHeight: '1.5rem' }],        // 16px
  'body-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
  'caption': ['0.75rem', { lineHeight: '1rem' }],    // 12px
}
```

#### Font Weights

```css
/* Available weights */
font-normal: 400;
font-medium: 500;
font-semibold: 600;
font-bold: 700;
font-extrabold: 800;

/* Usage Guidelines */
- Headings: font-bold (700) or font-extrabold (800)
- Buttons: font-semibold (600)
- Body text: font-normal (400) or font-medium (500)
- Captions: font-medium (500)
```

### Spacing Scale (8px Grid System)

```javascript
spacing: {
  // Standard Tailwind scale (4px base)
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px  ← 8px grid base
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px ← 2x base
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px ← 3x base
  8: '2rem',      // 32px ← 4x base
  10: '2.5rem',   // 40px ← 5x base
  12: '3rem',     // 48px ← 6x base
  16: '4rem',     // 64px ← 8x base
  20: '5rem',     // 80px ← 10x base
  24: '6rem',     // 96px ← 12x base

  // Custom extended spacing
  18: '4.5rem',   // 72px
  88: '22rem',    // 352px
  128: '32rem',   // 512px
}

/* Recommended Usage */
- Micro spacing (within components): 4px, 8px, 12px
- Component padding: 16px, 24px, 32px
- Section spacing: 48px, 64px, 96px
- Macro spacing (between major sections): 128px, 160px
```

### Border Radius (Roundness Scale)

```javascript
borderRadius: {
  'none': '0',
  'sm': 'calc(var(--radius) - 4px)',  // ~4px
  'md': 'calc(var(--radius) - 2px)',  // ~6px (default button)
  'lg': 'var(--radius)',               // ~8px
  'xl': '12px',                        // 12px
  '2xl': '16px',                       // 16px ← RECOMMENDED PRIMARY
  '3xl': '24px',                       // 24px ← Cards
  '4xl': '32px',                       // 32px
  '5xl': '40px',                       // 40px
  'full': '9999px',                    // Pills, circles
}

/* Component-Specific Recommendations */
- Primary buttons (CTAs): rounded-2xl (16px)
- Secondary buttons: rounded-xl (12px)
- Small buttons/chips: rounded-lg (8px)
- Icon buttons: rounded-full
- Cards: rounded-3xl (24px)
- Modals: rounded-2xl (16px)
- Form inputs: rounded-xl (12px)
- Pills/badges: rounded-full
```

### Shadows & Elevation

```javascript
boxShadow: {
  // Custom FrankX shadows
  'soul-glow': '0 0 40px rgb(107 70 193 / 0.45)',
  'glass': '0 20px 60px rgb(8 15 33 / 0.45)',
  'elevation-1': '0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)',
  'elevation-2': '0 3px 6px rgb(0 0 0 / 0.16), 0 3px 6px rgb(0 0 0 / 0.23)',
  'elevation-3': '0 10px 20px rgb(0 0 0 / 0.19), 0 6px 6px rgb(0 0 0 / 0.23)',

  // Standard Tailwind shadows
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}

/* Usage Guidelines */
- Cards at rest: shadow-lg or elevation-1
- Cards on hover: shadow-xl or elevation-2
- Floating buttons: shadow-2xl
- Premium elements: soul-glow (purple glow)
- Glassmorphic elements: glass shadow
```

### Background Gradients

```javascript
backgroundImage: {
  // Custom FrankX gradients
  'midnight-radial': 'radial-gradient(circle at 20% 20%, rgba(92, 136, 245, 0.18), transparent 55%)',
  'aurora-vortex': 'radial-gradient(circle at 80% 10%, rgba(67, 191, 227, 0.22), transparent 45%)',
  'pulse-halo': 'radial-gradient(circle at 50% 80%, rgba(171, 71, 199, 0.18), transparent 55%)',
  'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
}

/* Common Gradient Patterns (NOT CENTRALIZED - FIX NEEDED) */
// Primary CTA gradient
from-purple-600 via-blue-600 to-cyan-600

// Hero backgrounds
from-primary-900/20 via-transparent to-purple-900/30

// Glass surfaces
from-white/5 via-white/5 to-white/0
```

### Backdrop Blur (Glassmorphism)

```javascript
backdropBlur: {
  'xs': '2px',
  'sm': '4px',
  'md': '12px',      // Standard glass effect
  'lg': '16px',
  'xl': '24px',      // Premium glass
  '2xl': '40px',
  '3xl': '64px',
}

/* Glassmorphic Pattern */
bg-white/5 backdrop-blur-md border border-white/10
```

---

## 🎨 Component Style Guide

### Buttons

#### Primary Button (CTA)

```tsx
// Usage: Main call-to-action buttons
<button className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[44px]">
  Get Started
  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
</button>
```

**Key Properties:**
- Border radius: `rounded-2xl` (16px)
- Padding: `px-8 py-4` (32px horizontal, 16px vertical)
- Font: `text-lg font-semibold` (18px, 600 weight)
- Min height: `44px` (WCAG touch target)
- Gradient: Purple → Blue → Cyan
- Shadow: Purple glow on hover
- Animation: Scale + translate on hover

#### Secondary Button

```tsx
<button className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[44px]">
  Learn More
</button>
```

**Key Properties:**
- Border radius: `rounded-xl` (12px)
- Background: Glassmorphic (`bg-white/5 backdrop-blur-md`)
- Border: `border-2 border-white/20`
- Hover: Increase opacity

#### Ghost Button

```tsx
<button className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[44px]">
  Cancel
</button>
```

**Key Properties:**
- No background at rest
- Subtle hover state
- Lower visual hierarchy

#### Icon Button

```tsx
<button className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" aria-label="Close">
  <X className="h-5 w-5" aria-hidden="true" />
</button>
```

**Key Properties:**
- Border radius: `rounded-full`
- Fixed size: `w-10 h-10` (40px minimum)
- Always include `aria-label`

### Cards

#### Standard Card

```tsx
<div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-lg">
  <h3 className="text-xl font-semibold text-white mb-4">Card Title</h3>
  <p className="text-white/70 leading-relaxed">Card content goes here.</p>
</div>
```

**Key Properties:**
- Border radius: `rounded-3xl` (24px)
- Glassmorphic background
- Hover state: Brightness + border intensity

#### Premium Card (Glow Effect)

```tsx
<div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 p-8 backdrop-blur-md shadow-soul-glow">
  <h3 className="text-xl font-semibold text-white mb-4">Premium Feature</h3>
  <p className="text-white/70 leading-relaxed">Enhanced card with glow.</p>
</div>
```

**Key Properties:**
- Gradient background
- Purple glow shadow
- Higher visual hierarchy

### Form Inputs

#### Text Input

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-white/90">
    Email address
  </label>
  <input
    type="email"
    id="email"
    name="email"
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 min-h-[44px]"
    placeholder="you@example.com"
    required
  />
</div>
```

**Key Properties:**
- Border radius: `rounded-xl` (12px)
- Glassmorphic background
- Visible, persistent label (never placeholder-only)
- Focus ring: Purple
- Min height: 44px

### Pills & Badges

#### Pill (Trust Badge)

```tsx
<span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 px-4 py-2 text-sm font-semibold text-purple-200">
  <Sparkles className="h-4 w-4" aria-hidden="true" />
  Built by Oracle AI Architect
</span>
```

**Key Properties:**
- Border radius: `rounded-full`
- Gradient background
- Icon + text combination

#### Badge (Status Indicator)

```tsx
<span className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-300">
  Active
</span>
```

**Key Properties:**
- Smaller than pills
- Semantic colors (green, yellow, red)
- No icon typically

---

## ✅ Quality Checklist

### Design Review Checklist

Before shipping any component or page, verify:

#### Visual Design
- [ ] Uses design tokens from this document (no hardcoded values)
- [ ] Follows 8px spacing grid
- [ ] Button border-radius matches component type (2xl for primary, xl for secondary)
- [ ] Colors from official brand palette
- [ ] Typography scale applied correctly
- [ ] Glassmorphism effects consistent (white/5 + backdrop-blur-md)

#### Accessibility (WCAG AAA)
- [ ] Color contrast minimum 7:1 for normal text, 4.5:1 for large text
- [ ] All interactive elements minimum 44x44px touch target
- [ ] Visible focus indicators on all interactive elements (ring-2)
- [ ] Semantic HTML used (button, nav, header, main, footer)
- [ ] ARIA labels on icon-only buttons
- [ ] Form labels visible and persistent (not placeholder-only)
- [ ] Keyboard navigation fully supported
- [ ] Reduced motion preferences respected

#### Responsive Design
- [ ] Mobile-first approach
- [ ] Touch targets larger on mobile (min 44px)
- [ ] Breakpoints follow Tailwind defaults
- [ ] Text readable at all sizes (min 16px body)
- [ ] Images responsive with proper srcset/sizes

#### Performance
- [ ] Animations use transform and opacity only (GPU-accelerated)
- [ ] Images optimized and lazy-loaded
- [ ] No layout shift on load
- [ ] Reduced motion media query implemented

---

## 🚨 Common Mistakes to Avoid

### 1. Button Border-Radius Inconsistency
❌ **WRONG:**
```tsx
<button className="rounded-md ...">  // 6px - too small
```

✅ **CORRECT:**
```tsx
<button className="rounded-2xl ...">  // 16px - brand standard
```

### 2. Hardcoded Colors
❌ **WRONG:**
```tsx
<div className="bg-[#8B5CF6] text-white"> // Hardcoded hex
```

✅ **CORRECT:**
```tsx
<div className="bg-primary-600 text-white"> // Design token
```

### 3. Missing Touch Targets
❌ **WRONG:**
```tsx
<button className="px-3 py-1">  // Too small (32px height)
```

✅ **CORRECT:**
```tsx
<button className="px-6 py-3 min-h-[44px]">  // WCAG compliant
```

### 4. Placeholder-Only Form Labels
❌ **WRONG:**
```tsx
<input placeholder="Email" />  // No visible label
```

✅ **CORRECT:**
```tsx
<label htmlFor="email">Email</label>
<input id="email" placeholder="you@example.com" />
```

### 5. Inconsistent Spacing
❌ **WRONG:**
```tsx
<div className="p-7">  // Not on 8px grid (28px)
```

✅ **CORRECT:**
```tsx
<div className="p-6">  // 24px (3x base)
<div className="p-8">  // 32px (4x base)
```

---

## 📊 Component Acceptance Criteria

Before merging any new component, it must:

1. **Pass automated accessibility audit** (Lighthouse score 100)
2. **Manual keyboard navigation test** (all interactions work)
3. **Screen reader test** (VoiceOver/NVDA confirms content)
4. **Color contrast check** (all text meets WCAG AAA)
5. **Touch target verification** (all buttons ≥44px)
6. **Design token compliance** (no hardcoded values)
7. **Responsive test** (mobile, tablet, desktop)
8. **Performance budget** (no layout shift, smooth 60fps)

---

## 🔄 Design System Governance

### When to Update This Document

This design system should be updated when:
- New design tokens are added (colors, spacing, etc.)
- Component patterns evolve
- Brand identity changes (requires Frank's approval)
- Accessibility standards update
- New best practices emerge

### Update Process

1. **Propose change** in design system discussion
2. **Get approval** from Frank or design lead
3. **Update this document** with new standard
4. **Update Tailwind config** if needed
5. **Create migration guide** for existing components
6. **Update version number** at top of document

### Version History

- **v1.0** (2026-01-14): Initial design system documentation

---

## 📚 Resources

### Official Documentation
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [FrankX Brand Identity](/BRAND_IDENTITY.md)

### Design Tools
- [Figma FrankX Design Library](#) (TODO: Create)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

### Internal Files
- `/tailwind.config.js` - Tailwind configuration
- `/BRAND_IDENTITY.md` - Official brand standards
- `/components/ui/primitives/` - Base UI primitives
- `/components/ui/PremiumButton.tsx` - Premium button component

---

**Last Updated**: 2026-01-14
**Next Review**: 2026-02-14
**Maintained By**: FrankX Design Team
**Questions?** Contact hello@frankx.ai
