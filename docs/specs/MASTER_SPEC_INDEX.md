# FrankX Master Spec Index
## Hierarchical Spec Management System

**Created:** 2026-01-24
**Updated:** 2026-01-30
**Total Specs Needed:** 47
**Specs Created:** 1
**Specs In Progress:** 1 (SPEC-002 blocked on testimonials)

---

## Spec Hierarchy

```
MASTER_SPEC_INDEX.md (this file)
│
├── TIER-0: FOUNDATION (Start Now)
│   ├── SPEC-001: Brand Consistency Cleanup ✅ Created
│   ├── SPEC-002: Homepage Elite Redesign
│   ├── SPEC-003: Navigation & Information Architecture
│   ├── SPEC-004: Design System Documentation
│   └── SPEC-005: Product Funnel Architecture
│
├── TIER-1: CORE SYSTEMS (Next Sprint)
│   ├── SPEC-010: Blog Content System
│   ├── SPEC-011: Newsletter & Email Pipeline
│   ├── SPEC-012: Search & Discovery
│   ├── SPEC-013: Authentication & Dashboard
│   └── SPEC-014: SEO & AI Citation Optimization
│
├── TIER-2: HUBS (Month 2)
│   ├── SPEC-020: AI Architecture Hub
│   ├── SPEC-021: Music Lab Hub
│   ├── SPEC-022: Research Hub
│   ├── SPEC-023: Resources Hub
│   └── SPEC-024: Intelligence Atlas
│
├── TIER-3: PRODUCTS (Ongoing)
│   ├── SPEC-030: Vibe OS
│   ├── SPEC-031: Creative AI Toolkit
│   ├── SPEC-032: Suno Prompt Library
│   ├── SPEC-033: Creation Chronicles
│   ├── SPEC-034: Agentic Creator OS
│   └── SPEC-035: Creator Studio OS
│
├── TIER-4: INFRASTRUCTURE (Parallel)
│   ├── SPEC-040: Component Library
│   ├── SPEC-041: API Documentation
│   ├── SPEC-042: Performance Optimization
│   ├── SPEC-043: Accessibility (WCAG 2.2)
│   └── SPEC-044: Analytics Architecture
│
└── TIER-5: FUTURE (Backlog)
    ├── SPEC-050: Assessment System
    ├── SPEC-051: Affiliate System
    ├── SPEC-052: Course Platform
    └── SPEC-053: Community Features
```

---

## Spec Numbering Convention

| Range | Category | Example |
|-------|----------|---------|
| 001-009 | Foundation/Brand | `SPEC-001-brand-cleanup` |
| 010-019 | Core Systems | `SPEC-012-search-discovery` |
| 020-029 | Hub Pages | `SPEC-021-music-lab-hub` |
| 030-039 | Products | `SPEC-031-creative-ai-toolkit` |
| 040-049 | Infrastructure | `SPEC-042-performance` |
| 050-059 | Future/Backlog | `SPEC-050-assessment-system` |

---

## TIER 0: FOUNDATION SPECS

### SPEC-001: Brand Consistency Cleanup ✅
**Status:** Created | **Priority:** P0 | **Complexity:** Medium
**Location:** `docs/specs/SPEC-001-brand-consistency-cleanup.md`

Remove "Conscious AI" messaging, align with Elite Creator positioning.

---

### SPEC-002: Homepage Elite Redesign ✅
**Status:** Created | **Priority:** P0 | **Complexity:** High
**Location:** `docs/specs/SPEC-002-homepage-redesign/`

| Requirement | Current | Target |
|-------------|---------|--------|
| Hero Section | Generic | Elite creator value prop |
| Trust Indicators | Weak | 500+ songs, Oracle expertise, results |
| CTA Clarity | Multiple CTAs | Single focused journey |
| Mobile | Adequate | Mobile-first excellence |
| Load Time | ~3s | <2s |

**User Stories:**
- As a visitor, I want to immediately understand what Frank offers
- As a creator, I want to see proof of expertise before engaging
- As a potential customer, I want a clear next step

**Dependencies:** SPEC-001 (brand cleanup), SPEC-004 (design system)

---

### SPEC-003: Navigation & Information Architecture ✅
**Status:** Created | **Priority:** P0 | **Complexity:** High
**Location:** `docs/specs/SPEC-003-navigation-ia.md`

| Problem | Solution |
|---------|----------|
| 127 routes confusing | Consolidate to 6 primary hubs (~50 routes) |
| Hub discovery poor | Mega menu with previews |
| Mobile nav broken | Bottom nav + hamburger |
| No breadcrumbs | Add structured breadcrumbs |

**6-Hub Architecture:**
```
Home
├── /products (Products Hub)
├── /learn → /blog (Learn Hub)
├── /create (Create Hub - Music Lab, Prompts, Tools)
├── /architect (AI Architect Hub)
├── /about (About Hub)
└── /resources (Resources Hub - Downloads, Soulbook)
```

**Route Reduction:** 127 → ~50 (60% reduction)

**Dependencies:** SPEC-001 ✅, SPEC-002

---

### SPEC-004: Design System Documentation 🔲
**Status:** Needed | **Priority:** P0 | **Complexity:** Medium

Document and standardize:
- Color palette (brand colors, semantic colors)
- Typography scale (headings, body, code)
- Spacing system (4px base, 8pt grid)
- Component variants (buttons, cards, inputs)
- Animation patterns (easing, duration)
- Responsive breakpoints (mobile, tablet, desktop)

**Deliverables:**
- `docs/design-system/` documentation
- Storybook or `/design-system` page
- Component prop definitions

---

### SPEC-005: Product Funnel Architecture 🔲
**Status:** Needed | **Priority:** P0 | **Complexity:** High

| Current Issue | Solution |
|---------------|----------|
| No clear funnel | Define: Awareness → Interest → Decision → Action |
| Product overlap | Clear tier differentiation |
| Cross-sell missing | Strategic upsell paths |
| No comparison | Product comparison matrix |

**Funnel Design:**
```
FREE TIER
├── Newsletter (lead capture)
├── Creator's Soulbook (PDF)
└── Free assessment quiz

LOW TICKET ($27-$47)
├── Suno Prompt Library ($27)
└── Creative AI Toolkit ($47)

MID TICKET ($297-$497)
├── Vibe OS ($37-$297)
└── Agentic Creator OS ($297-$997)

HIGH TICKET ($2,497+)
├── Creation Chronicles ($497-$2,497)
└── Creator Studio OS ($4,800+)
```

---

## TIER 1: CORE SYSTEMS SPECS

### SPEC-010: Blog Content System 🔲
**Status:** Needed | **Priority:** P1 | **Complexity:** Medium

- Content pillar reorganization (post-rebrand)
- Editorial standards document
- SEO checklist per post
- Related posts algorithm
- Featured posts system

---

### SPEC-011: Newsletter & Email Pipeline 🔲
**Status:** Needed | **Priority:** P1 | **Complexity:** Medium

- Resend integration spec
- Email template library
- Welcome sequence (7-day)
- Segmentation strategy
- A/B testing framework

---

### SPEC-012: Search & Discovery 🔲
**Status:** Needed | **Priority:** P1 | **Complexity:** Medium

- Lunr.js optimization
- Filter/facet system
- Search analytics
- Instant search UI

---

### SPEC-013: Authentication & Dashboard 🔲
**Status:** Needed | **Priority:** P1 | **Complexity:** Medium

- NextAuth OAuth providers
- Role-based access
- Dashboard features
- Admin vs User views

---

### SPEC-014: SEO & AI Citation Optimization 🔲
**Status:** Needed | **Priority:** P1 | **Complexity:** High

- Schema.org markup
- AI citation optimization (ChatGPT, Perplexity)
- Keyword cluster strategy
- Internal linking structure

---

## TIER 2: HUB SPECS

### SPEC-020: AI Architecture Hub 🔲
**Priority:** P1 | **Current Quality:** 2/5

Hub for Oracle expertise, enterprise AI, multi-cloud content.

---

### SPEC-021: Music Lab Hub 🔲
**Priority:** P1 | **Current Quality:** 2/5

Hub for Suno AI, music production, prompt library.

---

### SPEC-022: Research Hub 🔲
**Priority:** P1 | **Current Quality:** 1/5

Intelligence research, analysis, reports.

---

### SPEC-023: Resources Hub 🔲
**Priority:** P1 | **Current Quality:** 1/5

Free downloads, templates, tools.

---

### SPEC-024: Intelligence Atlas 🔲
**Priority:** P1 | **Current Quality:** 2/5

Knowledge graph, content discovery, topic relationships.

---

## TIER 3: PRODUCT SPECS

### SPEC-030: Vibe OS 🔲
**Priority:** P0 | **Price:** $37 | **Quality:** 3/5

- Full product spec
- Sales page optimization
- Email sequence
- Onboarding flow

---

### SPEC-031: Creative AI Toolkit 🔲
**Priority:** P1 | **Price:** $47 | **Quality:** 3/5

---

### SPEC-032: Suno Prompt Library 🔲
**Priority:** P1 | **Price:** $27 | **Quality:** 3/5

---

### SPEC-033: Creation Chronicles 🔲
**Priority:** P1 | **Price:** $497-$2,497 | **Quality:** 3/5

---

### SPEC-034: Agentic Creator OS 🔲
**Priority:** P1 | **Price:** $297-$997 | **Quality:** 2/5

---

### SPEC-035: Creator Studio OS 🔲
**Priority:** P2 | **Price:** $4,800+ | **Quality:** 2/5

---

## TIER 4: INFRASTRUCTURE SPECS

### SPEC-040: Component Library 🔲
Consolidate 100+ components, document props, create Storybook.

---

### SPEC-041: API Documentation 🔲
Document 15+ API endpoints for internal/external use.

---

### SPEC-042: Performance Optimization 🔲
Lighthouse 90+, Core Web Vitals, bundle optimization.

---

### SPEC-043: Accessibility (WCAG 2.2) 🔲
Full accessibility audit and remediation plan.

---

### SPEC-044: Analytics Architecture 🔲
Event tracking, KPIs, dashboard design.

---

## TIER 5: FUTURE SPECS

### SPEC-050: Assessment System 🔲
Complete the quiz/assessment functionality.

---

### SPEC-051: Affiliate System 🔲
Full affiliate tracking and commission system.

---

### SPEC-052: Course Platform 🔲
Course delivery, progress tracking, certificates.

---

### SPEC-053: Community Features 🔲
Discord integration, member showcases, forums.

---

## Sprint Allocation

### Sprint 1 (Week 1-2): Foundation
- [x] SPEC-001: Brand Cleanup
- [ ] SPEC-002: Homepage Redesign (in progress)
- [x] SPEC-003: Navigation/IA

### Sprint 2 (Week 3-4): Design & Products
- [ ] SPEC-004: Design System
- [ ] SPEC-005: Product Funnel
- [ ] SPEC-030: Vibe OS

### Sprint 3 (Week 5-6): Core Systems
- [ ] SPEC-010: Blog System
- [ ] SPEC-011: Newsletter
- [ ] SPEC-014: SEO

### Sprint 4 (Week 7-8): Hubs
- [ ] SPEC-020: AI Architecture Hub
- [ ] SPEC-021: Music Lab Hub

---

## How to Create a New Spec

```bash
# 1. Determine the spec number from this index
#    (e.g., next in TIER-0 is SPEC-002)

# 2. Create the spec directory
mkdir docs/specs/SPEC-002-homepage-redesign

# 3. Create the spec files
touch docs/specs/SPEC-002-homepage-redesign/requirements.md
touch docs/specs/SPEC-002-homepage-redesign/design.md
touch docs/specs/SPEC-002-homepage-redesign/tasks.md
touch docs/specs/SPEC-002-homepage-redesign/status.md

# 4. Or use the /spec command
/spec new-feature "Homepage Elite Redesign"
```

---

## Quick Stats

| Metric | Count |
|--------|-------|
| Total Specs Needed | 47 |
| Specs Created | 2 |
| TIER-0 (Foundation) | 5 specs |
| TIER-1 (Core Systems) | 5 specs |
| TIER-2 (Hubs) | 5 specs |
| TIER-3 (Products) | 6 specs |
| TIER-4 (Infrastructure) | 5 specs |
| TIER-5 (Future) | 4 specs |

---

*Updated: 2026-01-24*
