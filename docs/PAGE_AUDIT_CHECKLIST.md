# FrankX.AI Page Audit Checklist

> Use this checklist when updating any page to align with the new website philosophy.

---

## Before Starting

- [ ] Read `docs/WEBSITE_PHILOSOPHY.md` for context
- [ ] Identify the page's primary purpose
- [ ] Note current salesy language to remove

---

## Content Audit

### Language Check
- [ ] Remove "unlock your potential" and similar phrases
- [ ] Remove "transform your [X]" framing
- [ ] Remove urgency/scarcity language ("limited time", "don't miss")
- [ ] Remove excessive CTAs (keep 1-2 max per section)
- [ ] Change "we" to "I" where Frank is speaking directly
- [ ] Use "Here's what I found works" framing

### Value Check
- [ ] Does the page provide immediate value without signup?
- [ ] Are external resources credited? ("From Oracle", "From Google")
- [ ] Is there a curated resource section where appropriate?
- [ ] Does it show Frank's actual system/process?

### Signal Check
- [ ] Every word earns its place (cut filler)
- [ ] Headlines are clear and direct
- [ ] Descriptions don't oversell
- [ ] CTAs describe what happens, not what you'll "unlock"

---

## Design Audit

### Typography
- [ ] Headlines are large and confident (text-4xl to text-6xl)
- [ ] Body text is readable (text-white/60 or similar)
- [ ] Good contrast throughout
- [ ] Generous spacing

### Components
- [ ] Glass cards are subtle (bg-white/[0.02] to bg-white/5)
- [ ] Borders are subtle (border-white/5 to border-white/10)
- [ ] Hover states are smooth
- [ ] Animations are purposeful, not decorative

### Layout
- [ ] max-w-6xl container for content
- [ ] Consistent px-6 padding
- [ ] Generous section spacing (py-24 to py-32)
- [ ] Mobile responsive

---

## Page-Specific Checklists

### Homepage
- [ ] Hero focuses on "This is my system"
- [ ] Stats reflect actual work (songs, resources, etc.)
- [ ] Curated resources section present
- [ ] No email capture pushed prominently
- [ ] Testimonials feel authentic, not marketing

### Blog Articles
- [ ] Header image present and high-quality
- [ ] Opening is personal, not marketing
- [ ] Links to sources and inspirations
- [ ] No excessive CTAs in content
- [ ] Ending offers next step, not hard sell

### Product/System Pages
- [ ] Frame as "Here's my system for [X]"
- [ ] Free resources highlighted first
- [ ] External resources alongside Frank's work
- [ ] Premium options presented without pressure
- [ ] Clear what you get, no hype

### Resource Pages
- [ ] Organized by domain/use case
- [ ] External sources clearly attributed
- [ ] Quality over quantity
- [ ] Easy to navigate

### Learning/Student Pages
- [ ] Free courses from institutions highlighted
- [ ] Frank's additions complement, not replace
- [ ] Clear learning paths
- [ ] No gated content without value first

---

## Technical Audit

### Performance
- [ ] Images optimized (WebP/AVIF)
- [ ] Lazy loading for below-fold content
- [ ] No unnecessary JavaScript
- [ ] Fast initial load

### SEO
- [ ] Title is clear and useful
- [ ] Description provides value
- [ ] Proper heading hierarchy
- [ ] Internal links where relevant

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Focus states visible

---

## After Update

- [ ] Test on mobile
- [ ] Verify all links work
- [ ] Check in dark mode
- [ ] Build passes locally
- [ ] Commit with clear message

---

## Page Status Tracker

| Page | Status | Last Updated | Notes |
|------|--------|--------------|-------|
| `/` (Homepage) | ✅ Updated | Dec 2025 | New 2025 design |
| `/music-lab` | ⏳ Pending | - | Needs full rework |
| `/students` | ⏳ Pending | - | Needs full rework |
| `/prompt-library` | ⏳ Pending | - | Remove salesy language |
| `/blog` | ⏳ Pending | - | Update header, remove CTAs |
| `/about` | ⏳ Pending | - | Make more personal |
| `/resources` | ⏳ Pending | - | Add external curation |
| `/creation-chronicles` | ⏳ Pending | - | Keep authentic |
| `/roadmap` | ⏳ Pending | - | Simplify |
| `/start` | ⏳ Pending | - | Create if missing |
| `/products/*` | ⏳ Pending | - | Reframe as "my systems" |

---

*Update this tracker as pages are audited and improved.*
