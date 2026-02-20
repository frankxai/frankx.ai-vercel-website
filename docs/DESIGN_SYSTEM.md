# FrankX.AI Design System

> Visual language and component patterns for the hub

---

## Color Palette

### Backgrounds
| Name | Value | Usage |
|------|-------|-------|
| Base | `#030712` | Primary background |
| Elevated | `#0a0a0f` | Cards, dropdowns |
| Subtle | `#18181b` | Hover states |

### Accent Colors
| Name | Value | Tailwind | Domain |
|------|-------|----------|--------|
| Emerald | `#10b981` | `emerald-500` | AI Systems, Growth |
| Cyan | `#06b6d4` | `cyan-500` | Technology, Development |
| Violet | `#8b5cf6` | `violet-500` | Consciousness, Prompts |
| Amber | `#f59e0b` | `amber-500` | Learning, Premium |
| Rose | `#f43f5e` | `rose-500` | Music, Creativity |

### Text Hierarchy
| Level | Class | Opacity | Usage |
|-------|-------|---------|-------|
| Primary | `text-white` | 100% | Headlines, important text |
| Secondary | `text-white/70` | 70% | Body text, descriptions |
| Tertiary | `text-white/50` | 50% | Supporting text |
| Muted | `text-white/30` | 30% | Labels, metadata |
| Slate | `text-slate-400` | - | Alternative for body text |

---

## Typography

### Font Stack
```css
--font-display: 'Outfit', sans-serif;     /* Headlines */
--font-body: 'Outfit', sans-serif;        /* Body text */
--font-serif: 'Crimson Pro', serif;       /* Editorial accents */
--font-mono: 'JetBrains Mono', monospace; /* Code */
```

### Headline Styles

```tsx
// Hero Headlines (H1)
<h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">

// Section Headlines (H2)
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">

// Card Headlines (H3)
<h3 className="text-xl md:text-2xl font-bold text-white">

// Editorial Accent (Serif)
<span className="font-serif italic text-white/70">
```

### Label Styles
```tsx
// Section Labels
<p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/70">

// Card Labels
<p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30">
```

---

## Component Patterns

### Page Hero
```tsx
<section className="pt-32 pb-16">
  <div className="mx-auto max-w-6xl px-6">
    {/* Label */}
    <span className="text-xs font-medium uppercase tracking-[0.3em] text-[accent]-400/70">
      Page Title
    </span>

    {/* Headline */}
    <h1 className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
      Main headline here.
      <span className="block font-serif italic text-white/70 mt-2">
        Poetic subline.
      </span>
    </h1>

    {/* Description */}
    <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
      Description text...
    </p>
  </div>
</section>
```

### Card Styles

#### Basic Card
```tsx
<div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]">
```

#### Colored Card
```tsx
<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 transition-all hover:border-emerald-500/40 hover:-translate-y-1">
```

#### Gradient Hover Card
```tsx
<div className="group relative rounded-2xl border border-white/5 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative p-8">
    {/* Content */}
  </div>
</div>
```

### Button Styles

#### Primary (White)
```tsx
<button className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-0.5">
  Label
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
```

#### Secondary (Ghost)
```tsx
<button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
```

#### Text Link
```tsx
<a className="group inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors">
  Label
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</a>
```

---

## Animation Patterns

### Framer Motion Basics
```tsx
// Fade in with slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Staggered children
transition={{ duration: 0.5, delay: index * 0.1 }}

// Scroll-triggered
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### Background Animations
```tsx
// Aurora orb
<motion.div
  className="absolute h-[500px] w-[500px] rounded-full"
  style={{
    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
  }}
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.25, 0.35, 0.25],
  }}
  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
/>
```

---

## Background Component

### Standard Aurora Background
```tsx
function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
```

---

## Icon System

Using Lucide React for icons.

### Common Icons
| Icon | Usage |
|------|-------|
| `ArrowRight` | CTAs, links |
| `ChevronRight` | Card arrows, navigation |
| `ExternalLink` | External links |
| `CheckCircle2` | Checkmarks, confirmations |
| `Music2` | Music-related |
| `BookOpen` | Learning, courses |
| `Sparkles` | Prompts, AI |
| `Code2` | Development |
| `Brain` | AI tools |
| `Zap` | Products, energy |

---

## Responsive Breakpoints

```
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Mobile Patterns
- Hide complex navigation behind hamburger menu
- Stack cards vertically
- Reduce heading sizes with clamp()
- Use `px-6` for consistent padding

---

## Accessibility

### Focus States
```tsx
focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50
```

### Touch Targets
- Minimum 44x44px for interactive elements
- Use `min-h-[44px] min-w-[44px]` for buttons

### ARIA
- Use `aria-label` for icon-only buttons
- Use `aria-current="page"` for active nav items
- Use `aria-expanded` for dropdowns

---

*Last Updated: December 2025*
