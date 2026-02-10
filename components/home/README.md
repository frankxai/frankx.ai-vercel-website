# Homepage Components - SPEC-002

Premium, mobile-first homepage implementation with modular section components.

## Architecture

### Brand DNA Alignment
- **NO** spiritual/consciousness language
- **YES** Systems Architect × Composer × Gamer × Builder × GenCreator
- Premium quality, technical depth, humble confidence
- Results-focused, practical value

### Component Structure

```
components/home/
├── HeroSection.tsx           # Above-fold value prop + CTAs + trust indicators
├── WhatIBuildSection.tsx     # 3-column: Music, AI Systems, Products
├── FeaturedProductsSection.tsx # Vibe OS (FREE), Creative AI Toolkit
├── LatestContentSection.tsx  # Blog article cards
├── CTASection.tsx            # Footer newsletter/CTA
├── HomePageElite.tsx         # Legacy component (can be deprecated)
└── index.ts                  # Exports
```

### Content Configuration

All content is centralized in `/data/homepage.ts`:

```typescript
import { homepageContent } from '@/data/homepage'

// Access structured content:
homepageContent.hero.headline
homepageContent.whatIBuild.items
homepageContent.featuredProducts.products
```

## Components

### HeroSection

**Purpose**: Clear value proposition, single primary CTA, trust indicators

**Features**:
- Animated gradient background with emerald/cyan accents
- Trust indicators with icons (12K+ songs, Oracle, etc.)
- Primary CTA: "Get Free Creator Toolkit"
- Secondary CTA: "Explore Products"
- Mobile-first responsive design
- Scroll indicator

**Props**: None (uses `homepageContent.hero`)

### WhatIBuildSection

**Purpose**: Three focus areas with stats and descriptions

**Features**:
- 3-column grid (stacks on mobile)
- Color-coded by focus area (cyan, emerald, violet)
- Stats display for each category
- Hover effects with gradient overlays
- Links to detail pages

**Props**: None (uses `homepageContent.whatIBuild`)

### FeaturedProductsSection

**Purpose**: Showcase 2 primary products with clear CTAs

**Features**:
- 2-column layout (stacks on mobile)
- FREE and MOST POPULAR badges
- Product stats in grid
- Gradient hover effects
- Tracking for analytics
- Link to full products page

**Props**: None (uses `homepageContent.featuredProducts`)

### LatestContentSection

**Purpose**: Display latest 3 blog articles with images

**Features**:
- 3-column grid (responsive)
- Article images with gradient overlays
- Category badges
- Reading time estimates
- Truncated summaries (3 lines)
- Link to full blog

**Props**:
```typescript
interface LatestContentSectionProps {
  articles: Article[]
}

interface Article {
  slug: string
  title: string
  summary: string
  publishedAt: string
  image?: string
  readingTime?: string
  category?: string
}
```

### CTASection

**Purpose**: Final conversion section with newsletter signup or main CTA

**Features**:
- Centered layout with gradient orbs
- Dual CTAs (primary + secondary)
- Social links row
- Animated entrance
- Mobile-optimized button sizes (min 48px)

**Props**: None (uses `homepageContent.cta`)

## Mobile-First Design

### Touch Targets
- All buttons: min-height 48px
- Touch-friendly spacing
- Thumb-zone optimized CTAs

### Typography
- Responsive font sizes using clamp()
- Readable on small screens (16px+ body)
- Proper line-height for mobile

### Spacing
- Generous whitespace
- Collapsible sections
- Stack on mobile, grid on desktop

### Performance
- Lazy-loaded images
- Optimized animations (respects prefers-reduced-motion)
- Minimal JavaScript

## Styling System

### Colors
```css
Background: #030712 (gray-950)
Accents:
  - Emerald: #10B981
  - Cyan: #06B6D4
  - Violet: #8B5CF6
Text:
  - Primary: #FAFAFA
  - Secondary: rgba(250,250,250,0.6)
  - Tertiary: rgba(250,250,250,0.4)
```

### Animations
- Framer Motion for orchestrated entrances
- Staggered children for visual hierarchy
- Reduced motion support built-in
- Subtle hover states

### Glass Effects
- `bg-white/[0.02]` for cards
- `border-white/[0.06]` for borders
- Backdrop blur where appropriate
- Gradient overlays on hover

## Analytics Tracking

All CTAs include tracking:

```typescript
trackEvent('cta_click', {
  location: 'hero',
  type: 'hero-primary-cta'
})

trackEvent('product_click', {
  location: 'homepage_featured',
  product_id: 'vibe-os'
})
```

## Usage in app/page.tsx

```typescript
import { HeroSection } from '@/components/home/HeroSection'
import { WhatIBuildSection } from '@/components/home/WhatIBuildSection'
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection'
import { LatestContentSection } from '@/components/home/LatestContentSection'
import { CTASection } from '@/components/home/CTASection'
import { getLatestPosts } from '@/lib/blog'

export default async function Page() {
  const latestPosts = await getLatestPosts(3)

  const articles = latestPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    image: post.image,
    readingTime: post.readingTime,
    category: post.category,
  }))

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden bg-gray-950">
      <HeroSection />
      <TrustedByBlock />
      <WhatIBuildSection />
      <FeaturedProductsSection />
      <LatestContentSection articles={articles} />
      <CTASection />
    </main>
  )
}
```

## Metadata & SEO

Updated metadata removes "Conscious AI" language:

```typescript
export const metadata = createMetadata({
  title: 'FrankX.AI | AI Systems & Creator Tools',
  description: 'Build AI-powered creator systems that actually ship...',
  keywords: [
    'ai systems',
    'ai tools for creators',
    'ai music creation',
    'suno ai',
    'creator tools',
    'ai architecture',
  ],
})
```

Schema markup includes:
- WebSite schema with search action
- Person schema (Frank Riemer, AI Systems Architect)
- Organization schema (FrankX.AI)

## Next Steps

1. **Test Build**: `npm run build`
2. **Preview**: `npm run dev` and check localhost:3000
3. **Mobile Test**: Use responsive dev tools
4. **Accessibility**: Test with screen reader
5. **Performance**: Run Lighthouse audit
6. **Deploy**: Push to production branch

## Migration from HomePageElite

The old `HomePageElite.tsx` component can be deprecated. Key differences:

| Old | New |
|-----|-----|
| Monolithic 1150-line component | 5 focused components |
| Hardcoded content | Centralized config |
| "Conscious AI" messaging | Systems Architect positioning |
| Abstract concepts | Concrete value propositions |
| Rotating word animations | Clear, static messaging |
| Complex nested sections | Clean, modular sections |

## Performance Checklist

- [ ] Images optimized (WebP, lazy loading)
- [ ] Animations respect prefers-reduced-motion
- [ ] Touch targets minimum 48px
- [ ] Text readable on mobile (16px+)
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast load (LCP < 2.5s)
- [ ] Accessible (ARIA labels, semantic HTML)
- [ ] Schema markup validated

---

**Last Updated**: 2026-01-27
**SPEC**: SPEC-002 Mobile-First Premium Homepage
**Brand DNA**: Systems Architect × Composer × Builder × GenCreator
