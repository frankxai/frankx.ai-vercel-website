# Design Evolution Tracker

> Living document for A/B tests, design decisions, and homepage evolution.
> Part of the Agentic Creator OS methodology.

---

## Current Status

| Page | Version | Status | Last Updated |
|------|---------|--------|--------------|
| Homepage | v2.0 (Elite) | Production | 2026-01-21 |
| Homepage Split A | v3.0-alpha | Staging | 2026-01-21 |
| Homepage Split B | v3.0-beta | Staging | 2026-01-21 |
| Homepage Split C | v3.0-gamma | Staging | 2026-01-21 |

---

## Active Split Tests

### Test #001: Homepage Typography & Positioning
**Started:** 2026-01-21
**Status:** In Review

| Variant | Description | Font Stack | Positioning |
|---------|-------------|------------|-------------|
| **Control** | Current production | Inter + Playfair | Humble workshop |
| **Split A** | Geist + Authority | Geist Sans + Playfair accent | Golden Age authority |
| **Split B** | Audience Matrix | Inter + Playfair | Audience-first navigation |
| **Split C** | Full Redesign | Geist Sans + refined | Products + Community focus |

**Preview URLs:**
- Control: `/` (production)
- Split A: `/staging/homepage-a`
- Split B: `/staging/homepage-b`
- Split C: `/staging/homepage-c`
- Hub: `/staging` (comparison view)

---

## Decision Log

### 2026-01-21: Typography Analysis

**Question:** Which italic font for accent text?

| Option | Score | Verdict |
|--------|-------|---------|
| Times New Roman | 4/10 | Too conservative |
| Inter Italic | 6/10 | Good for UI, flat for quotes |
| Playfair Display | 8.5/10 | Keep for philosophy quotes |
| Geist (new) | 9/10 | Consider for primary |

**Decision:** TBD - Split testing in progress

---

### 2026-01-21: Positioning Analysis

**Question:** Humble vs Authority tone?

| Current | Proposed |
|---------|----------|
| "my workshop, my notebook" | "intelligence systems for creators" |
| "anyone curious" | "creators, students, builders" |
| No Golden Age framing | "Golden Age of Intelligence" |

**Decision:** Test "Humble Authority" hybrid

---

## Content Inventory

### Homepage Sections (Current)

| Section | Component | Purpose | Keep/Evolve |
|---------|-----------|---------|-------------|
| Hero | `Hero()` | First impression | Evolve |
| TrustedBy | `TrustedByBlock` | Social proof | Keep |
| Stats | `StatsSection()` | Philosophy quote | Evolve |
| The Work | `WhatIDo()` | 4 pillars | Expand to 5 |
| Quick Start | `QuickStartSection()` | Entry points | Keep |
| Resources | `FeaturedResources()` | Curated learning | Keep |
| About | `AboutSection()` | Personal story | Add warmth |
| Final CTA | `FinalCTA()` | Conversion | Add waitlists |

### Missing Sections (Proposed)

| Section | Priority | Purpose |
|---------|----------|---------|
| **Audience Matrix** | P0 | "Who I Build For" - 4 audience types |
| **Products Showcase** | P0 | 5 OS products with pricing |
| **Golden Age Philosophy** | P1 | Vision/abundance framing |
| **Community/Tribe** | P1 | Inner Circle, testimonials |
| **Waitlists** | P2 | Email capture for cohorts |

---

## Design Tokens

### Current Palette
```css
--bg-primary: #0a0a0b
--bg-elevated: #111113
--accent-emerald: #10b981
--accent-cyan: #06b6d4
--accent-gold: #f59e0b
--text-primary: #fafafa
--text-secondary: rgba(250, 250, 250, 0.7)
```

### Font Stack (Current)
```css
--font-sans: Inter
--font-serif: Playfair Display
--font-mono: JetBrains Mono
```

### Font Stack (Proposed Split A/C)
```css
--font-sans: Geist Sans
--font-serif: Playfair Display (accent only)
--font-mono: Geist Mono
```

---

## Metrics to Track

| Metric | Current | Target | Method |
|--------|---------|--------|--------|
| Time on page | TBD | +20% | Plausible |
| Scroll depth | TBD | 70%+ | Plausible |
| CTA clicks | TBD | +15% | Event tracking |
| Product page visits | TBD | +25% | Funnel |
| Email signups | TBD | +30% | ConvertKit |

---

## Review Checklist

Before promoting any variant to production:

- [ ] Mobile responsive (320px - 1440px)
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance (LCP < 2.5s)
- [ ] SEO meta tags updated
- [ ] Analytics events firing
- [ ] Cross-browser tested
- [ ] Frank personal approval

---

## Skills & Workflows Used

### Active Skills
- `/frankx-brand` - Brand voice and guidelines
- `/ui-ux-design-expert` - Design decisions
- `/frontend-design` - Component building

### Recommended Additions
- `/split-test-analyzer` - Compare variants
- `/conversion-optimizer` - CTA optimization
- `/design-system-builder` - Token management

---

## Next Actions

1. [ ] Review Split A, B, C at `/staging`
2. [ ] Select winning variant
3. [ ] Implement on production
4. [ ] Set up Plausible goals
5. [ ] Monitor for 7 days
6. [ ] Document learnings

---

*Last updated: 2026-01-21 by Claude Code*
*Part of Agentic Creator OS*
