# SPEC-002: Homepage Elite Redesign - Tasks

**Total Estimated Effort:** 24 hours
**Sprint Assignment:** Sprint 1.1
**Target Completion:** 2026-02-07

---

## Task Overview

| ID | Task | Est. | Depends | Status |
|----|------|------|---------|--------|
| T1 | Create section wrapper components | 2h | - | 🔲 |
| T2 | Create homepage content config | 1h | - | 🔲 |
| T3 | Build HeroSection component | 3h | T1, T2 | 🔲 |
| T4 | Build WhatIBuildSection | 2h | T1 | 🔲 |
| T5 | Build TestimonialsSection | 2h | T1 | 🔲 |
| T6 | Enhance FeaturedProductsSection | 2h | T1 | 🔲 |
| T7 | Build LatestContentSection | 2h | T1 | 🔲 |
| T8 | Build CTASection | 1h | T1 | 🔲 |
| T9 | Compose new homepage | 2h | T3-T8 | 🔲 |
| T10 | Mobile optimization | 2h | T9 | 🔲 |
| T11 | Performance optimization | 2h | T9 | 🔲 |
| T12 | Accessibility audit | 1h | T10 | 🔲 |
| T13 | A/B test setup | 1h | T9 | 🔲 |
| T14 | Deploy and verify | 1h | T10-T13 | 🔲 |

**Legend:** 🔲 Pending | 🔄 In Progress | ✅ Complete | ❌ Blocked

---

## Task Details

### T1: Create Section Wrapper Components

**Description:** Create reusable section primitives that all homepage sections will use.

**Files:**
- `components/sections/SectionWrapper.tsx`
- `components/sections/SectionHeader.tsx`
- `components/sections/SectionGrid.tsx`
- `components/sections/index.ts`

**Acceptance Criteria:**
- [ ] SectionWrapper handles padding, max-width, background variants
- [ ] SectionHeader handles title, subtitle, alignment
- [ ] SectionGrid handles 2, 3, 4 column responsive layouts
- [ ] All components are typed with TypeScript
- [ ] Exported from index.ts

**Implementation Notes:**
```typescript
// SectionWrapper.tsx
interface SectionWrapperProps {
  children: React.ReactNode;
  background?: 'default' | 'muted' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

---

### T2: Create Homepage Content Config

**Description:** Create centralized content configuration for all homepage sections.

**Files:**
- `data/homepage.ts`

**Acceptance Criteria:**
- [ ] All text content in single file
- [ ] TypeScript interfaces for all content types
- [ ] No hardcoded strings in components
- [ ] Easy to update/A/B test

---

### T3: Build HeroSection Component

**Description:** Create the above-the-fold hero section with headline, CTAs, and trust indicators.

**Files:**
- `components/home/HeroSection.tsx`

**Acceptance Criteria:**
- [ ] Headline and subheadline from config
- [ ] Primary and secondary CTA buttons
- [ ] Trust indicators row (4 items)
- [ ] Background gradient or subtle pattern
- [ ] Responsive: stacked on mobile, side-by-side on desktop
- [ ] Meets performance budget (<5kb)

---

### T4: Build WhatIBuildSection

**Description:** Create 3-column feature grid showing Music, AI, Products.

**Files:**
- `components/home/WhatIBuildSection.tsx`

**Acceptance Criteria:**
- [ ] 3 feature cards with icons
- [ ] Each card links to respective hub
- [ ] Hover state with subtle animation
- [ ] Responsive: 1 column mobile, 3 columns desktop

---

### T5: Build TestimonialsSection

**Description:** Create social proof section with testimonial cards.

**Files:**
- `components/home/TestimonialsSection.tsx`

**Acceptance Criteria:**
- [ ] Supports 3-5 testimonials
- [ ] Quote, author name, role, optional photo
- [ ] Optional carousel for mobile
- [ ] Graceful handling if no testimonials (hide section)

---

### T6: Enhance FeaturedProductsSection

**Description:** Modify existing product display to show 2-3 featured products.

**Files:**
- `components/home/FeaturedProductsSection.tsx`

**Acceptance Criteria:**
- [ ] Show top 2-3 products
- [ ] Price and "Learn More" CTA
- [ ] Link to full products page
- [ ] Consistent card design

---

### T7: Build LatestContentSection

**Description:** Create section showing 3 latest blog posts.

**Files:**
- `components/home/LatestContentSection.tsx`

**Acceptance Criteria:**
- [ ] Fetch 3 most recent posts at build time
- [ ] Blog card with title, excerpt, date
- [ ] "Read More" link to blog
- [ ] Responsive grid

---

### T8: Build CTASection

**Description:** Create footer CTA section for newsletter signup.

**Files:**
- `components/home/CTASection.tsx`

**Acceptance Criteria:**
- [ ] Compelling headline
- [ ] Email input field
- [ ] Submit button
- [ ] Success/error states
- [ ] Integrates with existing newsletter logic

---

### T9: Compose New Homepage

**Description:** Assemble all sections into the new homepage.

**Files:**
- `app/page.tsx`

**Acceptance Criteria:**
- [ ] All 6 sections composed in order
- [ ] Proper spacing between sections
- [ ] Metadata (title, description, OG image) updated
- [ ] No TypeScript errors
- [ ] Builds successfully

---

### T10: Mobile Optimization

**Description:** Ensure homepage works flawlessly on mobile devices.

**Files:**
- All section components

**Acceptance Criteria:**
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPhone 14 Pro (large screen)
- [ ] Test on iPad (tablet)
- [ ] Touch targets minimum 44px
- [ ] No horizontal scroll
- [ ] Text readable without zoom

---

### T11: Performance Optimization

**Description:** Ensure homepage meets performance targets.

**Files:**
- Various

**Acceptance Criteria:**
- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total JS < 100kb
- [ ] Images optimized (WebP, lazy load)
- [ ] No render-blocking resources

---

### T12: Accessibility Audit

**Description:** Verify homepage meets accessibility standards.

**Files:**
- Various

**Acceptance Criteria:**
- [ ] All images have alt text
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested (VoiceOver)
- [ ] No axe-core violations

---

### T13: A/B Test Setup

**Description:** Configure A/B testing for headlines and CTAs.

**Files:**
- `data/homepage.ts`
- Analytics config

**Acceptance Criteria:**
- [ ] 2-3 headline variants defined
- [ ] 2-3 CTA variants defined
- [ ] Analytics events for variant tracking
- [ ] Easy to switch variants

---

### T14: Deploy and Verify

**Description:** Deploy to production and verify everything works.

**Files:**
- N/A (deployment process)

**Acceptance Criteria:**
- [ ] Build passes in CI
- [ ] Deployed to staging first
- [ ] Manual QA on staging
- [ ] Deployed to production
- [ ] Verify live site
- [ ] Monitor for errors (24h)

---

## Quality Gates

Before marking spec complete:

- [ ] All 14 tasks completed
- [ ] TypeScript compiles with no errors
- [ ] ESLint passes
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passes
- [ ] Mobile testing complete
- [ ] Brand voice audit passes (no spiritual language)
- [ ] Stakeholder sign-off (Frank)

---

## Rollback Plan

If issues arise after deployment:

1. Revert to previous homepage commit
2. Redeploy immediately
3. Document what went wrong
4. Fix issues in development branch
5. Re-test thoroughly before next deploy

**Git revert command:**
```bash
git revert HEAD --no-edit
git push origin main
```

---

## Dependencies Graph

```
T1 (Section Wrappers) ──────┬──► T3 (Hero)
                            │
T2 (Content Config) ────────┤──► T4 (What I Build)
                            │
                            ├──► T5 (Testimonials)
                            │
                            ├──► T6 (Products)
                            │
                            ├──► T7 (Latest Content)
                            │
                            └──► T8 (CTA)
                                    │
                                    ▼
                            T9 (Compose Homepage)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            T10 (Mobile)     T11 (Perf)      T13 (A/B)
                    │               │
                    └───────┬───────┘
                            ▼
                    T12 (Accessibility)
                            │
                            ▼
                    T14 (Deploy)
```
