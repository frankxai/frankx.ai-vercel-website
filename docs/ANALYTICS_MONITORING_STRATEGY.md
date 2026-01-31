# Analytics Monitoring Strategy for Design Variants

## Overview

This document outlines the analytics monitoring strategy for tracking and comparing the performance of different page design variants on FrankX.ai.

## Current Preview Routes

### Homepage Variants (10)
| Route | Design | Key Characteristics |
|-------|--------|---------------------|
| `/v1` | Elite | Dark mode, emerald accents, embedded music player |
| `/v2` | Premium Raycast | Mesh gradients, glassmorphism, bento grid |
| `/v3` | Editorial Luxury | Magazine-style, serif typography, light mode |
| `/v4` | Dark Terminal | Hacker aesthetic, monospace, command-line UI |
| `/v5` | Vibrant Creator | Bold gradients, playful energy, SaaS-style |
| `/v6` | Cinematic | Full-bleed images, parallax, Netflix-style |
| `/v7` | Minimalist | Apple-inspired, ultra-clean, maximum whitespace |
| `/v8` | Brutalist | Raw aesthetic, harsh contrasts, anti-design |
| `/v9` | Gradient Wave | Stripe/Linear inspired, animated gradients |
| `/v10` | Feed | Twitter/X style social feed timeline |

### Products Page Variants (3)
| Route | Design | Key Characteristics |
|-------|--------|---------------------|
| `/products-v1` | Grid | Standard product cards in grid layout |
| `/products-v2` | Bento | Modern bento box with varying sizes |
| `/products-v3` | Timeline | Roadmap-style with launch dates |

### Music Lab Variants (3)
| Route | Design | Key Characteristics |
|-------|--------|---------------------|
| `/music-lab-v1` | Tutorial | Educational step-by-step guide |
| `/music-lab-v2` | Player | Spotify-style with waveform visualization |
| `/music-lab-v3` | Studio | Pro audio aesthetic with faders/knobs |

## Analytics Implementation Options

### Option 1: Vercel Analytics (Recommended for Quick Start)

Vercel Analytics is already integrated and provides:
- Page views per route
- Web Vitals (LCP, FID, CLS)
- Visitor insights
- Real-time data

**Setup:**
Already enabled in `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'
<Analytics />
```

**Tracking variant performance:**
- Each variant is a distinct route, so Vercel automatically tracks them
- Compare page views at `/admin/variants` vs actual variant pages
- Monitor Web Vitals per variant to identify performance issues

### Option 2: Custom Event Tracking

For deeper insights, implement custom event tracking:

```typescript
// lib/variant-analytics.ts
import { track } from '@vercel/analytics'

export function trackVariantView(variant: string, page: 'homepage' | 'products' | 'music-lab') {
  track('variant_view', {
    variant,
    page,
    timestamp: new Date().toISOString(),
  })
}

export function trackVariantInteraction(
  variant: string,
  action: 'cta_click' | 'scroll_depth' | 'time_on_page',
  details?: Record<string, string | number>
) {
  track('variant_interaction', {
    variant,
    action,
    ...details,
  })
}
```

**Key events to track:**
- `variant_view` - When a variant page loads
- `cta_click` - Clicks on CTAs (newsletter, products, etc.)
- `scroll_depth` - How far users scroll (25%, 50%, 75%, 100%)
- `time_on_page` - Engagement duration
- `navigation_click` - Where users go next

### Option 3: Full A/B Testing (Post-Decision)

After selecting winning variants, implement proper A/B testing:

```typescript
// lib/ab-testing.ts
export const homepageTest: ABTestConfig = {
  name: 'homepage-2026-q1',
  cookieName: 'fx-hp-variant',
  cookieMaxAge: 60 * 60 * 24 * 30, // 30 days
  enabled: true,
  variants: [
    { id: 'v1', name: 'Elite', weight: 50 },
    { id: 'v2', name: 'Premium', weight: 50 },
  ],
}
```

**Middleware implementation:**
```typescript
// middleware.ts
if (pathname === '/' && homepageTest.enabled) {
  const existingVariant = request.cookies.get(homepageTest.cookieName)
  if (!existingVariant) {
    const variant = getRandomVariant(homepageTest)
    response.cookies.set(homepageTest.cookieName, variant, {
      maxAge: homepageTest.cookieMaxAge,
      path: '/',
    })
  }
}
```

## Metrics to Monitor

### Primary Metrics (Conversion-focused)
1. **Newsletter signups** - Primary conversion goal
2. **Product waitlist joins** - Revenue potential
3. **Time on site** - Engagement indicator
4. **Pages per session** - Content discovery

### Secondary Metrics (Engagement)
1. **Scroll depth** - Content consumption
2. **CTA click rate** - Element effectiveness
3. **Bounce rate** - First impression quality
4. **Return visitors** - Brand stickiness

### Technical Metrics (Performance)
1. **Largest Contentful Paint (LCP)** - Loading performance
2. **First Input Delay (FID)** - Interactivity
3. **Cumulative Layout Shift (CLS)** - Visual stability
4. **Time to First Byte (TTFB)** - Server response

## Monitoring Dashboard

Access the comparison dashboard at:
**`https://frankx.ai/admin/variants`**

This dashboard allows:
- Side-by-side variant comparison
- Quick navigation to each variant
- Selection tracking for decision-making

## Decision Framework

### When to Choose a Winner

1. **Sample size**: Minimum 100 views per variant
2. **Duration**: At least 2 weeks of data
3. **Statistical confidence**: 95% confidence level
4. **Business alignment**: Matches brand goals

### Evaluation Criteria

| Weight | Metric | Why It Matters |
|--------|--------|----------------|
| 30% | Newsletter conversion | Primary business goal |
| 25% | Time on page | Engagement quality |
| 20% | Bounce rate | First impression |
| 15% | Performance (LCP) | User experience |
| 10% | Subjective preference | Brand alignment |

## Post-Decision Actions

Once winners are selected:

1. **Implement cookie-based A/B test** with winner vs current
2. **Delete preview routes** to clean up codebase
3. **Update middleware** to serve winning variant
4. **Monitor for 2 more weeks** to confirm improvement
5. **Roll out winner** to 100% of traffic

## Quick Start Checklist

- [ ] Compare all variants visually at `/admin/variants`
- [ ] Review Vercel Analytics for initial traffic patterns
- [ ] Select 2-3 finalists per page type
- [ ] Run focused A/B test on finalists
- [ ] Make final decision based on data
- [ ] Implement winning designs
- [ ] Clean up preview routes

---

## Contact

For questions about this strategy or implementation help:
- Dashboard: `/admin/variants`
- Analytics: Vercel Analytics dashboard
