# SPEC-002: Homepage Elite Redesign - Requirements

**Created:** 2026-01-24
**Author:** Claude + Frank
**Status:** Draft
**Priority:** P0 (Critical)
**Sprint:** 1.1

---

## Problem Statement

The current homepage fails to communicate FrankX's elite positioning as a top creator and AI architect. Visitors are confused about what Frank offers, the value proposition is buried, and there's no clear path to engagement. The page still contains remnants of old "Conscious AI" messaging that conflicts with the new brand direction.

**Impact:** High bounce rate, low conversion to email signup, unclear product discovery.

---

## User Stories

### Story 1: First-Time Visitor Clarity

**As a** first-time visitor
**I want** to immediately understand what FrankX offers
**So that** I can decide if this is relevant to my creator journey

**Acceptance Criteria:**
- [ ] Within 3 seconds, visitor understands: "Frank helps creators build with AI"
- [ ] Above the fold shows: expertise proof, clear value prop, single CTA
- [ ] No jargon or spiritual language that confuses the message
- [ ] Mobile view has same clarity as desktop

### Story 2: Creator Seeking Proof

**As a** creator evaluating Frank's expertise
**I want** to see concrete proof of results
**So that** I trust this is worth my time

**Acceptance Criteria:**
- [ ] Trust indicators visible: 500+ songs created, Oracle expertise, creator results
- [ ] Real numbers, not vague claims ("helped thousands")
- [ ] Portfolio/showcase accessible within 1 click
- [ ] Testimonials from real creators (with photos/names)

### Story 3: Potential Customer Journey

**As a** potential customer
**I want** a clear next step to engage
**So that** I don't feel overwhelmed by options

**Acceptance Criteria:**
- [ ] Single primary CTA above the fold (newsletter or free resource)
- [ ] Product discovery happens through exploration, not bombardment
- [ ] Clear value proposition for free tier (what do I get?)
- [ ] Easy path from free → paid when ready

### Story 4: Returning Visitor Navigation

**As a** returning visitor
**I want** quick access to content and products
**So that** I can continue my journey

**Acceptance Criteria:**
- [ ] Navigation clearly shows: Products, Learn, Create, About
- [ ] Recent blog posts or updates visible
- [ ] Search accessible
- [ ] Remember my context (if logged in)

---

## Success Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Bounce Rate | ~60% | <40% | Plausible/GA4 |
| Time on Page | ~30s | >90s | Plausible/GA4 |
| Email Signup Rate | ~1% | >5% | Form submissions |
| Product Page Clicks | ~5% | >15% | Click tracking |
| Mobile Engagement | Unknown | Parity with desktop | Analytics |
| Page Load Time | ~3s | <2s | Lighthouse |
| Lighthouse Score | ~70 | >90 | Lighthouse CI |

---

## Constraints

### Technical
- Must work with existing Next.js 16 + React 18 stack
- No new dependencies unless absolutely necessary
- Must maintain existing URL structure (no breaking changes)
- Must pass TypeScript strict mode

### Business
- Must align with "Elite Creator & AI Architect" brand
- No spiritual/consciousness language
- Focus on results and craftsmanship
- Humble but confident tone

### Timeline
- Design approval: 2 days
- Development: 5 days
- Testing/QA: 2 days
- Total: ~2 weeks

---

## Dependencies

| Dependency | Type | Status | Notes |
|------------|------|--------|-------|
| SPEC-001 Brand Cleanup | Spec | ✅ Created | Brand voice guidelines |
| Design System Colors | Design | 🔲 Pending | Need finalized palette |
| Hero Video/Image | Asset | 🔲 Pending | Professional assets needed |
| Testimonials | Content | 🔲 Pending | Collect 3-5 testimonials |
| Trust Metrics | Content | ✅ Available | 500+ songs, Oracle certified |

---

## Out of Scope

- Full navigation redesign (separate spec: SPEC-003)
- Product page changes (separate spec: SPEC-030+)
- Blog system changes (separate spec: SPEC-010)
- Authentication/dashboard (separate spec: SPEC-013)
- New animations/3D effects (future enhancement)

---

## Wireframe Requirements

### Above the Fold (Hero)
```
┌─────────────────────────────────────────────────────────────┐
│ [Nav: Logo | Products | Learn | Create | About | CTA]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [HEADLINE]                                                 │
│  Build AI-Powered Creator Systems                           │
│  That Actually Ship                                         │
│                                                             │
│  [SUBHEADLINE]                                              │
│  I help creators go from overwhelmed to empowered           │
│  with practical AI tools, music production, and systems.    │
│                                                             │
│  [PRIMARY CTA: Get Free Creator Toolkit]                    │
│  [Secondary: See My Work →]                                 │
│                                                             │
│  [TRUST INDICATORS]                                         │
│  ✓ 12,000+ AI Songs Created  ✓ AI Architect & Creator             │
│  ✓ 1000+ Creators Helped  ✓ Enterprise Experience           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Section 2: What I Build
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [SECTION TITLE]                                            │
│  What I Build                                               │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ 🎵      │  │ 🤖      │  │ 📦      │                     │
│  │ Music   │  │ AI      │  │ Digital │                     │
│  │ Systems │  │ Systems │  │ Products│                     │
│  │         │  │         │  │         │                     │
│  │ Suno AI │  │ Oracle  │  │ Courses │                     │
│  │ prompts │  │ agentic │  │ tools   │                     │
│  │ & tools │  │ systems │  │ kits    │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Section 3: Featured Products
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [SECTION TITLE]                                            │
│  Start Creating                                             │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Vibe OS         │  │ Creative AI     │                  │
│  │ $37             │  │ Toolkit $47     │                  │
│  │ [Learn More]    │  │ [Learn More]    │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  [See All Products →]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Section 4: Social Proof
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [TESTIMONIALS - Carousel or Grid]                          │
│                                                             │
│  "Quote from creator about results..."                      │
│  — Name, Role @ Company                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Section 5: Latest Content
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [SECTION TITLE]                                            │
│  Latest from the Lab                                        │
│                                                             │
│  [Blog Card] [Blog Card] [Blog Card]                        │
│                                                             │
│  [Read More on the Blog →]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Section 6: CTA Footer
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Ready to Build?                                            │
│                                                             │
│  Join 1000+ creators getting weekly AI insights.            │
│                                                             │
│  [Email Input] [Subscribe]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Content Requirements

### Headlines (Options to Test)
1. "Build AI-Powered Creator Systems That Actually Ship"
2. "From Overwhelmed to Empowered: AI for Creators"
3. "Elite Creator Tools. Enterprise AI Expertise."
4. "Create More. Ship Faster. With AI That Works."

### Trust Indicators (Must Include)
- 12,000+ AI songs created
- AI Architect & Creator
- 1000+ creators helped
- Enterprise-grade systems
- 10+ years tech experience

### Testimonials Needed
- 3-5 real testimonials
- Include name, photo, role
- Focus on results achieved
- Mix of creator types

---

## Accessibility Requirements

- [ ] All images have alt text
- [ ] Color contrast meets WCAG 2.2 AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Reduced motion supported
- [ ] Focus indicators visible

---

## Performance Requirements

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Total bundle size < 200kb initial
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts preloaded
