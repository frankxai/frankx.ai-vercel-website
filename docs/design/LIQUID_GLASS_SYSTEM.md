# Liquid Glass Design System
**FrankX 2026 — Premium UI Material Language**

Version 1.0 — February 2026

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Reference Influences](#reference-influences)
3. [Color System](#color-system)
4. [Material Layers](#material-layers)
5. [Shadow System](#shadow-system)
6. [Component Anatomy](#component-anatomy)
7. [Animation Principles](#animation-principles)
8. [Performance Budgets](#performance-budgets)
9. [Accessibility](#accessibility)
10. [Implementation Rules](#implementation-rules)

---

## Philosophy

### Core Concept: Liquid Glass Futurism

Every interface element is a **3D glass object floating in dark space**. Not flat design — dimensional design where depth, refraction, and light behavior create premium tactile experiences.

**Design DNA:**
- **iOS 18 liquid glass** — Multi-layer blur, depth perception, light refraction
- **Porsche Design UI** — 3D rendered controls, premium materials, automotive precision
- **Teenage Engineering** — Playful 3D, tactile digital objects, sophisticated toy-like quality
- **Stripe 2024** — Breathing gradients, dimensional cards, subtle motion
- **High-end product design** — Crystal, liquid metal, iridescent surfaces

### The Three Laws

1. **Everything has depth** — Cards float, buttons compress, elements exist in 3D space
2. **Glass is the primary material** — Semi-transparent, refractive, layered
3. **Light comes from above-left** — Consistent physics across all components

### Brand Alignment

| FrankX Attribute | Design Expression |
|------------------|-------------------|
| **Precise** | Pixel-perfect gradients, mathematical shadow layers, exact color values |
| **Bold** | High contrast, large liquid metal buttons, unmistakable depth |
| **Genuine** | Real physics (not cartoonish), honest materials, working interactions |
| **Creative** | Iridescence on creative content, element-themed variations, breathing animations |
| **Warm** | Gold/amber accents, rounded corners (16-32px), organic motion curves |

---

## Reference Influences

### Apple (iOS 18 Materials)

**What we adopt:**
- Multi-layer background composition (base + gradient + blur)
- Consistent light source (top-left, 45°)
- Specular highlights on glass edges
- Spring-based animation curves (`cubic-bezier(0.4, 0, 0.2, 1)`)
- Behavioral physics (press = scale 0.98, hover = translateY -2px)

**What we avoid:**
- Over-reliance on blur (performance cost)
- Translucency where it hurts readability
- System font (we use Inter + Playfair)

### Porsche Design Studio

**What we adopt:**
- 3D button rendering (highlight top edge, shadow bottom edge)
- Premium metal finishes (brushed, polished, liquid)
- Automotive precision (0.5px alignment, perfect curves)
- Confident color choices (black, silver, accent gold)

**What we avoid:**
- Skeuomorphic dials/gauges
- Over-complicated textures
- Leather/carbon fiber patterns

### Teenage Engineering

**What we adopt:**
- Playful 3D but sophisticated execution
- Bright accent colors on dark base
- Pill-shaped controls with depth
- Micro-interactions that feel tactile

**What we avoid:**
- Literal toy aesthetics
- Primary colors (too childish)
- Cartoon character style

### Stripe 2024

**What we adopt:**
- Gradient animation (subtle color shift over time)
- Floating card depth (multi-layer shadows)
- Clean layouts with generous whitespace
- Code-block glass treatment

**What we avoid:**
- Purple overload (they're purple-primary, we're not)
- Grid backgrounds everywhere
- Rounded corners > 24px (too soft for us)

---

## Color System

### Background Depth Stack

Progressive depth creates spatial hierarchy:

```css
/* Layer 0: Abyss — True black base */
--bg-abyss: #050508;

/* Layer 1: Void — Primary background */
--bg-void: #0A0B10;

/* Layer 2: Deep — Card backgrounds */
--bg-deep: #0F1018;

/* Layer 3: Surface — Elevated elements */
--bg-surface: #161822;

/* Layer 4: Float — Highest elevation */
--bg-float: #1E2030;
```

**Usage:**
- Page background: `bg-void`
- Cards: `bg-deep` with blur
- Modals/overlays: `bg-surface` with blur
- Tooltips/popovers: `bg-float` with blur

### Glass Material Presets

Four standard glass treatments:

| Name | Opacity | Blur | Border | Use Case |
|------|---------|------|--------|----------|
| **Frosted** | `rgba(255,255,255,0.03)` | 24px | `rgba(255,255,255,0.08)` | Primary panels, cards |
| **Crystal** | `rgba(255,255,255,0.06)` | 40px | `rgba(255,255,255,0.12)` | Elevated cards, hero sections |
| **Liquid** | `rgba(255,255,255,0.08)` | 60px | `rgba(255,255,255,0.15)` | Modals, spotlight elements |
| **Obsidian** | `rgba(0,0,0,0.4)` | 32px | `rgba(255,255,255,0.05)` | Dark glass overlays |

### Accent Gradients

Never flat colors — always gradients that suggest liquid metal or iridescence:

```css
/* Lumina Gold — Primary CTA, sacred elements */
--gradient-gold: linear-gradient(135deg,
  #FFE5A0 0%,
  #D4AF37 50%,
  #B8860B 100%
);

/* Arcane Violet — Magic, arcane elements */
--gradient-violet: linear-gradient(135deg,
  #E0B0FF 0%,
  #9B59B6 50%,
  #6B21A8 100%
);

/* Celestial Blue — Water, interface accents */
--gradient-blue: linear-gradient(135deg,
  #B0E0FF 0%,
  #4ECDC4 50%,
  #0891B2 100%
);

/* Ember — Fire, energy, alerts */
--gradient-ember: linear-gradient(135deg,
  #FFD0A0 0%,
  #FF6B35 50%,
  #DC2626 100%
);

/* Living Silver — Neutral premium */
--gradient-silver: linear-gradient(135deg,
  #FFFFFF 0%,
  #C0C0C0 50%,
  #6B7280 100%
);
```

### Element-Specific Palettes

Full material definition for themed components (Fire/Water/Earth/Wind/Arcane):

```css
/* FIRE ELEMENT */
--fire-base: #1A0A08;           /* Deep ember black */
--fire-primary: #FF6B35;         /* Gradient start */
--fire-secondary: #FF4500;       /* Gradient end */
--fire-emission: #FF8C42;        /* Glow color */
--fire-metal: #B87333;           /* Copper accent */
--fire-glass: rgba(255,107,53,0.15);

/* WATER ELEMENT */
--water-base: #061418;           /* Deep ocean */
--water-primary: #4ECDC4;
--water-secondary: #0891B2;
--water-emission: #7FDBDA;
--water-metal: #4A90A4;          /* Brushed titanium blue */
--water-glass: rgba(78,205,196,0.12);

/* EARTH ELEMENT */
--earth-base: #0D0A08;           /* Deep soil */
--earth-primary: #8B7355;
--earth-secondary: #6B5344;
--earth-emission: #DAA520;       /* Amber glow */
--earth-metal: #CD7F32;          /* Bronze */
--earth-glass: rgba(139,115,85,0.15);

/* WIND ELEMENT */
--wind-base: #0A0E12;            /* Twilight */
--wind-primary: #87CEEB;
--wind-secondary: #B0C4DE;
--wind-emission: #E0FFFF;        /* White-cyan glow */
--wind-metal: #C0C0C0;           /* Polished silver */
--wind-glass: rgba(135,206,235,0.10);

/* ARCANE ELEMENT */
--arcane-base: #0C0814;          /* Void purple */
--arcane-primary: #9B59B6;
--arcane-secondary: #6B21A8;
--arcane-emission: #D8B4FE;      /* Soft purple glow */
--arcane-metal: #8B008B;         /* Dark metallic violet */
--arcane-glass: rgba(155,89,182,0.15);
```

---

## Material Layers

### Glass Card Anatomy

A standard glass card has **5 visual layers**:

```
┌─────────────────────────────────┐
│ 1. Specular Highlight (top 30%) │  ← rgba(255,255,255,0.05)
├─────────────────────────────────┤
│                                 │
│ 2. Surface Gradient             │  ← subtle gradient
│                                 │
│                                 │
│ 3. Backdrop Blur Layer          │  ← blur(40px)
│                                 │
│                                 │
├─────────────────────────────────┤
│ 4. Border (gradient)            │  ← top/left brighter
└─────────────────────────────────┘
  5. Shadow Stack (3 layers)        ← ambient + direct + contact
```

**CSS Implementation:**

```css
.glass-card {
  /* Layer 2: Surface gradient */
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.08) 0%,
    rgba(255,255,255,0.02) 100%
  ),
  rgba(15,16,24,0.6);

  /* Layer 3: Backdrop blur */
  backdrop-filter: blur(40px) saturate(150%);
  -webkit-backdrop-filter: blur(40px) saturate(150%);

  /* Layer 4: Border gradient (top/left lighter) */
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 1px solid rgba(255,255,255,0.15);
  border-left: 1px solid rgba(255,255,255,0.12);

  /* Layer 5: Shadow stack */
  box-shadow:
    0 8px 32px rgba(0,0,0,0.4),     /* Ambient */
    0 2px 8px rgba(0,0,0,0.2),      /* Direct */
    inset 0 1px 0 rgba(255,255,255,0.05); /* Inner highlight */

  border-radius: 24px;
}

/* Layer 1: Specular highlight (pseudo-element) */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.05) 0%,
    transparent 100%
  );
  border-radius: 24px 24px 0 0;
  pointer-events: none;
}
```

### Liquid Metal Button Anatomy

A button that looks like polished liquid metal:

```css
.liquid-button {
  /* 3D gradient surface */
  background: linear-gradient(
    180deg,
    rgba(255,229,160,1) 0%,       /* Highlight */
    rgba(212,175,55,1) 40%,       /* Midtone */
    rgba(184,134,11,1) 100%       /* Shadow */
  );

  /* Inner highlight + depth shadow */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.4),      /* Top shine */
    inset 0 -2px 4px rgba(0,0,0,0.2),         /* Bottom depth */
    0 4px 16px rgba(212,175,55,0.4),          /* Ambient glow */
    0 2px 4px rgba(0,0,0,0.2);                /* Contact shadow */

  /* Smooth pill shape */
  border-radius: 9999px;
  padding: 14px 32px;

  /* Text with highlight */
  color: #0A0B10;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(255,255,255,0.2);

  /* Smooth transition */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-button:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.5),
    inset 0 -2px 4px rgba(0,0,0,0.2),
    0 8px 24px rgba(212,175,55,0.5),
    0 4px 8px rgba(0,0,0,0.3);
}

.liquid-button:active {
  transform: translateY(0);
  background: linear-gradient(
    180deg,
    rgba(184,134,11,1) 0%,        /* Inverted gradient */
    rgba(212,175,55,1) 60%,
    rgba(255,229,160,1) 100%
  );
}
```

---

## Shadow System

### The Three-Layer Rule

Every elevated element MUST have three shadow layers for realistic depth:

1. **Ambient** — Large, soft, subtle. Creates atmosphere.
2. **Direct** — Medium, defines the elevation.
3. **Contact** — Small, sharp. Where object touches surface.

```css
/* Low elevation (4px lift) */
box-shadow:
  0 4px 16px rgba(0,0,0,0.3),      /* Ambient */
  0 1px 4px rgba(0,0,0,0.2),       /* Direct */
  0 0 0 1px rgba(255,255,255,0.05); /* Edge definition */

/* Medium elevation (8px lift) */
box-shadow:
  0 8px 32px rgba(0,0,0,0.4),
  0 2px 8px rgba(0,0,0,0.2),
  inset 0 1px 0 rgba(255,255,255,0.05);

/* High elevation (16px lift) */
box-shadow:
  0 16px 48px rgba(0,0,0,0.5),
  0 4px 12px rgba(0,0,0,0.3),
  inset 0 1px 0 rgba(255,255,255,0.08);

/* Floating (32px lift) */
box-shadow:
  0 32px 64px rgba(0,0,0,0.6),
  0 8px 16px rgba(0,0,0,0.4),
  inset 0 2px 0 rgba(255,255,255,0.1);
```

### Inner Shadows (Recessed Elements)

For pressed buttons, input fields, and inset panels:

```css
/* Shallow recess */
box-shadow:
  inset 0 1px 2px rgba(0,0,0,0.2),
  0 1px 0 rgba(255,255,255,0.02);

/* Deep recess */
box-shadow:
  inset 0 2px 8px rgba(0,0,0,0.3),
  inset 0 0 0 1px rgba(0,0,0,0.1),
  0 1px 0 rgba(255,255,255,0.05);
```

---

## Component Anatomy

### Button States

**Idle → Hover → Active → Disabled**

```css
/* Idle */
.btn {
  transform: translateY(0);
  box-shadow: [medium elevation];
}

/* Hover */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: [high elevation];
}

/* Active (pressed) */
.btn:active {
  transform: translateY(0);
  box-shadow: [inner shadow];
}

/* Disabled */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

### Card Hierarchy

**Flat → Raised → Floating → Modal**

| Level | translateY | Blur | Shadow | Use Case |
|-------|-----------|------|--------|----------|
| Flat | 0 | 0px | Low | Inline content |
| Raised | 0 | 24px | Medium | Standard cards |
| Floating | 0 | 40px | High | Featured cards |
| Modal | 0 | 60px | Floating | Overlays, dialogs |

### Input Field Focus Sequence

**Idle → Focus → Filled → Error**

```css
/* Idle */
.input {
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: none;
}

/* Focus */
.input:focus {
  border-color: transparent;
  box-shadow:
    0 0 0 2px rgba(212,175,55,0.3),
    0 0 20px rgba(212,175,55,0.15);
  animation: focus-shimmer 3s ease-in-out infinite;
}

/* Filled (has value) */
.input:not(:placeholder-shown) {
  background: rgba(255,255,255,0.02);
}

/* Error */
.input.error {
  border-color: rgba(220,38,38,0.4);
  box-shadow:
    0 0 0 2px rgba(220,38,38,0.3),
    0 0 20px rgba(220,38,38,0.15);
}
```

---

## Animation Principles

### Motion Curves

Use easing functions that feel physical, not mechanical:

```css
/* Standard ease (most interactions) */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Elastic enter (modals, toasts) */
transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Smooth exit (closing, dismissing) */
transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);

/* Spring physics (buttons, toggles) */
transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Animation Duration Guidelines

| Interaction | Duration | Reason |
|-------------|----------|--------|
| Button hover | 200-300ms | Instant feedback |
| Card expand | 400-500ms | See the motion |
| Modal open | 400ms | Attention shift |
| Page transition | 300ms | Don't delay navigation |
| Loading spinner | Infinite | Persistent state |
| Shimmer effect | 2-3s loop | Ambient, not distracting |

### Micro-interactions

**Button ripple on click:**

```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}
```

**Shimmer on hover:**

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.card:hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.05) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out;
}
```

---

## Performance Budgets

### Desktop (1920x1080, 16GB RAM)

| Element | Max Blur | Max Layers | Max Shadows | Max FPS Drop |
|---------|----------|------------|-------------|--------------|
| Hero section | 60px | 3 | 3 | 5fps |
| Cards | 40px | 2 | 3 | 0fps |
| Buttons | 0px | 1 | 3 | 0fps |
| Modals | 60px | 3 | 3 | 10fps |

### Mobile (iPhone 13, 4GB RAM)

| Element | Max Blur | Max Layers | Max Shadows | Max FPS Drop |
|---------|----------|------------|-------------|--------------|
| Hero section | 24px | 2 | 2 | 10fps |
| Cards | 16px | 1 | 2 | 0fps |
| Buttons | 0px | 1 | 2 | 0fps |
| Modals | 32px | 2 | 2 | 15fps |

### Optimization Techniques

1. **Use `will-change` sparingly**
   ```css
   .card:hover {
     will-change: transform, box-shadow;
   }
   ```

2. **Animate only compositor properties**
   - ✅ `transform`, `opacity`
   - ❌ `width`, `height`, `margin`, `padding`

3. **Pre-render gradients on scroll pause**
   ```javascript
   let scrollTimeout;
   window.addEventListener('scroll', () => {
     clearTimeout(scrollTimeout);
     scrollTimeout = setTimeout(() => {
       // Re-enable gradient animations
     }, 150);
   });
   ```

4. **Reduce blur on low-end devices**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .glass-card {
       backdrop-filter: none;
       background: rgba(15,16,24,0.9);
     }
   }
   ```

---

## Accessibility

### Keyboard Navigation

All interactive elements MUST support keyboard:

```css
.btn:focus-visible {
  outline: 2px solid rgba(212,175,55,0.6);
  outline-offset: 2px;
}

.card:focus-visible {
  box-shadow:
    [existing shadows],
    0 0 0 3px rgba(212,175,55,0.4);
}
```

### Screen Reader Support

```html
<!-- Loading spinner -->
<div class="loading-bubble" role="status" aria-live="polite">
  <span class="sr-only">Loading...</span>
</div>

<!-- Decorative elements -->
<div class="mesh-gradient-blob" aria-hidden="true"></div>

<!-- Interactive glass card -->
<article class="glass-card" tabindex="0" role="article">
  <h3>Card Title</h3>
  <p>Card content...</p>
</article>
```

### Color Contrast

All text on glass backgrounds MUST meet WCAG AA:

| Text Size | Min Contrast | Recommended |
|-----------|--------------|-------------|
| Body (16-18px) | 4.5:1 | 7:1 (AAA) |
| Large (24px+) | 3:1 | 4.5:1 |
| Decorative | N/A | — |

**Test with tools:**
- Chrome DevTools Lighthouse
- axe DevTools
- WebAIM Contrast Checker

---

## Implementation Rules

### The Prime Directive

**Material honesty.** Glass should feel like glass. Metal should feel like metal. Don't fake physics.

### Light Source Consistency

**ALL components** assume light from **top-left, 45° angle**:

- Top edges: brighter (`rgba(255,255,255,0.15)`)
- Left edges: medium (`rgba(255,255,255,0.12)`)
- Bottom edges: darker (`rgba(255,255,255,0.05)`)
- Right edges: darkest (`rgba(255,255,255,0.03)`)

### Border Treatment

Never flat borders:

```css
/* BAD: Flat border */
border: 1px solid rgba(255,255,255,0.1);

/* GOOD: Gradient border suggesting refraction */
border: 1px solid rgba(255,255,255,0.08);
border-top: 1px solid rgba(255,255,255,0.15);
border-left: 1px solid rgba(255,255,255,0.12);
```

### When to Use Each Material

| Material | Use Case | Avoid |
|----------|----------|-------|
| **Glass** | Panels, cards, navigation | Over body text |
| **Liquid Metal** | Primary CTAs, hero buttons | Regular text buttons |
| **Iridescence** | Creative content, element themes | Technical docs, code |
| **Flat** | Body text, code blocks | Interactive elements |

### Restraint Guidelines

Not everything needs the full treatment:

- **Hero sections**: Full glass + liquid metal
- **Content cards**: Glass only
- **Text sections**: Minimal or no glass
- **Code blocks**: Keep high-contrast, no blur
- **Admin/tools**: Simplified glass, no iridescence

### Mobile Considerations

On `< 768px`:

- Reduce blur by 50%
- Remove background gradients
- Simplify shadows (1-2 layers max)
- Disable hover states
- Increase touch target sizes (min 44x44px)

---

## Quick Reference

### Copy-Paste Snippets

**Standard glass card:**
```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%), rgba(15,16,24,0.6);
  backdrop-filter: blur(40px) saturate(150%);
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 1px solid rgba(255,255,255,0.15);
  border-left: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
  border-radius: 24px;
}
```

**Liquid metal button:**
```css
.liquid-button {
  background: linear-gradient(180deg, #FFE5A0 0%, #D4AF37 40%, #B8860B 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 16px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.2);
  border-radius: 9999px;
  padding: 14px 32px;
  color: #0A0B10;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Version History

- **1.0** (Feb 2026) — Initial system based on Apple iOS 18, Porsche Design, Stripe 2024 references

---

*Excellence in execution. Let the work speak.*
