# SPEC: Brand Consistency Cleanup

**Spec ID:** SPEC-001
**Status:** Approved
**Author:** Claude
**Created:** 2026-01-24
**Sprint:** 1.1 - 1.2
**Priority:** P0 (Critical)

---

## 1. OVERVIEW

### Problem Statement
The FrankX website and codebase contain inconsistent brand messaging. The old "Conscious AI" positioning conflicts with the new "Creator & AI Architect" direction. This dilutes brand clarity and undermines credibility.

**Impact:** 50+ files contain outdated messaging including "soul-aligned", "consciousness evolution", "awakening", and similar terms that no longer align with brand strategy.

### Proposed Solution
Systematically audit and update all content to align with the new brand voice:
- Technical excellence
- Creative mastery
- Builder's mindset
- Humble authority

### Success Criteria
- [ ] Zero instances of "soul-aligned", "consciousness evolution", "awakening" across codebase
- [ ] All 12 agent files use technical/practical language
- [ ] All product pages focus on results, not philosophy
- [ ] Homepage passes brand voice audit
- [ ] Blog posts updated (top 20 by traffic first)

---

## 2. SCOPE

### In Scope
- Content/blog/*.mdx files (50 files)
- agentic-creator-os agent definitions (12 files)
- docs/brand-foundation/* (10 files)
- Product page copy (6 pages)
- Homepage sections
- About page
- Links page (fix TODO)

### Out of Scope
- Third-party integrations
- API logic
- Component architecture (code structure)
- New feature development

### Dependencies
- CLAUDE.md (already updated ✅)
- frankx-brand skill v2.0 (already updated ✅)
- HomePageElite.tsx (already updated ✅)

---

## 3. TECHNICAL SPECIFICATION

### Files to Modify

#### Priority 1: Agent Files
| File | Current Issue | Action |
|------|---------------|--------|
| `agentic-creator-os/.claude/agents/conscious-fiction-writer.md` | "consciousness" language | Rename to "Fiction Writer", update copy |
| `agentic-creator-os/.claude/agents/golden-age-visionary.md` | "soul-aligned" | Is okay but also leverage practical voice |
| `agentic-creator-os/.claude/agents/transformational-guide.md` | "awakening" | Is okay but also make it cool and smooth and results-focused |
| [+ 9 more agent files] | Various | Audit and update |

#### Priority 2: Brand Foundation Docs
| File | Current Issue | Action |
|------|---------------|--------|
| `docs/brand-foundation/VISION-MISSION.md` | "soul-aligned" vision | improve with elite creator focus |
| `docs/brand-foundation/BRAND-STORY.md` | Spiritual narrative | combine and Update to technical journey |
| `docs/brand-foundation/CONTENT-STRATEGY.md` | "conscious" pillars | Update content pillars |
| [+ 7 more files] | Various | Audit and update |

#### Priority 3: Blog Posts (Top 20)
| File | Current Issue | Action |
|------|---------------|--------|
| `content/blog/soul-frequency-framework.mdx` | Title/content | Consider archive or rewrite |
| `content/blog/conscious-ai-*.mdx` | Multiple | Update messaging |
| [+ 18 more by traffic] | Various | Audit and update |

#### Priority 4: Product Pages
| File | Current Issue | Action |
|------|---------------|--------|
| `app/products/*/page.tsx` | Copy review | Ensure technical focus |
| `data/products.json` | Descriptions | Update product copy |

### Search Patterns for Audit
```bash
# Terms to find and replace/remove:
grep -r "soul-aligned" content/ app/ docs/
grep -r "consciousness evolution" content/ app/ docs/
grep -r "awakening" content/ app/ docs/
grep -r "transformation journey" content/ app/ docs/
grep -r "soul frequency" content/ app/ docs/
grep -r "conscious AI" content/ app/ docs/
```

### Brand Voice Replacement Guide
| Old Term | New Term |
|----------|----------|
| soul-aligned | precision-crafted |
| consciousness evolution | skill development |
| awakening | breakthrough |
| transformation | growth / improvement |
| soul frequency | creative style |
| conscious AI | intelligent AI |
| spiritual journey | creative journey |
| divine | excellent / exceptional |

---

## 4. IMPLEMENTATION PLAN

### Phase 1: Audit (Day 1)
| Task | Estimate | Owner |
|------|----------|-------|
| Run grep audit scripts | 30m | Claude |
| Generate file list with line counts | 30m | Claude |
| Prioritize by impact | 30m | Claude |
| Create tracking spreadsheet | 30m | Claude |

### Phase 2: Core Updates (Days 2-3)
| Task | Estimate | Owner |
|------|----------|-------|
| Update 12 agent files | 2h | Claude |
| Update VISION-MISSION.md | 1h | Claude |
| Update BRAND-STORY.md | 1h | Claude |
| Update CONTENT-STRATEGY.md | 1h | Claude |
| Update remaining brand docs | 2h | Claude |

### Phase 3: Content Updates (Days 4-7)
| Task | Estimate | Owner |
|------|----------|-------|
| Update top 10 blog posts | 3h | Claude |
| Update next 10 blog posts | 3h | Claude |
| Update product descriptions | 2h | Claude |
| Fix links page TODO | 30m | Claude |

### Phase 4: Verification (Day 7)
| Task | Estimate | Owner |
|------|----------|-------|
| Re-run audit scripts | 30m | Claude |
| Manual spot check | 1h | Claude |
| Update MASTER_DEVELOPMENT_PLAN.md | 30m | Claude |

---

## 5. QUALITY ASSURANCE

### Testing Strategy
- [ ] Grep audit shows zero matches for banned terms
- [ ] Manual review of 10 random pages
- [ ] Homepage visual review
- [ ] Product page visual review

### Quality Gates
- [ ] No TypeScript errors
- [ ] No broken links
- [ ] Brand voice checklist passes
- [ ] Deployed to production successfully

### Brand Voice Checklist
For each updated file:
- [ ] No spiritual/consciousness language
- [ ] Focus on results and expertise
- [ ] Technical accuracy maintained
- [ ] Humble but confident tone
- [ ] Clear value proposition

---

## 6. DEPLOYMENT

### Pre-Deployment Checklist
- [ ] All files reviewed
- [ ] Build succeeds locally
- [ ] No console errors
- [ ] Links work

### Deployment Steps
1. Stage changes in FrankX repo
2. Run `npm run build` to verify
3. Copy relevant files to `.worktrees/vercel-ui-ux`
4. Commit and push production repo
5. Verify at https://frankx.ai

### Post-Deployment Verification
- [ ] Homepage loads correctly
- [ ] Product pages display properly
- [ ] No 404 errors
- [ ] Random blog post spot check

---

## 7. RISKS & MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing content | Medium | Medium | Git history allows revert |
| Missing files in audit | Low | Low | Multiple grep patterns |
| Inconsistent voice | Medium | Medium | Use replacement guide |
| SEO impact | Low | Medium | Keep URLs stable, update meta |

---

## 8. TIMELINE

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Spec Approved | 2026-01-24 | ✅ |
| Audit Complete | 2026-01-25 | 🔲 |
| Core Updates Complete | 2026-01-27 | 🔲 |
| Content Updates Complete | 2026-01-31 | 🔲 |
| Deployed to Production | 2026-01-31 | 🔲 |

---

## 9. REFERENCES

- [MASTER_DEVELOPMENT_PLAN.md](/MASTER_DEVELOPMENT_PLAN.md) - Phase 1 details
- [CLAUDE.md](/CLAUDE.md) - Brand voice guidelines
- [task_plan.md](/task_plan.md) - Current brand overhaul progress
- [frankx-brand skill](~/.claude/skills/frankx-brand/SKILL.md) - v2.0 guidelines

---

## APPROVAL

| Role | Name | Date | Status |
|------|------|------|--------|
| Author | Claude | 2026-01-24 | Complete |
| Reviewer | Frank | 2026-01-24 | Pending |
| Approver | Frank | 2026-01-24 | Pending |

---

## CHANGELOG

| Date | Author | Change |
|------|--------|--------|
| 2026-01-24 | Claude | Initial draft |
