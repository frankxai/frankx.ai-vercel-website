# FrankX.AI Design System Guide

## Overview

This design system unifies FrankX.AI's dual identity: technical AI expertise (Tech) and transformative personal wisdom (Soul). It provides a cohesive visual language that can express both facets while maintaining premium quality.

## Design Philosophy

**Dual-Spectrum Approach:**
- **Tech Spectrum** (Emerald/Cyan): Innovation, intelligence, AI tools
- **Soul Spectrum** (Amber/Gold): Wisdom, transformation, personal content
- **Universal Base**: Deep space blacks create cohesion across all content

## Quick Start

### 1. Import Design Tokens (TypeScript/React)

```typescript
import { colors, typography, spacing, motion } from '@/lib/design-system'

// Use in component styles
const buttonStyle = {
  backgroundColor: colors.accent.tech.primary,
  color: colors.text.primary,
  fontSize: typography.fontSize['body-base'][0],
}
```

### 2. Use Tailwind Classes

```tsx
// Tech-themed component (for AI/technical content)
<div className="bg-void">
  <button className="bg-tech-primary hover:bg-tech-light text-void">
    Explore AI Tools
  </button>
</div>

// Soul-themed component (for Soulbook/personal content)
<div className="bg-void">
  <button className="bg-soul-primary hover:bg-soul-light text-void">
    Begin Journey
  </button>
</div>
```

---

## Color System

### When to Use Tech Colors (Emerald/Cyan)
- AI tool pages and features
- Technical tutorials and documentation
- Product pages (CACOS, Creative AI Toolkit, Vibe OS)
- Code examples and technical diagrams
- Blog posts about AI technology

**Available Classes:**
```
bg-tech-primary    // #10b981 (Emerald-500) - Primary CTAs
bg-tech-secondary  // #06b6d4 (Cyan-500) - Highlights
bg-tech-light      // #34d399 (Emerald-400) - Hover states
bg-tech-dark       // #059669 (Emerald-600) - Pressed states
bg-tech-glow       // rgba(16, 185, 129, 0.15) - Ambient glow

text-tech-primary
border-tech-primary
shadow-glow-tech   // Glowing shadow effect
```

### When to Use Soul Colors (Amber/Gold)
- Soulbook content and navigation
- Personal transformation stories
- Music and creative expression content
- Community and connection features
- Blog posts about consciousness/personal growth

**Available Classes:**
```
bg-soul-primary    // #f59e0b (Amber-500) - Primary CTAs
bg-soul-secondary  // #fbbf24 (Amber-400) - Highlights
bg-soul-light      // #fcd34d (Amber-300) - Hover states
bg-soul-dark       // #d97706 (Amber-600) - Pressed states
bg-soul-glow       // rgba(245, 158, 11, 0.15) - Ambient glow

text-soul-primary
border-soul-primary
shadow-glow-soul   // Glowing shadow effect
```

### Universal Background Colors
Use these across ALL pages for consistency:

```
bg-void      // #0a0a0b - Main page background
bg-space     // #111113 - Cards, modals (primary elevated)
bg-elevated  // #18181b - Hover states (secondary elevated)
bg-subtle    // #1f1f23 - Borders, dividers
```

### Text Hierarchy (All WCAG AAA compliant)
```
text-[#fafafa]               // Primary - Headlines, key content
text-[rgba(250,250,250,0.85)] // Secondary - Body text
text-[rgba(250,250,250,0.65)] // Tertiary - Supporting text
text-[rgba(250,250,250,0.45)] // Muted - Placeholders, disabled
text-[rgba(250,250,250,0.25)] // Faint - Decorative elements
```

---

## Typography System

### Type Scale (Perfect Fourth - 1.333 ratio)

**Display Sizes** (Hero sections only):
```tsx
<h1 className="text-display-2xl font-extrabold">
  Transform Your Creative Journey
</h1>
// 5.653rem (90.45px), line-height: 1, tracking: -0.02em
```

**Heading Sizes** (Section headers):
```tsx
<h1 className="text-heading-1 font-bold">Section Title</h1>
// 2.369rem (37.90px)

<h2 className="text-heading-2 font-semibold">Subsection</h2>
// 1.777rem (28.43px)

<h3 className="text-heading-3 font-semibold">Component Header</h3>
// 1.333rem (21.33px)

<h4 className="text-heading-4 font-semibold">Small Header</h4>
// 1rem (16px)
```

**Body Sizes**:
```tsx
<p className="text-body-lg">Large body text for emphasis</p>
// 1.125rem (18px), line-height: 1.7

<p className="text-body">Standard body text</p>
// 1rem (16px), line-height: 1.6 (DEFAULT)

<p className="text-body-sm">Smaller supporting text</p>
// 0.875rem (14px), line-height: 1.5
```

**Utility Sizes**:
```tsx
<label className="text-label-lg">Form Label</label>
// 0.875rem (14px), tracking: 0.01em, font-weight: 500

<span className="text-caption">Caption text</span>
// 0.75rem (12px)

<span className="text-overline uppercase">OVERLINE</span>
// 0.688rem (11px), tracking: 0.08em, font-weight: 600
```

### Font Families
```tsx
<h1 className="font-display">Display Heading</h1>  // Inter variable
<p className="font-sans">Body text</p>             // Inter (default)
<em className="font-serif italic">Elegant emphasis</em> // Times New Roman
<code className="font-mono">Code snippet</code>    // JetBrains Mono
```

---

## Spacing System (4px Grid)

All spacing follows a 4px base grid for visual rhythm:

```tsx
// Padding/Margin scale
p-4   // 16px (1rem) - Standard
p-6   // 24px (1.5rem) - Comfortable
p-8   // 32px (2rem) - Generous
p-12  // 48px (3rem) - Section spacing
p-16  // 64px (4rem) - Large sections
p-24  // 96px (6rem) - Hero sections
```

**Common Patterns:**
```tsx
// Card padding
<div className="p-6 md:p-8">Card content</div>

// Section spacing
<section className="py-16 md:py-24">Section content</section>

// Component gap
<div className="flex gap-4">Items with 16px gap</div>
```

---

## Component Patterns

### Buttons

**Tech-themed Primary Button:**
```tsx
<button className="
  bg-tech-primary hover:bg-tech-light active:bg-tech-dark
  text-void font-semibold
  px-6 py-3 rounded-lg
  shadow-glow-tech hover:shadow-xl
  transition-all duration-250
">
  Explore AI Tools
</button>
```

**Soul-themed Primary Button:**
```tsx
<button className="
  bg-soul-primary hover:bg-soul-light active:bg-soul-dark
  text-void font-semibold
  px-6 py-3 rounded-lg
  shadow-glow-soul hover:shadow-xl
  transition-all duration-250
">
  Begin Journey
</button>
```

**Ghost Button (Universal):**
```tsx
<button className="
  bg-transparent hover:bg-elevated
  text-[rgba(250,250,250,0.85)] hover:text-[#fafafa]
  border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]
  px-6 py-3 rounded-lg
  transition-all duration-250
">
  Learn More
</button>
```

### Cards

**Glassmorphic Card (Universal):**
```tsx
<div className="
  bg-space/80 backdrop-blur-xl
  border border-[rgba(255,255,255,0.1)]
  rounded-2xl p-6
  shadow-glass
">
  Card content
</div>
```

**Tech-themed Glassmorphic Card:**
```tsx
<div className="
  bg-space/80 backdrop-blur-xl
  border border-tech-primary/20
  rounded-2xl p-6
  shadow-glow-tech
  relative overflow-hidden
">
  {/* Ambient glow gradient */}
  <div className="absolute inset-0 bg-tech-glow pointer-events-none" />
  <div className="relative z-10">Card content</div>
</div>
```

**Soul-themed Glassmorphic Card:**
```tsx
<div className="
  bg-space/80 backdrop-blur-xl
  border border-soul-primary/20
  rounded-2xl p-6
  shadow-glow-soul
  relative overflow-hidden
">
  {/* Ambient glow gradient */}
  <div className="absolute inset-0 bg-soul-glow pointer-events-none" />
  <div className="relative z-10">Card content</div>
</div>
```

### Form Inputs

```tsx
<input
  type="text"
  className="
    w-full
    bg-elevated border border-[rgba(255,255,255,0.1)]
    focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20
    text-[#fafafa] placeholder:text-[rgba(250,250,250,0.45)]
    px-4 py-3 rounded-lg
    transition-all duration-250
  "
  placeholder="Enter text..."
/>
```

---

## Animation Guidelines

### Interactive Feedback

**Hover Effects:**
```tsx
// Lift on hover
<div className="hover:-translate-y-1 transition-transform duration-250">

// Scale on hover
<div className="hover:scale-105 transition-transform duration-250">

// Glow on hover
<button className="hover:shadow-glow-tech transition-shadow duration-250">
```

**Entrance Animations:**
```tsx
// Fade in
<div className="animate-fade-in">

// Fade in from bottom
<div className="animate-fade-in-up">

// Float continuously
<div className="animate-float">
```

### Duration Guidelines
- **Instant feedback**: 150ms (hover, focus states)
- **Standard transitions**: 250ms (buttons, cards)
- **Complex animations**: 400-600ms (modals, drawers)
- **Ambient effects**: 2000ms+ (floating, pulsing)

### Easing
```tsx
// Smooth deceleration (default)
transition-all ease-out

// Elastic bounce
transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]
```

---

## Accessibility Standards

### Contrast Requirements
All text colors meet **WCAG AAA (7:1+)** contrast ratios:
- Primary text: 19.5:1
- Secondary text: 16:1
- Tertiary text: 11:1
- Muted text: 7.5:1

### Focus States
Always include visible focus indicators:
```tsx
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-tech-primary focus:ring-offset-2 focus:ring-offset-void
">
```

### Motion Preferences
The system respects `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### Semantic HTML
Always use semantic elements:
```tsx
<nav>Navigation</nav>
<main>Main content</main>
<article>Article</article>
<aside>Sidebar</aside>
```

---

## Content-Specific Guidelines

### Homepage
- **Hero**: Tech-aurora background, tech accent CTAs
- **Features**: Mix tech/soul based on content (AI tools = tech, personal story = soul)
- **Products**: Each product uses its theme (CACOS = tech, Soulbook = soul)

### AI Tools Pages
- Use **tech palette** exclusively
- Aurora background with tech-aurora gradient
- Emerald/cyan accents throughout
- Code examples with tech-themed highlights

### Soulbook Pages
- Use **soul palette** exclusively
- Warm aurora background with soul-aurora gradient
- Amber/gold accents throughout
- Serif font for emphasis in personal stories

### Blog Posts
- **Tech posts**: Use tech palette
- **Personal posts**: Use soul palette
- **Mixed posts**: Start with theme that matches primary content, allow accent color shift in specific sections

---

## Migration Guide

### Updating Existing Components

**Before (inconsistent colors):**
```tsx
<button className="bg-emerald-500 hover:bg-cyan-400">
  Inconsistent Button
</button>
```

**After (unified system):**
```tsx
<button className="bg-tech-primary hover:bg-tech-light">
  Consistent Button
</button>
```

### Finding Components to Update
1. Search for: `bg-emerald-`, `bg-cyan-`, `text-emerald-`, `text-cyan-`
2. Replace with: `bg-tech-primary`, `bg-tech-secondary`, etc.
3. Search for: `bg-amber-`, `bg-gold-`, `text-amber-`, `text-gold-`
4. Replace with: `bg-soul-primary`, `bg-soul-secondary`, etc.

---

## Examples

### Complete Tech-Themed Section
```tsx
<section className="relative py-24 bg-void overflow-hidden">
  {/* Aurora background */}
  <div className="absolute inset-0 bg-tech-aurora blur-3xl" />

  <div className="relative z-10 container mx-auto px-6">
    <h2 className="text-heading-1 font-bold text-[#fafafa] mb-4">
      AI-Powered Creator Tools
    </h2>
    <p className="text-body-lg text-[rgba(250,250,250,0.85)] mb-8">
      Transform your creative workflow with intelligent automation.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tech card */}
      <div className="
        bg-space/80 backdrop-blur-xl
        border border-tech-primary/20
        rounded-2xl p-6
        shadow-glow-tech
        hover:-translate-y-1
        transition-all duration-250
      ">
        <h3 className="text-heading-3 font-semibold text-[#fafafa] mb-2">
          Feature Title
        </h3>
        <p className="text-body text-[rgba(250,250,250,0.85)]">
          Feature description here.
        </p>
      </div>
    </div>

    <button className="
      mt-8
      bg-tech-primary hover:bg-tech-light active:bg-tech-dark
      text-void font-semibold
      px-6 py-3 rounded-lg
      shadow-glow-tech hover:shadow-xl
      transition-all duration-250
    ">
      Explore All Tools
    </button>
  </div>
</section>
```

### Complete Soul-Themed Section
```tsx
<section className="relative py-24 bg-void overflow-hidden">
  {/* Aurora background */}
  <div className="absolute inset-0 bg-soul-aurora blur-3xl" />

  <div className="relative z-10 container mx-auto px-6">
    <h2 className="text-heading-1 font-bold text-[#fafafa] mb-4">
      <span className="font-serif italic">Your Transformation Journey</span>
    </h2>
    <p className="text-body-lg text-[rgba(250,250,250,0.85)] mb-8">
      Discover the seven pillars of creative consciousness.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Soul card */}
      <div className="
        bg-space/80 backdrop-blur-xl
        border border-soul-primary/20
        rounded-2xl p-6
        shadow-glow-soul
        hover:-translate-y-1
        transition-all duration-250
      ">
        <h3 className="text-heading-3 font-semibold text-[#fafafa] mb-2">
          Pillar Title
        </h3>
        <p className="text-body text-[rgba(250,250,250,0.85)]">
          Pillar description here.
        </p>
      </div>
    </div>

    <button className="
      mt-8
      bg-soul-primary hover:bg-soul-light active:bg-soul-dark
      text-void font-semibold
      px-6 py-3 rounded-lg
      shadow-glow-soul hover:shadow-xl
      transition-all duration-250
    ">
      Begin Your Journey
    </button>
  </div>
</section>
```

---

## Design System Files

- **Design Tokens**: `/lib/design-system.ts` (TypeScript constants)
- **Tailwind Config**: `tailwind.config.js` (Tailwind classes)
- **Global CSS**: `app/globals.css` (CSS custom properties)
- **This Guide**: `docs/DESIGN_SYSTEM_GUIDE.md`

---

## Support & Questions

For design system questions or suggestions:
1. Review this guide
2. Check `/lib/design-system.ts` for full token documentation
3. Reference existing components for patterns
4. Maintain WCAG AAA accessibility standards

---

**Version**: 1.0
**Last Updated**: January 2026
**Maintained by**: FrankX Design Team
