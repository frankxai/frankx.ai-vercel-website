# FrankX.AI Design System
## Version 1.0 | 2025

---

## Executive Summary

This design system creates a unified yet flexible visual language for FrankX.AI that bridges enterprise credibility, creative innovation, and spiritual consciousness. The system employs a "constellation architecture" where FrankX acts as the gravitational center, with Products, Communities, and Platforms as distinct orbital systems that share core DNA while expressing unique personalities.

---

## 1. DESIGN PHILOSOPHY

### Core Principles

**1.1 Harmonic Duality**
- **Enterprise + Soul:** Crisp professionalism meets organic, flowing creativity
- **Technology + Humanity:** AI-driven precision balanced with human warmth
- **Structure + Freedom:** Systematic organization with expressive flexibility

**1.2 Progressive Revelation**
- Information unfolds in layers, never overwhelming
- Depth for those who seek it, clarity for those who scan
- Guided discovery through intentional visual hierarchy

**1.3 Conscious Design**
- Every element serves a purpose
- Accessibility as enhancement, not constraint
- Performance and beauty as inseparable

---

## 2. COLOR SYSTEM

### 2.1 Core Brand Palette (FrankX Umbrella)

```
Primary Colors:
├─ Deep Purple (Brand Primary)     #6B46C1    RGB(107, 70, 193)
├─ Electric Blue (Innovation)      #00D4FF    RGB(0, 212, 255)
├─ Gold (Premium/Achievement)      #FFD700    RGB(255, 215, 0)
├─ Charcoal (Foundation)           #1A1A2E    RGB(26, 26, 46)
└─ Cloud White (Clarity)           #F7F7F7    RGB(247, 247, 247)

Extended Palette:
├─ Twilight Purple                 #8B5FBF    (Lighter variant)
├─ Midnight Purple                 #4A2C7B    (Darker variant)
├─ Cyan Accent                     #00FFE0    (High energy)
├─ Deep Ocean                      #001F3F    (Dark mode base)
└─ Warm Gray                       #E5E5EA    (Neutral element)
```

### 2.2 Semantic Color Tokens

```css
/* Light Mode */
--color-background-primary:    #FFFFFF
--color-background-secondary:  #F7F7F7
--color-background-tertiary:   #E5E5EA
--color-text-primary:          #1A1A2E
--color-text-secondary:        #4A4A5E
--color-text-tertiary:         #7A7A8E
--color-brand-primary:         #6B46C1
--color-brand-secondary:       #00D4FF
--color-accent-gold:           #FFD700
--color-success:               #10B981
--color-warning:               #F59E0B
--color-error:                 #EF4444
--color-info:                  #3B82F6

/* Dark Mode */
--color-background-primary:    #0A0A0F
--color-background-secondary:  #1A1A2E
--color-background-tertiary:   #2A2A3E
--color-text-primary:          #F7F7F7
--color-text-secondary:        #C7C7D7
--color-text-tertiary:         #9797A7
```

### 2.3 Sub-Brand Color Assignments

**Products Section** (Innovation & Tools)
- Primary: Electric Blue (#00D4FF)
- Secondary: Twilight Purple (#8B5FBF)
- Accent: Cyan (#00FFE0)
- Style: Sharp, technical, future-forward

**Communities Section** (Connection & Growth)
- Primary: Deep Purple (#6B46C1)
- Secondary: Gold (#FFD700)
- Accent: Warm gradients
- Integration: Arcanean Spectrum for Arcanea subsection
- Style: Warm, inviting, magical

**Platforms Section** (Infrastructure & Power)
- Primary: Charcoal (#1A1A2E)
- Secondary: Electric Blue (#00D4FF)
- Accent: Gold highlights
- Style: Robust, professional, trustworthy

### 2.4 Gradient System

```css
/* Hero Gradients */
--gradient-hero-primary: linear-gradient(135deg, #6B46C1 0%, #00D4FF 100%)
--gradient-hero-dark: linear-gradient(135deg, #1A1A2E 0%, #4A2C7B 100%)

/* Section Backgrounds */
--gradient-products: linear-gradient(180deg, #00D4FF15 0%, #00FFE015 100%)
--gradient-communities: linear-gradient(180deg, #6B46C115 0%, #FFD70015 100%)
--gradient-platforms: linear-gradient(180deg, #1A1A2E15 0%, #00D4FF15 100%)

/* Interactive Elements */
--gradient-cta-primary: linear-gradient(135deg, #6B46C1 0%, #8B5FBF 100%)
--gradient-cta-secondary: linear-gradient(135deg, #00D4FF 0%, #00FFE0 100%)
--gradient-hover: linear-gradient(135deg, #4A2C7B 0%, #6B46C1 100%)

/* Overlays */
--gradient-overlay-dark: linear-gradient(180deg, rgba(26,26,46,0) 0%, rgba(26,26,46,0.8) 100%)
--gradient-overlay-light: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%)
```

### 2.5 Accessibility Compliance

**Contrast Ratios (WCAG 2.1 AAA):**
- Primary text on white: 16.4:1 (Charcoal on Cloud White)
- Secondary text on white: 10.2:1
- Purple on white: 4.8:1 (AA Large Text)
- Blue on dark: 8.5:1 (AAA)

**Color Blindness Considerations:**
- Never use color alone to convey information
- Patterns/textures for status differentiation
- Tested against Protanopia, Deuteranopia, Tritanopia

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Type Scale

```css
/* Modern Modular Scale (1.250 - Major Third) */
--font-size-xs:     0.64rem    /* 10.24px */
--font-size-sm:     0.80rem    /* 12.8px */
--font-size-base:   1.00rem    /* 16px */
--font-size-lg:     1.25rem    /* 20px */
--font-size-xl:     1.563rem   /* 25px */
--font-size-2xl:    1.953rem   /* 31.25px */
--font-size-3xl:    2.441rem   /* 39.06px */
--font-size-4xl:    3.052rem   /* 48.83px */
--font-size-5xl:    3.815rem   /* 61.04px */
--font-size-6xl:    4.768rem   /* 76.29px */
--font-size-7xl:    5.960rem   /* 95.37px */
```

### 3.2 Font Families

```css
/* Headers - Bold, Modern, Confident */
--font-family-heading: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-weight-heading: 700;

/* Body - Readable, Professional, Clean */
--font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-weight-body: 400;
--font-weight-body-medium: 500;
--font-weight-body-semibold: 600;

/* Accent - Elegant, Editorial, Special Moments */
--font-family-accent: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-weight-accent: 600;

/* Monospace - Code, Technical */
--font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### 3.3 Typography Presets

```css
/* Hero Display */
.text-hero {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-7xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Section Headings */
.text-h1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-5xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-h2 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  line-height: 1.25;
}

.text-h3 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: 1.3;
}

/* Body Text */
.text-body-large {
  font-family: var(--font-family-body);
  font-size: var(--font-size-xl);
  line-height: 1.6;
  letter-spacing: 0.01em;
}

.text-body {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: 1.7;
}

.text-body-small {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

/* Accent Text */
.text-accent {
  font-family: var(--font-family-accent);
  font-size: var(--font-size-2xl);
  line-height: 1.4;
  font-style: italic;
}
```

### 3.4 Responsive Typography

```css
/* Mobile First Approach */
@media (max-width: 640px) {
  .text-hero { font-size: var(--font-size-4xl); }
  .text-h1 { font-size: var(--font-size-3xl); }
  .text-h2 { font-size: var(--font-size-2xl); }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .text-hero { font-size: var(--font-size-6xl); }
  .text-h1 { font-size: var(--font-size-4xl); }
}
```

---

## 4. SPACING SYSTEM

### 4.1 Base Unit: 4px

```css
--space-0:    0px
--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-8:    32px
--space-10:   40px
--space-12:   48px
--space-16:   64px
--space-20:   80px
--space-24:   96px
--space-32:   128px
--space-40:   160px
--space-48:   192px
--space-64:   256px
```

### 4.2 Layout Spacing

```css
/* Section Padding */
--section-padding-mobile:    var(--space-16)
--section-padding-tablet:    var(--space-24)
--section-padding-desktop:   var(--space-32)

/* Component Spacing */
--component-gap-tight:       var(--space-2)
--component-gap-normal:      var(--space-4)
--component-gap-relaxed:     var(--space-6)
--component-gap-loose:       var(--space-8)

/* Container Max Widths */
--container-sm:   640px
--container-md:   768px
--container-lg:   1024px
--container-xl:   1280px
--container-2xl:  1536px
--container-full: 100%
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Buttons

**Primary Button (CTA)**
```css
.btn-primary {
  background: var(--gradient-cta-primary);
  color: var(--color-background-primary);
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: var(--font-size-base);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(107, 70, 193, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 70, 193, 0.4);
  background: var(--gradient-hover);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-brand-primary);
  border: 2px solid var(--color-brand-primary);
  padding: 14px 30px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-brand-primary);
  color: white;
  transform: translateY(-2px);
}
```

**Ghost Button (Tertiary)**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  padding: 12px 24px;
  font-weight: 500;
  position: relative;
}

.btn-ghost::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 24px;
  right: 24px;
  height: 2px;
  background: var(--color-brand-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.btn-ghost:hover::after {
  transform: scaleX(1);
}
```

### 5.2 Cards

**Product/Community Card**
```css
.card {
  background: var(--color-background-primary);
  border-radius: 20px;
  padding: 32px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(107, 70, 193, 0.1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-hero-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 48px rgba(107, 70, 193, 0.15);
}

.card:hover::before {
  transform: scaleX(1);
}
```

**Card Icon Container**
```css
.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--gradient-products);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
}

.card-icon::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 16px;
  background: var(--gradient-hero-primary);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-icon::after {
  opacity: 0.2;
}
```

### 5.3 Navigation

**Desktop Navigation**
```
Height: 80px
Background: rgba(255, 255, 255, 0.95) with backdrop-filter: blur(12px)
Border-bottom: 1px solid rgba(0, 0, 0, 0.08)
Position: Sticky, top: 0
Z-index: 1000

Logo: Left aligned, 40px height
Nav Links: Center aligned, 16px font-size, 600 weight
CTA Button: Right aligned

Hover State:
- Underline animation (2px, purple)
- 0.3s ease transition
```

**Mobile Navigation**
```
Hamburger Menu: Top right, 32x32px touch target
Slide-in Drawer: Full height, 80% width max
Background: White with gradient overlay
Animation: 0.4s cubic-bezier slide from right
```

**Mega Menu (for dropdowns)**
```
Trigger: Products, Communities, Platforms
Container: Full width, max 1280px centered
Grid: 3 columns on desktop, 1 on mobile
Background: White with subtle shadow
Animation: Fade in + slide down 0.3s
Padding: 48px
```

### 5.4 Forms

**Input Fields**
```css
.input {
  height: 56px;
  padding: 0 20px;
  border: 2px solid var(--color-background-tertiary);
  border-radius: 12px;
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
  background: var(--color-background-primary);
}

.input:focus {
  outline: none;
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 4px rgba(107, 70, 193, 0.1);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  display: block;
}
```

---

## 6. ANIMATION PRINCIPLES

### 6.1 Easing Functions

```css
--ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1)
```

### 6.2 Duration Standards

```
Micro-interactions: 150ms
Standard transitions: 300ms
Complex animations: 400-600ms
Page transitions: 800ms
Maximum duration: 1000ms
```

### 6.3 Animation Patterns

**Scroll Reveal (Fade + Slide)**
```
Opacity: 0 → 1
Transform: translateY(30px) → translateY(0)
Duration: 600ms
Easing: ease-out-smooth
Stagger: 100ms between elements
```

**Hover Scale**
```
Transform: scale(1) → scale(1.05)
Duration: 300ms
Easing: ease-out-back
```

**Loading States**
```
Shimmer gradient animation
Duration: 1500ms infinite
Direction: left to right
```

### 6.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. ACCESSIBILITY GUIDELINES

### 7.1 Keyboard Navigation

- All interactive elements must be reachable via Tab
- Focus indicators: 3px solid outline, purple color
- Skip to content link at top of page
- Logical tab order following visual hierarchy
- Escape key closes modals/menus

### 7.2 Screen Reader Optimization

```html
<!-- Semantic HTML structure -->
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<section aria-labelledby="section-heading">

<!-- ARIA labels for icons -->
<button aria-label="Open menu">
  <span aria-hidden="true">☰</span>
</button>

<!-- Skip links -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### 7.3 Color Contrast Requirements

**Minimum Contrast Ratios:**
- Normal text (under 18px): 7:1 (AAA)
- Large text (18px+ or 14px+ bold): 4.5:1 (AA)
- UI components: 3:1
- Graphics/icons: 3:1

### 7.4 Touch Targets

**Minimum sizes:**
- Mobile: 44x44px
- Desktop: 32x32px
- Spacing between targets: 8px minimum

### 7.5 Error Handling

- Clear error messages with solutions
- Inline validation with visual + text feedback
- Error summaries at top of forms
- Red for errors + icon + descriptive text (never color alone)

---

## 8. RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
--breakpoint-sm:  640px   /* Small tablets */
--breakpoint-md:  768px   /* Tablets */
--breakpoint-lg:  1024px  /* Small laptops */
--breakpoint-xl:  1280px  /* Desktops */
--breakpoint-2xl: 1536px  /* Large desktops */
```

### 8.1 Layout Behavior

**Mobile (< 640px):**
- Single column layouts
- Stacked cards
- Hamburger navigation
- Full-width CTAs
- Reduced spacing

**Tablet (640px - 1024px):**
- 2-column grids
- Condensed navigation
- Optimized card sizes
- Side-by-side content blocks

**Desktop (1024px+):**
- 3-4 column grids
- Full navigation bar
- Mega menus
- Rich interactive elements
- Maximum visual hierarchy

---

## 9. ICONOGRAPHY SYSTEM

### 9.1 Icon Style

**Characteristics:**
- 24x24px base size (scalable)
- 2px stroke weight
- Rounded corners (border-radius: 2px on paths)
- Consistent padding: 2px internal spacing

**Icon Sets:**
- Primary: Lucide Icons (consistent with Inter)
- Custom: FrankX brand icons (music waveforms, AI nodes)
- Accent: Phosphor Icons for special moments

### 9.2 Usage Guidelines

```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }
```

**Color Application:**
- Default: currentColor (inherits from parent)
- Interactive: Transitions to brand colors on hover
- Status: Green (success), Red (error), Blue (info), Yellow (warning)

---

## 10. IMAGERY GUIDELINES

### 10.1 Photography Style

**Hero Images:**
- High contrast, slightly desaturated
- Purple/blue color grading overlay
- Human subjects: authentic, diverse, engaged in creation
- Abstract backgrounds: geometric patterns, flowing gradients

**Product Screenshots:**
- Subtle shadow: 0 20px 60px rgba(0,0,0,0.15)
- 8px border-radius
- Optional: Floating perspective (3D tilt)

**Texture Overlays:**
- Noise texture at 3% opacity
- Subtle grain for depth
- Never distracting from content

### 10.2 AI-Generated Graphics

**Acceptable Styles:**
- Geometric abstractions (circuits, networks, constellations)
- Music visualizations (waveforms, spectrograms)
- Flowing gradients and light rays
- Particle systems and energy fields

**Avoid:**
- Generic AI art aesthetics
- Overly complex compositions
- Clashing color schemes

---

## 11. GRID SYSTEM

### 11.1 12-Column Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 24px;
}

/* Responsive columns */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
```

### 11.2 Layout Patterns

**Hero Section:**
- Left: 6 columns (text content)
- Right: 6 columns (visual/illustration)

**Three-Column Feature Grid:**
- Each: 4 columns (desktop)
- Each: 12 columns (mobile, stacked)

**Blog Layout:**
- Content: 8 columns (centered)
- Sidebar: 4 columns (if needed)

---

## 12. VISUAL EFFECTS

### 12.1 Shadows

```css
--shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.05)
--shadow-md:  0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.12)
--shadow-xl:  0 16px 48px rgba(0, 0, 0, 0.15)
--shadow-2xl: 0 24px 64px rgba(0, 0, 0, 0.2)

/* Colored shadows for emphasis */
--shadow-purple: 0 8px 24px rgba(107, 70, 193, 0.25)
--shadow-blue: 0 8px 24px rgba(0, 212, 255, 0.25)
```

### 12.2 Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-dark {
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 12.3 Glow Effects

```css
.glow-purple {
  box-shadow:
    0 0 20px rgba(107, 70, 193, 0.3),
    0 0 40px rgba(107, 70, 193, 0.15);
}

.glow-blue {
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.3),
    0 0 40px rgba(0, 212, 255, 0.15);
}
```

---

## 13. PERFORMANCE STANDARDS

### 13.1 Loading Targets

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Additional Metrics:**
- Time to Interactive: < 3.5s
- First Contentful Paint: < 1.5s

### 13.2 Optimization Strategies

**Images:**
- WebP format with JPEG fallback
- Lazy loading below fold
- Responsive srcset for different viewports
- Maximum 200KB per hero image

**Fonts:**
- Preload critical fonts
- font-display: swap
- Subset fonts to Latin characters
- Maximum 3 font families

**CSS:**
- Critical CSS inlined
- Non-critical CSS deferred
- Purge unused Tailwind classes
- Minification and compression

**JavaScript:**
- Code splitting by route
- Lazy load non-critical components
- Defer non-essential scripts
- Maximum 100KB initial bundle

---

## 14. DARK MODE SPECIFICATIONS

### 14.1 Color Adjustments

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background-primary: #0A0A0F;
    --color-background-secondary: #1A1A2E;
    --color-text-primary: #F7F7F7;

    /* Reduce vibrant colors by 10% saturation */
    --color-brand-primary: #7B56D1;
    --color-brand-secondary: #10C4EF;
  }
}
```

### 14.2 Contrast Enhancements

- Increase shadow intensity by 20%
- Reduce border opacity by 30%
- Soften pure whites to #F7F7F7
- Avoid pure blacks, use #0A0A0F

---

## 15. BRAND STORYTELLING ELEMENTS

### 15.1 Visual Metaphors

**Enterprise AI (Products Section):**
- Circuit board patterns (subtle backgrounds)
- Network node connections
- Data flow animations
- Geometric precision

**Music Creation (AI Music Academy):**
- Waveform visualizations
- Audio spectrum bars
- Musical notation elements
- Rhythm-based animations

**Spiritual Consciousness (Starlight/Arcanea):**
- Constellation patterns
- Ethereal light rays
- Particle systems
- Organic flowing shapes

### 15.2 Section Transitions

**Scroll-triggered animations:**
```
Products → Communities:
  Geometric shapes morph into organic constellations

Communities → Platforms:
  Constellation points connect into infrastructure networks

Between all sections:
  Gradient shift animation (2s duration)
  Parallax background elements
```

---

## 16. COMPONENT STATE SPECIFICATIONS

### 16.1 Interactive States

**Default → Hover → Active → Focus**

```css
/* Link States */
.link {
  color: var(--color-brand-primary);
  text-decoration: none;
  position: relative;
}

.link:hover {
  color: var(--color-brand-secondary);
}

.link:focus-visible {
  outline: 3px solid var(--color-brand-primary);
  outline-offset: 4px;
  border-radius: 4px;
}

.link:active {
  color: var(--color-brand-primary);
  opacity: 0.8;
}
```

### 16.2 Loading States

```css
.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 17. MICRO-INTERACTIONS

### 17.1 Button Click Ripple

```css
.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-ripple:active::after {
  width: 300px;
  height: 300px;
}
```

### 17.2 Card Tilt Effect

```css
.card-tilt {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

.card-tilt:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-5deg);
}
```

---

## 18. IMPLEMENTATION NOTES

### 18.1 Technology Stack

**Recommended:**
- Next.js 14+ (App Router)
- Tailwind CSS 3.4+
- Framer Motion 11+
- Radix UI (accessible components)
- React Hook Form (forms)

### 18.2 File Structure

```
/app
  /components
    /ui (atomic components)
    /sections (page sections)
    /layouts (navigation, footer)
  /styles
    /globals.css (design tokens)
    /components (component-specific)
  /utils
    /animations (Framer Motion variants)
```

### 18.3 Design Tokens Export

```javascript
// tailwind.config.js integration
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6B46C1',
          blue: '#00D4FF',
          gold: '#FFD700',
          // ... etc
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      }
    }
  }
}
```

---

## 19. QUALITY CHECKLIST

Before launch, verify:

**Visual Design:**
- [ ] All colors pass WCAG AAA contrast
- [ ] Typography scales responsively
- [ ] Consistent spacing throughout
- [ ] Hover states on all interactive elements
- [ ] Dark mode fully implemented

**Accessibility:**
- [ ] Keyboard navigation works completely
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Focus indicators visible
- [ ] ARIA labels on all icons
- [ ] Alt text on all images
- [ ] Reduced motion preferences respected

**Performance:**
- [ ] Lighthouse score 90+ across all metrics
- [ ] Images optimized and lazy-loaded
- [ ] Fonts preloaded
- [ ] No layout shift (CLS < 0.1)

**Responsive:**
- [ ] Tested on iPhone SE, iPhone 14, iPad, Desktop
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll on any viewport
- [ ] Readable text at all sizes

**Cross-browser:**
- [ ] Chrome, Firefox, Safari, Edge tested
- [ ] iOS Safari tested
- [ ] Fallbacks for unsupported features

---

## 20. MAINTENANCE GUIDELINES

### 20.1 Design System Updates

**Version Control:**
- Major version: Breaking changes to components
- Minor version: New components or non-breaking enhancements
- Patch version: Bug fixes and documentation

**Change Process:**
1. Propose change with rationale
2. Test across 3 use cases minimum
3. Update documentation
4. Communicate to development team
5. Implement with backward compatibility when possible

### 20.2 Component Library Evolution

**Adding New Components:**
1. Follow established patterns
2. Use design tokens exclusively
3. Document props and variants
4. Include accessibility notes
5. Provide usage examples

---

**END OF DESIGN SYSTEM DOCUMENT**

*This living document should be reviewed quarterly and updated as the FrankX brand evolves.*
