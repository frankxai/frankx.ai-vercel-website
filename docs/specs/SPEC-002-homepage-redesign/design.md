# SPEC-002: Homepage Elite Redesign - Design

**Status:** Proposed
**Deciders:** Frank
**Date:** 2026-01-24

---

## Context and Problem Statement

The FrankX homepage needs to be redesigned to reflect the new "Elite Creator & AI Architect" positioning. The current page has multiple competing CTAs, unclear value proposition, and remnants of old "Conscious AI" messaging. We need a focused, high-converting homepage that establishes credibility and guides visitors to engage.

---

## Decision Drivers

- **Brand Alignment:** Must reflect "Elite Creator & AI Architect" positioning
- **Conversion Focus:** Single primary CTA, clear value proposition
- **Performance:** Must achieve 90+ Lighthouse scores
- **Mobile First:** 60%+ traffic is mobile
- **Maintainability:** Use existing component patterns where possible
- **A/B Testing:** Structure allows easy testing of headlines/CTAs

---

## Considered Options

### Option 1: Full Rebuild with New Components
Create entirely new homepage components from scratch.

**Pros:**
- Complete control over design
- No legacy constraints
- Clean architecture

**Cons:**
- Longer development time
- Risk of introducing bugs
- May not use existing proven patterns

### Option 2: Refactor Existing HomePageElite.tsx
Modify and enhance the existing homepage component.

**Pros:**
- Faster implementation
- Builds on existing work
- Less risk

**Cons:**
- May carry forward technical debt
- Limited by existing structure

### Option 3: Modular Section Architecture (Recommended)
Create reusable section components that compose into the homepage.

**Pros:**
- Reusable across site
- Easy to A/B test sections
- Maintainable long-term
- Can mix existing and new components

**Cons:**
- Requires upfront architecture work
- Slightly more complex

---

## Decision Outcome

**Chosen option:** "Option 3: Modular Section Architecture"

**Because:**
- Sections can be reused on other pages (product pages, landing pages)
- Easy to swap sections for A/B testing
- Aligns with component library goals (SPEC-040)
- Balances new development with reuse

---

## Consequences

### Positive
- Reusable section components for future pages
- Easy A/B testing of headlines, CTAs, layouts
- Clean separation of concerns
- Easier maintenance

### Negative
- More initial architecture work — Mitigation: Define clear component contracts
- Need to document section API — Mitigation: Include in design system (SPEC-004)

---

## Technical Specification

### Architecture Overview

```
app/page.tsx (Homepage)
│
├── components/home/
│   ├── HeroSection.tsx          # Above the fold
│   ├── WhatIBuildSection.tsx    # 3-column features
│   ├── FeaturedProductsSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── LatestContentSection.tsx
│   └── CTASection.tsx           # Footer CTA
│
├── components/sections/         # Shared section primitives
│   ├── SectionWrapper.tsx       # Container, padding, bg
│   ├── SectionHeader.tsx        # Title, subtitle
│   └── SectionGrid.tsx          # Grid layouts
│
└── data/
    └── homepage.ts              # Content configuration
```

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `app/page.tsx` | Modify | Compose new sections |
| `components/home/HeroSection.tsx` | Create | New hero component |
| `components/home/WhatIBuildSection.tsx` | Create | Features grid |
| `components/home/FeaturedProductsSection.tsx` | Modify | Use existing, enhance |
| `components/home/TestimonialsSection.tsx` | Create | Social proof |
| `components/home/LatestContentSection.tsx` | Modify | Blog cards |
| `components/home/CTASection.tsx` | Create | Footer CTA |
| `components/sections/SectionWrapper.tsx` | Create | Reusable wrapper |
| `data/homepage.ts` | Create | Content config |

### Data Structures

```typescript
// data/homepage.ts

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  trustIndicators: TrustIndicator[];
}

export interface TrustIndicator {
  icon: string;
  text: string;
  value?: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

export const homepageContent: HomepageContent = {
  hero: {
    headline: "Build AI-Powered Creator Systems That Actually Ship",
    subheadline: "I help creators go from overwhelmed to empowered with practical AI tools, music production, and systems that work.",
    primaryCTA: {
      text: "Get Free Creator Toolkit",
      href: "/downloads"
    },
    secondaryCTA: {
      text: "See My Work",
      href: "/products"
    },
    trustIndicators: [
      { icon: "music", text: "AI Songs Created", value: "500+" },
      { icon: "building", text: "Oracle AI Architect" },
      { icon: "users", text: "Creators Helped", value: "1000+" },
      { icon: "server", text: "Enterprise Systems" }
    ]
  },
  features: [
    {
      icon: "music",
      title: "Music Systems",
      description: "Suno AI prompts, production workflows, and tools to create professional tracks.",
      href: "/music-lab"
    },
    {
      icon: "cpu",
      title: "AI Systems",
      description: "Enterprise-grade agentic systems, Oracle integration, and automation.",
      href: "/ai-architectures"
    },
    {
      icon: "package",
      title: "Digital Products",
      description: "Courses, toolkits, and systems to accelerate your creator journey.",
      href: "/products"
    }
  ],
  testimonials: [
    // To be populated
  ]
};
```

### Component API

```typescript
// components/home/HeroSection.tsx

interface HeroSectionProps {
  content: HeroContent;
  variant?: 'default' | 'video' | 'minimal';
  className?: string;
}

export function HeroSection({ content, variant = 'default', className }: HeroSectionProps) {
  return (
    <section className={cn("relative min-h-[80vh] flex items-center", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />

      {/* Content */}
      <div className="container relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {content.headline}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
          {content.subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href={content.primaryCTA.href}>
              {content.primaryCTA.text}
            </Link>
          </Button>
          {content.secondaryCTA && (
            <Button size="lg" variant="outline" asChild>
              <Link href={content.secondaryCTA.href}>
                {content.secondaryCTA.text}
              </Link>
            </Button>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap gap-8">
          {content.trustIndicators.map((indicator) => (
            <TrustBadge key={indicator.text} {...indicator} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Styling Approach

```css
/* Use existing Tailwind + design system */

/* Color Palette */
--primary: hsl(var(--primary));
--background: hsl(var(--background));
--foreground: hsl(var(--foreground));
--muted: hsl(var(--muted));
--muted-foreground: hsl(var(--muted-foreground));

/* Typography Scale */
.text-4xl { font-size: 2.25rem; }
.text-6xl { font-size: 3.75rem; }
.tracking-tight { letter-spacing: -0.025em; }

/* Spacing */
.container { max-width: 1280px; padding: 0 1rem; }
.section { padding: 4rem 0; }

/* Responsive */
@media (min-width: 768px) {
  .md\:text-6xl { font-size: 3.75rem; }
}
```

---

## Security Considerations

- No user input on homepage (no injection risk)
- External links use `rel="noopener noreferrer"`
- Images served from trusted CDN
- No sensitive data exposed

---

## Performance Considerations

- Hero image lazy loaded with blur placeholder
- Components code-split by section
- Trust indicators use SVG icons (not images)
- Blog posts fetched at build time (SSG)
- No JavaScript required for initial paint

### Bundle Impact

| Component | Est. Size | Notes |
|-----------|-----------|-------|
| HeroSection | ~5kb | Minimal JS |
| WhatIBuildSection | ~3kb | Static |
| FeaturedProducts | ~8kb | Product cards |
| Testimonials | ~4kb | Carousel optional |
| LatestContent | ~6kb | Blog cards |
| **Total** | **~26kb** | Well under budget |

---

## A/B Testing Strategy

```typescript
// Easy to test different headlines
const headlineVariants = {
  A: "Build AI-Powered Creator Systems That Actually Ship",
  B: "From Overwhelmed to Empowered: AI for Creators",
  C: "Elite Creator Tools. Enterprise AI Expertise."
};

// Easy to test CTAs
const ctaVariants = {
  A: { text: "Get Free Creator Toolkit", href: "/downloads" },
  B: { text: "Join 1000+ Creators", href: "/newsletter" },
  C: { text: "Start Creating Now", href: "/products" }
};
```

---

## Migration Plan

1. **Phase 1:** Create new section components
2. **Phase 2:** Create homepage content config
3. **Phase 3:** Compose new homepage in parallel (at `/home-new`)
4. **Phase 4:** A/B test old vs new
5. **Phase 5:** Replace old homepage
6. **Phase 6:** Remove old components
