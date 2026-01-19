# Design System Migration Checklist

## Overview

This checklist guides the migration of existing FrankX.AI components to the unified design system. Work through this systematically to ensure consistency across the entire site.

---

## Pre-Migration Setup

- [x] Design system tokens created (`/lib/design-system.ts`)
- [x] Tailwind config updated with new color classes
- [x] Documentation written (Design System Guide, Color Reference)
- [ ] Team review of design system principles
- [ ] Backup current production site

---

## Phase 1: Global Foundation (Priority: Critical)

### Background Colors
- [ ] Search codebase for: `bg-black`, `bg-slate-900`, `bg-gray-900`
- [ ] Replace with: `bg-void`, `bg-space`, `bg-elevated`
- [ ] Update `app/globals.css` if using CSS custom properties
- [ ] Test all pages for consistent background depth

**Files to Update:**
```bash
# Find all background color usage
grep -r "bg-black\|bg-slate-900\|bg-gray-900" components/ app/
```

### Text Colors
- [ ] Search for: `text-white`, `text-slate-100`, `text-gray-100`
- [ ] Replace with appropriate hierarchy:
  - Headlines → `text-[#fafafa]`
  - Body → `text-[rgba(250,250,250,0.85)]`
  - Supporting → `text-[rgba(250,250,250,0.65)]`
- [ ] Verify contrast ratios on all pages

**Files to Update:**
```bash
# Find all text color usage
grep -r "text-white\|text-slate-\|text-gray-" components/ app/
```

---

## Phase 2: Navigation & Header (Priority: High)

### Navigation Component
File: `components/Navigation.tsx` or `components/home/Navigation2025.tsx`

- [ ] Background: `bg-void/90` or `bg-space/90` with backdrop blur
- [ ] Links: `text-[rgba(250,250,250,0.85)]` hover to `text-[#fafafa]`
- [ ] Active state: `text-tech-primary` (assuming tech-first site nav)
- [ ] Mobile menu: Match desktop styling
- [ ] Ensure scroll detection maintains colors

**Color Decision:**
- Use **tech-primary** accent if navigation is universal
- Use **soul-primary** only if dedicated Soulbook navigation

---

## Phase 3: Homepage Components (Priority: High)

### Hero Section
File: `components/home/HomePageElite.tsx` or similar

- [ ] Background: `bg-void` with aurora gradients
- [ ] Aurora effect: Use `bg-tech-aurora` for tech-focused, `bg-soul-aurora` for personal
- [ ] Headline: `text-heading-1` or `text-display-xl` with `text-[#fafafa]`
- [ ] Subheadline: `text-body-lg` with `text-[rgba(250,250,250,0.85)]`
- [ ] Primary CTA: `bg-tech-primary` or `bg-soul-primary` based on content
- [ ] Secondary CTA: Ghost button pattern

**Current Colors to Replace:**
```tsx
// BEFORE (inconsistent)
colors.accent.primary: '#10b981'
colors.accent.secondary: '#06b6d4'

// AFTER (unified)
className="bg-tech-primary"
className="bg-tech-secondary"
```

### Feature Cards
- [ ] Card background: `bg-space/80 backdrop-blur-xl`
- [ ] Border: `border-tech-primary/20` (tech) or `border-soul-primary/20` (soul)
- [ ] Shadow: `shadow-glow-tech` or `shadow-glow-soul`
- [ ] Hover: `hover:-translate-y-1 transition-all duration-250`
- [ ] Ambient glow overlay: `bg-tech-glow` or `bg-soul-glow`

### Social Proof / Testimonials
- [ ] Background: `bg-space` or glassmorphic card pattern
- [ ] Text: `text-[rgba(250,250,250,0.85)]`
- [ ] Accent elements: Use appropriate spectrum (tech/soul)

---

## Phase 4: Product Pages (Priority: High)

### CACOS (Agentic Creator OS)
Theme: **Tech spectrum** (emerald/cyan)

- [ ] All CTAs: `bg-tech-primary`
- [ ] Feature highlights: `text-tech-primary` or `border-tech-primary`
- [ ] Code examples: Tech-themed highlighting
- [ ] Aurora background: `bg-tech-aurora`

### Vibe OS
Theme: **Hybrid** (tech for functionality, soul for transformation)

- [ ] Primary features: `bg-tech-primary` (AI music generation = tech)
- [ ] Transformation outcomes: `bg-soul-primary` (consciousness shift = soul)
- [ ] Session cards: Soul-themed glassmorphism
- [ ] Technical specs: Tech-themed

### Creative AI Toolkit
Theme: **Tech spectrum** (tool-focused)

- [ ] All CTAs: `bg-tech-primary`
- [ ] Tool cards: Tech glassmorphism
- [ ] Benefits: Tech accents

### Soulbook
Theme: **Soul spectrum** (amber/gold)

- [ ] All CTAs: `bg-soul-primary`
- [ ] Pillar cards: Soul glassmorphism with `shadow-glow-soul`
- [ ] Personal stories: Serif font for emphasis
- [ ] Aurora background: `bg-soul-aurora`
- [ ] Navigation breadcrumbs: Soul accents

**Files to Update:**
```
app/products/agentic-creator-os/
app/products/vibe-os/
app/products/creative-ai-toolkit/
app/products/generative-creator-os/
app/realm/ (Soulbook)
```

---

## Phase 5: Blog Components (Priority: Medium)

### Blog Index Page
- [ ] Card backgrounds: `bg-space` glassmorphism
- [ ] Card borders: `border-[rgba(255,255,255,0.1)]`
- [ ] Hover state: Lift + glow based on article theme
- [ ] Category tags: Color-coded by content type
  - Tech articles: `bg-tech-primary/10 text-tech-primary`
  - Personal articles: `bg-soul-primary/10 text-soul-primary`

### Blog Article Pages
- [ ] Background: `bg-void`
- [ ] Content container: `bg-space` with comfortable padding
- [ ] Body text: `text-[rgba(250,250,250,0.85)]`
- [ ] Headings: `text-[#fafafa]`
- [ ] Links: Color-match article theme (tech/soul)
- [ ] Code blocks: Tech-themed syntax highlighting
- [ ] Blockquotes: Soul-themed styling (amber border)

**Content-Based Theming:**
```tsx
// Determine theme from article frontmatter
const theme = article.category === 'ai' || article.category === 'tech'
  ? 'tech'
  : 'soul'

// Apply theme to CTAs
<button className={`bg-${theme}-primary hover:bg-${theme}-light`}>
```

---

## Phase 6: Soulbook Pages (Priority: High)

### SoulbookHero
File: `components/soulbook/SoulbookHero.tsx`

- [ ] Background gradient: `bg-soul-aurora` or amber-based radial gradients
- [ ] Floating manuscript effects: Amber/gold borders
- [ ] Text: Use serif italic for emphasis
- [ ] CTA: `bg-soul-primary hover:bg-soul-light`

### 7 Pillars Visualization
- [ ] Each pillar: Soul-themed cards
- [ ] Interactive states: `hover:shadow-glow-soul`
- [ ] Connections: Gold/amber lines
- [ ] Active pillar: `border-soul-primary shadow-glow-soul`

### Personal Story Components
- [ ] Serif font for narrative sections
- [ ] Amber accent on pull quotes
- [ ] Soul-themed dividers between sections
- [ ] Ambient warm glow on images

---

## Phase 7: Form Components (Priority: Medium)

### Input Fields
- [ ] Background: `bg-elevated`
- [ ] Border: `border-[rgba(255,255,255,0.1)]`
- [ ] Focus: `focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20`
- [ ] Text: `text-[#fafafa]`
- [ ] Placeholder: `placeholder:text-[rgba(250,250,250,0.45)]`

### Select Dropdowns
- [ ] Match input field styling
- [ ] Options: `bg-space` with `hover:bg-elevated`

### Checkboxes/Radio Buttons
- [ ] Accent color: `accent-tech-primary` or `accent-soul-primary` based on context
- [ ] Custom styling if needed: Match theme

### Submit Buttons
- [ ] Style as primary CTA in appropriate theme
- [ ] Loading state: Maintain color, add spinner

**Files to Update:**
```
components/ui/Input.tsx
components/ui/Select.tsx
components/ui/Checkbox.tsx
components/forms/
```

---

## Phase 8: Utility Components (Priority: Medium)

### Buttons
File: `components/ui/Button.tsx` or `components/ui/PremiumButton.tsx`

Create variants:
- [ ] Tech Primary: `bg-tech-primary hover:bg-tech-light`
- [ ] Soul Primary: `bg-soul-primary hover:bg-soul-light`
- [ ] Ghost: `bg-transparent hover:bg-elevated`
- [ ] Outline Tech: `border-tech-primary text-tech-primary`
- [ ] Outline Soul: `border-soul-primary text-soul-primary`

### Cards
File: `components/ui/Card.tsx` or `components/ui/GlassmorphicCard.tsx`

Update variants:
- [ ] Glass: Universal glassmorphism
- [ ] Glass Tech: Tech border + glow
- [ ] Glass Soul: Soul border + glow
- [ ] Solid: `bg-elevated` with strong border

### Modals/Dialogs
- [ ] Backdrop: `bg-void/80 backdrop-blur-md`
- [ ] Content: `bg-space` with appropriate border
- [ ] Close button: Ghost style
- [ ] Actions: Themed based on modal purpose

### Tooltips
- [ ] Background: `bg-space` with `backdrop-blur-xl`
- [ ] Border: `border-[rgba(255,255,255,0.1)]`
- [ ] Text: `text-body-sm text-[rgba(250,250,250,0.85)]`

---

## Phase 9: Footer (Priority: Low)

### Footer Component
- [ ] Background: `bg-void` or `bg-space`
- [ ] Links: `text-[rgba(250,250,250,0.65)]` hover to `text-[#fafafa]`
- [ ] Social icons: Neutral or tech-primary on hover
- [ ] Dividers: `border-[rgba(255,255,255,0.05)]`

---

## Phase 10: Testing & QA (Priority: Critical)

### Visual Regression Testing
- [ ] Screenshot all pages before/after
- [ ] Compare color consistency across pages
- [ ] Verify no broken styles

### Accessibility Testing
- [ ] Run axe DevTools on all pages
- [ ] Verify all text meets WCAG AAA contrast
- [ ] Test keyboard navigation
- [ ] Test screen reader announcements
- [ ] Verify focus indicators visible

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile responsive (all breakpoints)

### Performance Testing
- [ ] Lighthouse audit (should maintain/improve scores)
- [ ] Check for CSS bloat from Tailwind
- [ ] Verify glassmorphism performance on mobile

---

## Phase 11: Documentation Updates (Priority: Medium)

- [ ] Update component Storybook (if using)
- [ ] Document new color usage in component READMEs
- [ ] Create visual style guide for team
- [ ] Update design handoff process with new tokens

---

## Search & Replace Patterns

### Find Emerald/Cyan Usage (Tech Content)
```bash
# Find scattered emerald/cyan classes
grep -r "bg-emerald-\|text-emerald-\|border-emerald-" components/ app/
grep -r "bg-cyan-\|text-cyan-\|border-cyan-" components/ app/

# Replace with unified tech palette
# bg-emerald-500 → bg-tech-primary
# bg-cyan-500 → bg-tech-secondary
# etc.
```

### Find Amber/Gold Usage (Soul Content)
```bash
# Find scattered amber/gold classes
grep -r "bg-amber-\|text-amber-\|border-amber-" components/ app/
grep -r "bg-gold-\|text-gold-\|border-gold-" components/ app/

# Replace with unified soul palette
# bg-amber-500 → bg-soul-primary
# bg-gold-500 → bg-soul-primary
# etc.
```

### Find Inline Style Objects
```bash
# Find hex color codes in style objects
grep -r "#10b981\|#06b6d4\|#f59e0b\|#fbbf24" components/ app/

# Replace with design system imports
# import { colors } from '@/lib/design-system'
# style={{ backgroundColor: colors.accent.tech.primary }}
```

---

## Component Priority Matrix

| Component | Priority | Theme | Estimated Time |
|-----------|----------|-------|----------------|
| Navigation | High | Tech | 2 hours |
| HomePageElite | High | Tech | 3 hours |
| SoulbookHero | High | Soul | 2 hours |
| CACOS Product Page | High | Tech | 2 hours |
| Vibe OS Product Page | High | Hybrid | 3 hours |
| Soulbook 7 Pillars | High | Soul | 2 hours |
| Blog Index | Medium | Universal | 1 hour |
| Blog Article Template | Medium | Dynamic | 2 hours |
| Form Components | Medium | Tech | 2 hours |
| Footer | Low | Universal | 1 hour |
| **Total** | | | **20 hours** |

---

## Rollout Strategy

### Option 1: Feature Flag (Recommended)
```tsx
// Enable new design system gradually
const useNewDesignSystem = process.env.NEXT_PUBLIC_NEW_DESIGN === 'true'

// In components:
<button className={useNewDesignSystem ? 'bg-tech-primary' : 'bg-emerald-500'}>
```

### Option 2: Page-by-Page
1. Start with new pages (no legacy baggage)
2. Migrate high-traffic pages (Homepage, Soulbook)
3. Migrate product pages
4. Migrate blog
5. Final pass on utility components

### Option 3: Big Bang (Not Recommended)
- Update everything at once
- High risk of breaking changes
- Difficult to debug issues

**Recommended**: Option 1 (Feature Flag) → Test in staging → Enable in production

---

## Post-Migration Tasks

- [ ] Remove legacy color classes from Tailwind config
- [ ] Clean up unused CSS
- [ ] Run Lighthouse audit and compare to baseline
- [ ] Monitor user feedback for color accessibility issues
- [ ] Document lessons learned for future updates

---

## Rollback Plan

If critical issues arise:
1. Flip feature flag to `false`
2. Revert to previous Tailwind config
3. Git revert to last stable commit
4. Fix issues in development
5. Re-deploy when stable

---

## Success Metrics

- [ ] All pages use unified color palette (0 instances of `bg-emerald-500` scattered usage)
- [ ] WCAG AAA compliance across site (7:1+ contrast)
- [ ] Lighthouse accessibility score: 95+
- [ ] Zero visual regressions in critical user flows
- [ ] Positive user feedback on cohesive design

---

**Version**: 1.0
**Last Updated**: January 2026
**Owner**: FrankX Design Team
**Estimated Total Migration Time**: 20-30 hours
