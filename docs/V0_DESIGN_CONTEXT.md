# FrankX.AI Design Context for v0

> Use this document as comprehensive context when generating UI components and pages with v0.
> Last updated: December 2025

---

## 1. CORE IDENTITY

### Who is FrankX?
- **Frank** = Oracle AI Architect + musician-technologist with 500+ AI-generated songs
- **NOT** a generic tech guru—a creator who bridges enterprise expertise with artistic expression
- **Mission**: Transform creators and students from tech-overwhelmed to AI-empowered

### What is FrankX.AI?
- **Personal hub** for goal-aligned AI systems
- **NOT** an enterprise SaaS—a creator/student resource center
- **Philosophy**: "Build AI Systems Aligned With Your Goals"
- Free resources + open development + real community

### Brand Voice
- **Direct & Signal-First**: No filler, no hype
- **Prohibited phrases**: "Delve," "Unlock potential," "In today's landscape," "Game-changer," "Let's dive in"
- **Required tone**: Visionary but grounded. Engineering truth. Verbs like "Architect," "Deploy," "Scale," "Build," "Ship"
- **Personal**: Uses "I" and shares real creator journey
- **Technical but accessible**: Oracle-level knowledge made simple for creators

---

## 2. TARGET AUDIENCES

### Primary: Creators
- Musicians, content creators, artists
- Want AI workflows that amplify their unique voice
- Pain: Overwhelmed by AI tools, losing authenticity
- Goal: Ship faster while staying true to their style

### Secondary: Students
- Learners building personal AI systems
- Career planning, skill development, life domains
- Pain: Generic AI advice doesn't fit their goals
- Goal: Custom AI assistants aligned with how they think

### Tertiary: Builders & Teams
- Developers building AI products
- Teams wanting aligned AI workflows
- Pain: Lack of practical architecture patterns
- Goal: Ship real AI systems, not experiments

---

## 3. DESIGN SYSTEM: "GLASSMORPHIC AURORA"

### Color Palette

```css
/* === BACKGROUND === */
--midnight-950: #020617;    /* Main background - almost black */
--midnight-900: #0f172a;    /* Secondary background */
--black: #000000;           /* Pure black for depth */

/* === AURORA ACCENTS === */
--cyan-400: #22d3ee;        /* Primary accent - vibrant cyan */
--cyan-500: #06b6d4;        /* Primary accent - deeper */
--purple-500: #a855f7;      /* Secondary accent */
--blue-500: #3b82f6;        /* Tertiary accent */
--blue-400: #60a5fa;        /* Light blue */

/* === TEXT === */
--white: #ffffff;           /* Headlines, primary text */
--white-70: rgba(255,255,255,0.7);  /* Body text */
--white-50: rgba(255,255,255,0.5);  /* Secondary text */
--white-40: rgba(255,255,255,0.4);  /* Subtle text */
--white-20: rgba(255,255,255,0.2);  /* Borders */
--white-10: rgba(255,255,255,0.1);  /* Card backgrounds */
--white-5: rgba(255,255,255,0.05);  /* Subtle backgrounds */

/* === SEMANTIC === */
--primary-gradient: linear-gradient(to right, #22d3ee, #3b82f6);
--aurora-gradient: linear-gradient(to right, #06b6d4, #a855f7, #3b82f6);
```

### Typography
- **Font Stack**: Inter (primary), system-ui fallback
- **Headlines**: Bold, tight tracking (-0.02em)
  - H1: 5xl-8xl (text-5xl md:text-7xl lg:text-8xl)
  - H2: 3xl-5xl (text-3xl md:text-5xl)
  - H3: xl-2xl (text-xl md:text-2xl)
- **Body**: Regular weight, relaxed leading (leading-relaxed)
- **Labels**: Uppercase, wide tracking (tracking-[0.4em]), small size

### Glassmorphism Pattern
```css
/* Standard glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem; /* rounded-3xl */
}

/* Glass card hover */
.glass-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Premium glass with glow */
.glass-card-premium:hover {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
}
```

### Border Radius Scale
- Cards: rounded-3xl (1.5rem)
- Buttons: rounded-full
- Icons/badges: rounded-2xl (1rem)
- Inputs: rounded-xl (0.75rem)

### Shadows
- Subtle: shadow-lg shadow-black/20
- Glow: shadow-[0_0_30px_rgba(34,211,238,0.3)]
- Deep: shadow-2xl

---

## 4. UI COMPONENT SOURCES

### Philosophy
**"Best components from the best libraries"** - No single source. Curate world-class UI.

### Library Usage

| Library | Best For | Examples |
|---------|----------|----------|
| **Magic UI** | Animated components | Hero backgrounds, text reveals, magnetic buttons, spotlight effects |
| **shadcn/ui** | Accessible primitives | Forms, dialogs, dropdowns, navigation, data display |
| **Cult UI** | Premium effects | 3D cards, particle systems, advanced hover states |
| **Aceternity UI** | Cinematic animations | Parallax, spotlight, aurora backgrounds |
| **Framer Motion** | Custom animations | Page transitions, stagger reveals, gestures |

### Selection Criteria
1. **Performance**: Lightweight, tree-shakable
2. **Accessibility**: WCAG 2.2 AA minimum
3. **Customizable**: Tailwind-native
4. **Modern**: React 18+, TypeScript, Server Components compatible

---

## 5. ANIMATION PATTERNS

### Fade In Up (Most Common)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

### Magnetic Hover (Buttons/CTAs)
```tsx
// Element follows cursor within bounds
// Intensity: 0.3-0.5 for subtle, 0.5-1.0 for strong
```

### Glow Pulse (Primary CTAs)
```tsx
animate={{
  boxShadow: [
    "0 0 20px rgba(34,211,238,0.3)",
    "0 0 40px rgba(34,211,238,0.5)",
    "0 0 20px rgba(34,211,238,0.3)"
  ]
}}
transition={{ duration: 2, repeat: Infinity }}
```

### Morphing Background
- Multiple gradient blobs (purple, blue, cyan)
- Slow scale/position animations (20-30s duration)
- Blur-3xl for soft glow effect
- pointer-events-none

---

## 6. PAGE STRUCTURE

### Current Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Homepage - main hub | Live |
| `/products/vibe-os` | AI music creation system | Live |
| `/students` | Student learning hub | Live |
| `/prompt-library` | 200+ free prompts | Live |
| `/blog` | Creation Chronicles articles | Live |
| `/creation-chronicles` | Behind-the-scenes development | Live |
| `/music-lab` | Frank's music showcase | Live |
| `/roadmap` | Public development roadmap | Live |
| `/resources` | Resource collections | Live |
| `/guides` | In-depth guides | Live |
| `/templates` | Downloadable templates | Live |
| `/about` | About Frank | Live |
| `/enterprise` | Team solutions | Live |
| `/realm` | Inner circle / premium | Waitlist |

### Homepage Sections (Order)

1. **Hero** - Main headline, CTAs, stats
2. **Highlights** - 3-column value props (Creators, Students, Open)
3. **Quick Actions** - 6-card grid to key areas
4. **Strategic Spotlights** - Featured products/content
5. **Resources** - Categorized resource collections
6. **Testimonials** - Social proof
7. **Final CTA** - Newsletter/conversion

---

## 7. HERO SECTION SPEC

### Content
```
Eyebrow: "FRANKX" (uppercase, tracking-[0.4em], white/40)

Headline Line 1: "Build AI Systems"
  - gradient: from-white via-white to-white/70

Headline Line 2: "Aligned With Your Goals"
  - gradient: from-cyan-400 to-blue-500

Subtitle: "Free resources for creators and students.
           Practical frameworks. Open development. Real community."

Primary CTA: "Start Free" → /start
  - White background, black text
  - Rounded-full, magnetic hover, glow pulse

Secondary CTA: "Explore Vibe OS" → /products/vibe-os
  - Glass button with sparkle icon
  - Border white/20, bg white/5

Tertiary Link: "How We Build This" → /creation-chronicles
  - Text link, white/40, underline on hover
```

### Stats (3-column grid below CTAs)
```
500+ | Creators & Students | Building AI systems aligned with their unique goals
200+ | Free Resources | Prompts, templates, and guides
100% | Open Source | Transparent methodologies you can adapt
```

---

## 8. COMPONENT PATTERNS

### Card Pattern
```tsx
<div className="
  p-8
  rounded-3xl
  bg-white/5
  border border-white/10
  backdrop-blur-xl
  hover:bg-white/10
  hover:border-white/20
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-2xl font-bold text-white mb-3">Title</h3>
  <p className="text-white/60 leading-relaxed">Description</p>
</div>
```

### Button Pattern (Primary)
```tsx
<button className="
  group
  relative
  inline-flex items-center justify-center
  rounded-full
  bg-white
  px-8 py-4
  text-lg font-bold
  text-black
  transition-all
  hover:bg-neutral-200
  hover:scale-105
">
  Label
  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
</button>
```

### Button Pattern (Secondary/Glass)
```tsx
<button className="
  group
  inline-flex items-center justify-center
  rounded-full
  border border-white/20
  bg-white/5
  px-8 py-4
  text-lg font-semibold
  text-white
  backdrop-blur-sm
  transition-all
  hover:bg-white/10
  hover:border-white/40
">
  Label
  <Sparkles className="ml-2 h-5 w-5 text-yellow-400" />
</button>
```

### Section Container
```tsx
<section className="py-24 px-6 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Section Heading
```tsx
<div className="text-center mb-16">
  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
    Section Title
  </h2>
  <p className="text-xl text-white/60 max-w-2xl mx-auto">
    Section description text here.
  </p>
</div>
```

### Gradient Border Card
```tsx
<div className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500">
  <div className="bg-slate-950 rounded-2xl p-6">
    Content
  </div>
</div>
```

---

## 9. PRODUCTS & FEATURES

### Vibe OS (Flagship - AI Music)
- AI-powered music creation with Suno
- Complete workflow: prompts → generation → publishing
- For creators wanting to make original music

### Student Hub
- Personal AI learning systems
- Career planning, skill development
- Life domain frameworks

### Prompt Library
- 200+ free prompts
- Categories: Music, Content, Business, Learning
- Copy, adapt, customize

### Creation Chronicles
- Behind-the-scenes development
- Human-AI collaboration stories
- Open development methodology

---

## 10. ICONS (Lucide React)

Primary icons used:
- `Music` - Creators, Vibe OS
- `Users` - Students, Community
- `Brain` - AI, Intelligence
- `Sparkles` - Magic, Premium
- `BookOpen` - Learning, Guides
- `ArrowRight` - CTAs, Navigation
- `ArrowUpRight` - External links
- `CalendarCheck` - Roadmap
- `Bot` - Agents, Builders
- `Building2` - Enterprise
- `CheckCircle2` - Testimonials

---

## 11. RESPONSIVE BREAKPOINTS

```
sm: 640px   - Mobile landscape
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Extra large
```

### Common patterns:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `text-5xl md:text-7xl lg:text-8xl`
- `px-6` (consistent horizontal padding)
- `py-24` (generous section spacing)

---

## 12. ACCESSIBILITY REQUIREMENTS

- **Contrast**: WCAG 2.2 AAA (7:1 for text)
- **Focus states**: Visible focus rings
- **Keyboard**: All interactive elements navigable
- **Motion**: Respect `prefers-reduced-motion`
- **Semantics**: Proper heading hierarchy, landmarks

---

## 13. v0 GENERATION INSTRUCTIONS

When generating components with v0:

1. **Always use**:
   - Tailwind CSS classes (no custom CSS)
   - Framer Motion for animations
   - Lucide React icons
   - TypeScript with proper types

2. **Color approach**:
   - Background: slate-950 or black
   - Text: white (headlines), white/70 or white/60 (body)
   - Accents: cyan-400/500, blue-500, purple-500
   - Borders: white/10 or white/20

3. **Animation approach**:
   - Subtle by default (0.3-0.5s durations)
   - Stagger reveals for lists
   - Hover states on all interactive elements
   - No jarring movements

4. **Component structure**:
   - 'use client' for interactive components
   - Props with TypeScript interfaces
   - className prop for customization
   - cn() utility for conditional classes

5. **Avoid**:
   - Generic "tech startup" aesthetics
   - Overwhelming gradients
   - Heavy drop shadows
   - Neon/cyberpunk extremes
   - Enterprise/corporate styling

---

## 14. EXAMPLE PROMPTS FOR v0

### Hero Section
```
Create a hero section with:
- Dark slate-950 background with animated gradient blobs (purple, cyan, blue)
- Large headline "Build AI Systems" (white gradient) + "Aligned With Your Goals" (cyan-blue gradient)
- Subtitle about free resources for creators/students
- Two CTAs: Primary (white, rounded-full) and Secondary (glass button)
- 3-column stats grid below
- Use Framer Motion for stagger animations
- Glassmorphic aesthetic with subtle hover states
```

### Feature Cards
```
Create a 3-column feature card grid with:
- Glassmorphic cards (bg-white/5, backdrop-blur, border-white/10)
- Icon in rounded container (bg-white/10)
- Title, description, optional CTA link
- Hover: card lifts, border brightens, subtle glow
- Stagger animation on scroll
- Dark background, aurora aesthetic
```

### Navigation
```
Create a sticky navigation with:
- Transparent/glass background on scroll
- Logo "FrankX" on left
- Nav links center: Products, Resources, Blog, About
- CTA button right: "Start Free"
- Mobile: hamburger menu with slide-out panel
- Smooth backdrop-blur transition on scroll
```

---

*This document provides complete context for generating FrankX.AI UI components with v0. Keep the aesthetic premium but accessible, animated but not overwhelming, technical but warm.*
