# FrankX.AI System Architecture
> **Version**: 3.0 | **Last Updated**: December 2025
> **Purpose**: Complete architectural reference for AI agents and human developers

---

## Table of Contents
1. [Core Philosophy](#core-philosophy)
2. [Technical Stack](#technical-stack)
3. [Design System Architecture](#design-system-architecture)
4. [Animation System](#animation-system)
5. [Content Architecture](#content-architecture)
6. [SEO & Discoverability](#seo--discoverability)
7. [Product Ecosystem](#product-ecosystem)
8. [Agent Orchestration](#agent-orchestration)
9. [Development Workflows](#development-workflows)
10. [Performance & Accessibility](#performance--accessibility)

---

## Core Philosophy

### The Golden Age Vision
FrankX.AI embodies optimism for the AI era. We believe AI amplifies human creativity rather than replacing it. Every system, design choice, and content piece reinforces this philosophy.

### Pure Signal Communication
**Prohibited Language:**
- "Delve," "Unlock potential," "In today's landscape," "Game-changer"
- Generic AI-generated phrases that lack authenticity

**Required Tone:**
- Visionary yet grounded
- Engineering truth over marketing hype
- Direct action verbs: "Architect," "Deploy," "Scale," "Ship"
- Musician-technologist authenticity (Frank's unique voice)

### Design Principles
1. **World-Class Aesthetics**: Every pixel matters. Premium glassmorphism, cinematic animations, state-of-the-art 2025 web standards.
2. **Accessibility First**: WCAG 2.2 AAA compliance, prefers-reduced-motion support, semantic HTML.
3. **Performance Obsessed**: GPU-accelerated animations, code splitting, optimistic UI.
4. **Creator-Centric**: Built for independent creators, not enterprises. Intimate, personal, transformative.

---

## Technical Stack

### Core Framework
```typescript
{
  "framework": "Next.js 16.0.0",
  "react": "19.0.0",
  "language": "TypeScript 5.7.2",
  "styling": "Tailwind CSS 3.4.17",
  "animation": "Framer Motion 11.15.0"
}
```

### Key Dependencies
- **UI Components**: Headless UI, Lucide React icons
- **Content**: MDX (next-mdx-remote), gray-matter
- **Motion**: Framer Motion with custom animation system
- **SEO**: Custom JSON-LD, llms.txt for AI crawlers

### Directory Structure
```
FrankX/
├── app/                    # Next.js 16 App Router
│   ├── page.tsx           # Home (intelligence hub)
│   ├── start/             # Onboarding paths
│   ├── students/          # Center of Excellence
│   ├── products/          # Product showcase
│   ├── blog/              # Creation Chronicles
│   └── realm/             # Community (Nexus)
├── components/
│   ├── home/              # Homepage sections
│   ├── ui/                # Design system primitives
│   │   ├── AdvancedAnimations.tsx
│   │   ├── SplitTextReveal.tsx
│   │   ├── TiltCard.tsx
│   │   ├── CursorSpotlight.tsx
│   │   └── primitives/
│   └── Navigation.tsx
├── lib/
│   ├── design/
│   │   ├── gradients.ts   # Aurora gradient system
│   │   └── motion.ts      # Motion design tokens
│   ├── hub.ts             # Ecosystem definitions
│   └── seo.ts             # Metadata utilities
├── hooks/
│   └── useAccessibleMotion.ts
├── content/
│   └── blog/              # MDX articles
├── public/
│   ├── llms.txt           # AI crawler context
│   ├── rss.xml            # Generated feed
│   └── images/
├── docs/                  # Strategic documentation
│   ├── FRANKX_SYSTEM_ARCHITECTURE.md (this file)
│   ├── strategy/
│   └── pods/              # Product development pods
└── scripts/               # Build & automation
```

---

## Design System Architecture

### Color System: "Glassmorphic Aurora"

#### Brand Palette
```typescript
const brandColors = {
  // Primary gradient (Aurora)
  aurora: {
    from: 'cyan-400',    // #22d3ee
    via: 'blue-500',     // #3b82f6
    to: 'purple-600'     // #9333ea
  },

  // Midnight backgrounds
  midnight: {
    950: '#0c0a1f',      // Deep space
    900: '#1e1b2e',      // Card backgrounds
    800: '#2d2a3f'       // Elevated surfaces
  },

  // Semantic colors
  semantic: {
    success: 'emerald-400',
    warning: 'amber-400',
    info: 'sky-400',
    error: 'red-400'
  }
}
```

#### Glass Morphism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 0 40px rgba(6, 182, 212, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Typography System

#### Font Stack
- **Primary**: Inter (sans-serif)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont

#### Fluid Typography
```typescript
// All headlines use fluid scaling with clamp()
const fluidScale = {
  h1: 'clamp(2.5rem, 5vw + 1rem, 5rem)',    // 40px → 80px
  h2: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)',  // 32px → 56px
  h3: 'clamp(1.5rem, 3vw + 0.5rem, 2rem)',  // 24px → 32px
  body: 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)' // 16px → 20px
}
```

#### Text Contrast (WCAG AAA)
```typescript
// ❌ Avoid (fails WCAG AAA)
text-white/70   // 4.8:1 contrast ratio

// ✅ Use instead
text-slate-200  // 12.6:1 contrast ratio
text-slate-300  // 10.4:1 contrast ratio
text-slate-400  // 7.8:1 contrast ratio (for labels)
```

---

## Animation System

### Motion Design Tokens
Located in `/lib/design/motion.ts`:

```typescript
export const motionDurations = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slowest: 0.8
}

export const motionEasing = {
  smooth: [0.25, 0.1, 0.25, 1],      // Natural, organic
  snappy: [0.4, 0, 0.2, 1],          // Responsive UI
  bounce: [0.68, -0.55, 0.265, 1.55], // Playful
  dramatic: [0.16, 1, 0.3, 1]        // Cinematic entrances
}

export const motionSpring = {
  gentle: { stiffness: 150, damping: 20 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 15 }
}
```

### Advanced Animation Components

#### 1. SplitTextReveal
Cinematic headline animations with word-by-word reveals.

```tsx
<SplitTextReveal
  text="Transform Ideas Into Exponential Results"
  className="text-7xl font-bold"
  delay={0.2}
  staggerDelay={0.08}
/>
```

**Features:**
- Respects `prefers-reduced-motion`
- 3D perspective (rotateX)
- Spring physics for natural feel
- GPU-accelerated

#### 2. TiltCard
3D tilt effect with mouse tracking.

```tsx
<TiltCard intensity={7.5} glowEffect={true}>
  <Card>Content with depth</Card>
</TiltCard>
```

**Features:**
- Follows cursor position
- Radial glow effect
- Spring-based smoothing
- GPU layer optimization

#### 3. ParallaxLayer
Multi-layer parallax for depth perception.

```tsx
<ParallaxLayer offset={-80} blur={3}>
  <BackgroundOrbs />
</ParallaxLayer>
<ParallaxLayer offset={-40} blur={1}>
  <Gradients />
</ParallaxLayer>
<ParallaxLayer offset={0}>
  <HeroContent />
</ParallaxLayer>
```

#### 4. CursorSpotlight
Subtle cursor-following glow for premium desktop UX.

```tsx
<CursorSpotlight />
```

**Automatic behavior:**
- Only renders on desktop (lg+)
- Disabled when `prefers-reduced-motion` is set
- Radial gradient follows cursor at 600px radius

### Accessibility: prefers-reduced-motion

**ALL animations must respect user preferences:**

```typescript
import { useReducedMotion } from 'framer-motion'

function MyComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
    >
      Content
    </motion.div>
  )
}
```

**Hook: useAccessibleMotion**
```typescript
const { fadeIn, slideUp, scaleUp, shouldReduceMotion } = useAccessibleMotion()
```

---

## Content Architecture

### Content Types

#### 1. Creation Chronicles (Blog)
- **Format**: MDX with frontmatter
- **Location**: `/content/blog/*.mdx`
- **Generation**: Static at build time
- **Features**: Reading time, syntax highlighting, related posts

#### 2. Intelligence Atlas
- **Purpose**: 100,000-word strategic roadmap
- **Volumes**: 10 volumes (monthly cadence)
- **Format**: Long-form essays + executive summaries
- **Target**: Creators, executives, families

#### 3. Product Documentation
- **Pods**: Modular product development units
- **Location**: `/docs/pods/`
- **Format**: Markdown with YAML frontmatter

### MDX Pipeline

```typescript
// 1. Parse frontmatter
const { data, content } = matter(mdxSource)

// 2. Transform MDX → React
const mdxSource = await serialize(content, {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [rehypeHighlight, rehypeSlug]
  }
})

// 3. Render with components
<MDXRemote {...mdxSource} components={mdxComponents} />
```

---

## SEO & Discoverability

### Answer Engine Optimization (AEO)

#### llms.txt
Located at `/public/llms.txt` - provides structured context for AI crawlers (ChatGPT, Claude, Perplexity).

```markdown
# FrankX.AI

## Who We Are
Frank is a musician-technologist helping creators ship faster with AI...

## Products
- Vibe OS: 500+ Suno music workflows
- Creative AI Toolkit: Prompt library + automation templates
- Agentic Creator OS: Full Notion workspace system

## Key Resources
> /blog: Creation Chronicles (AI for creators)
> /products: Product showcase
> /students: AI Center of Excellence builder
```

#### JSON-LD Structured Data
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Frank',
  jobTitle: 'Creator & Oracle AI Architect',
  offers: [
    { '@type': 'Offer', name: 'Vibe OS', url: '...' },
    // ... additional products
  ]
}
```

### Pre-build Scripts
Run before every `npm run build`:

1. **generate_interlinked_html.mjs**: Creates SEO-optimized static pages
2. **generate_feed.mjs**: Builds RSS/Atom feeds
3. **generate_search_index.mjs**: Creates Lunr.js search index

```json
{
  "scripts": {
    "prebuild": "npm run gen:html && npm run gen:feed && npm run gen:search"
  }
}
```

---

## Product Ecosystem

### 4-Tier Product Ladder

#### Tier 1: Magnets (Free)
- **Soul Frequency Assessment**: AI archetype quiz
- **AI Agent Starter Kit**: 5 essential prompts
- **Founder's Readiness Checklist**: ROI calculator
- **Family AI Guide**: Safety frameworks

#### Tier 2: Micro-Products ($7-$97)
- **Creative AI Toolkit** ($47): 100+ prompts
- **Vibe OS Essentials** ($37): Suno/Udio workflows
- **Family AI Integration** ($27): Parenting in AI era

#### Tier 3: Systems ($197-$997)
- **Agentic Creator OS** ($497): Notion workspace (flagship)
- **Music Producer's Academy** ($297): Advanced Suno

#### Tier 4: High-Touch ($2k+)
- **Enterprise AI Transformation**: C-suite consulting
- **Nexus (The Realm)**: Gated inner circle membership

### Product Pages Structure
```typescript
// /app/products/[slug]/page.tsx
{
  hero: "Transformation headline",
  problem: "What overwhelms the creator",
  solution: "How this product helps",
  features: "Specific capabilities",
  testimonials: "Social proof",
  pricing: "Clear tiers",
  cta: "Magnetic call-to-action"
}
```

---

## Agent Orchestration

### The Collective Intelligence Model

FrankX operates as a **multi-agent system** rather than a personal brand.

#### Core Agents

1. **Strategos (The Strategist)**
   - **Role**: North Star, goals, analytics
   - **Tools**: Strategy docs, roadmaps, metrics
   - **Personality**: Analytical, focused, directive

2. **Muse (The Creative Director)**
   - **Role**: Aesthetics, storytelling, vibe
   - **Tools**: Design systems, content frameworks
   - **Personality**: Divergent, artistic, intuitive

3. **Builder (The Technical Architect)**
   - **Role**: Code, systems, infrastructure
   - **Tools**: Next.js, Vercel, TypeScript
   - **Personality**: Pragmatic, detail-oriented, systematic

4. **Guardian (Quality Sentinel)**
   - **Role**: Accessibility, privacy, standards
   - **Tools**: WCAG audits, performance testing
   - **Personality**: Protective, rigorous, conscientious

5. **Connector (Relationship Architect)**
   - **Role**: Community, social, engagement
   - **Tools**: Social media, email, events
   - **Personality**: Warm, empathetic, networked

6. **Visionary (Future Architect)**
   - **Role**: 10-year horizon, moonshots
   - **Tools**: Trend analysis, scenario planning
   - **Personality**: Optimistic, ambitious, long-term

### Agent Activation in Claude Code

```markdown
# To activate specific agent modes:
"Activate Strategos mode for roadmap planning"
"Channel Muse for content creation"
"Engage Builder for technical implementation"
"Consult Guardian for accessibility audit"
```

---

## Development Workflows

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-animation-system
# ... make changes ...
git add .
git commit -m "Add TiltCard and SplitTextReveal components"
git push origin feature/new-animation-system

# Vercel auto-deploys preview
# Review → Merge to main → Production deploy
```

### Build Commands
```bash
npm run dev          # Local development (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run type-check   # TypeScript validation
npm run lint         # ESLint + Next.js checks
```

### Testing Checklist
Before every PR:

- [ ] TypeScript compiles (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Lighthouse score >90 (Performance, A11y, Best Practices)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Mobile responsive (320px → 1920px)
- [ ] Screen reader navigation (VoiceOver/NVDA)
- [ ] Keyboard-only navigation

---

## Performance & Accessibility

### Performance Targets

```typescript
{
  "Lighthouse": {
    "Performance": ">90",
    "Accessibility": "100",
    "Best Practices": "100",
    "SEO": "100"
  },
  "Core Web Vitals": {
    "LCP": "<2.5s",  // Largest Contentful Paint
    "FID": "<100ms", // First Input Delay
    "CLS": "<0.1"    // Cumulative Layout Shift
  }
}
```

### Optimization Techniques

#### 1. Code Splitting
```typescript
// Lazy load heavy components
const TiltCard = dynamic(() => import('@/components/ui/TiltCard'), {
  loading: () => <CardSkeleton />,
  ssr: false  // Client-side only for animations
})
```

#### 2. GPU Acceleration
```css
/* Force GPU rendering */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}
```

#### 3. Image Optimization
```tsx
<Image
  src="/hero.jpg"
  alt="..."
  width={1200}
  height={630}
  priority  // For above-fold images
  placeholder="blur"
  blurDataURL="..."
/>
```

#### 4. Font Loading
```typescript
// next.config.js
{
  optimizeFonts: true,
  fontLoaders: [
    { loader: '@next/font/google', options: { subsets: ['latin'] } }
  ]
}
```

### Accessibility Standards

#### WCAG 2.2 Level AAA
- **Color Contrast**: 7:1 for normal text, 4.5:1 for large text
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels, semantic HTML
- **Motion**: Respect `prefers-reduced-motion`

#### Focus Management
```tsx
// Visible focus rings
.focus-visible:focus {
  outline: 2px solid theme('colors.cyan.400');
  outline-offset: 2px;
}

// Skip to content link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

---

## Deployment & Environments

### Vercel Configuration

```typescript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],  // US East
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://frankx.ai"
  }
}
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://frankx.ai
NOTION_API_KEY=secret_***
RESEND_API_KEY=re_***
```

---

## Future Roadmap

### Q1 2025
- [ ] Magic UI component integration
- [ ] Private `/studio` for drafting
- [ ] Knowledge graph semantic mapping
- [ ] Advanced search with AI embeddings

### Q2 2025
- [ ] Real-time collaboration features
- [ ] Voice-to-content pipeline
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)

### Q3 2025
- [ ] AI-powered content recommendations
- [ ] Community features (forums, live events)
- [ ] Advanced analytics dashboard
- [ ] Plugin ecosystem for creators

---

## Contributing Guidelines

### For AI Agents
When working on FrankX:
1. **Read this document first** to understand architecture
2. **Respect the design system** - use existing tokens/components
3. **Accessibility is non-negotiable** - test with reduced motion
4. **Ask before major changes** - discuss in issues/PRs
5. **Document your work** - update this file with new patterns

### For Human Developers
- Follow TypeScript strict mode
- Use Prettier + ESLint configurations
- Write descriptive commit messages
- Test on mobile devices before merging
- Join the Discord for architecture discussions

---

## Contact & Support

- **Primary Contact**: Frank (hello@frankx.ai)
- **Documentation Issues**: GitHub Issues
- **Community**: Discord (link in README)
- **Strategic Consulting**: Calendly (calendly.com/frankx)

---

**Last Updated**: December 11, 2025
**Version**: 3.0
**Maintainer**: Claude Code (with Frank's oversight)
