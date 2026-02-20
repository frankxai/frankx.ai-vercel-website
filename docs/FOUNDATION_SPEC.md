# FrankX Foundation Specification
*Premium Quality System Architecture*

---

## Vision
Transform every AI interaction into world-class output through systematic foundation, knowledge architecture, and quality enforcement.

**Brand:** Top Creator. Top AI Architect. Humble Excellence.

---

## Current State Audit

### ✅ Updated (New Brand)
| File | Status |
|------|--------|
| `CLAUDE.md` (root) | v2.0 ✅ |
| `~/.claude/skills/frankx-brand/SKILL.md` | v2.0 ✅ |
| `~/.claude/skills/frankx-daily-execution/SKILL.md` | v2.0 ✅ |
| `~/.claude/skills/suno-prompt-architect/SKILL.md` | v2.0 ✅ |
| `agentic-creator-os/.claude/agents/frequency-music-production.md` | v2.0 ✅ |
| `components/home/HomePageElite.tsx` | Updated ✅ |
| `docs/QUICK_REFERENCE.md` | Created ✅ |

### ❌ Needs Update (Old Messaging)
17 files in `.claude-skills/` still have "consciousness", "soul-aligned", "awakening" language:
- `.claude-skills/creative/frankx-brand/SKILL.md`
- `.claude-skills/creative/content-synthesis/SKILL.md`
- `.claude-skills/creative/frankx-content/SKILL.md`
- `.claude-skills/creative/golden-age-book-writing/SKILL.md`
- `.claude-skills/creative/suno-prompt-architect/SKILL.md`
- `.claude-skills/projects/frankx-daily-execution/SKILL.md`
- `.claude-skills/projects/cacos/SKILL.md`
- `.claude-skills/soulbook/*` (entire directory)
- `.claude-skills/registry/SKILL_REGISTRY.md`

### 🔍 Not Yet Assessed
- `agentic-creator-os/.claude/agents/` (40 agents)
- Blog content (`content/blog/`)
- Product pages (`app/products/`)
- User skills in `~/.claude/skills/` (many more)

---

## Foundation Architecture

### Layer 1: Core Identity (CLAUDE.md Files)

```
/mnt/c/Users/Frank/FrankX/CLAUDE.md           ← Project root (UPDATED ✅)
/mnt/c/Users/Frank/CLAUDE.md                  ← User root
~/.claude/settings.json                       ← Global settings
```

**Purpose:** Define brand identity, agent profiles, execution protocols for every session.

### Layer 2: Brand & Voice (Skills)

```
~/.claude/skills/
├── frankx-brand/SKILL.md         ← Brand voice, colors, language (UPDATED ✅)
├── frankx-daily-execution/SKILL.md ← Daily workflow (UPDATED ✅)
├── suno-prompt-architect/SKILL.md  ← Music production (UPDATED ✅)
└── [more skills...]
```

**Purpose:** Provide specialized expertise activated by context.

### Layer 3: Agent Departments

```
agentic-creator-os/.claude/agents/
├── technical/
│   ├── starlight-architecture-design.md
│   ├── nextjs-vercel-deployment.md
│   └── mcp-server-advising.md
├── creative/
│   ├── music-production.md          ← UPDATED ✅
│   ├── content-polisher.md
│   └── social-content-generator.md
├── business/
│   ├── coaching-program-design.md
│   └── publishing-strategist.md
└── quality/
    ├── developmental-editor.md
    ├── line-editor-voice-alchemist.md
    └── accessibility-auditor.md
```

**Purpose:** Specialized agents for different domains.

### Layer 4: Knowledge Base

```
/mnt/c/Users/Frank/FrankX/docs/
├── QUICK_REFERENCE.md            ← Commands & workflows (CREATED ✅)
├── FOUNDATION_SPEC.md            ← This document
├── BRAND_GUIDELINES.md           ← Detailed brand rules
├── QUALITY_STANDARDS.md          ← Quality bar definitions
├── STYLE_GUIDE.md                ← Writing style
└── TECH_PATTERNS.md              ← Architecture patterns
```

**Purpose:** Reference documentation for consistent quality.

### Layer 5: Quality Enforcement

```
Pre-commit hooks → Lint checks → Brand validation
Post-generation → Quality review → Brand alignment check
```

**Purpose:** Systematic quality assurance.

---

## What Needs to Be Built

### Phase 1: Complete Brand Alignment (Priority: HIGH)

**1.1 Update Remaining Skill Files**
- [ ] `.claude-skills/creative/frankx-brand/SKILL.md` → Sync with user skill
- [ ] `.claude-skills/creative/content-synthesis/SKILL.md`
- [ ] `.claude-skills/creative/frankx-content/SKILL.md`
- [ ] `.claude-skills/projects/frankx-daily-execution/SKILL.md` → Sync with user skill
- [ ] `.claude-skills/projects/cacos/SKILL.md`
- [ ] `.claude-skills/registry/SKILL_REGISTRY.md`

**1.2 Archive or Update Soulbook**
Decision: Archive `.claude-skills/soulbook/` to `_archive/` (spiritual focus conflicts with brand)

**1.3 Update Agent Files**
- [ ] Review all 40 agents in `agentic-creator-os/.claude/agents/`
- [ ] Update agents with consciousness language
- [ ] Ensure technical, professional focus

### Phase 2: Knowledge Foundation (Priority: HIGH)

**2.1 Create BRAND_GUIDELINES.md**
Detailed brand rules including:
- Voice characteristics
- Tone by content type
- Words to use/avoid (expanded list)
- Example transformations (old → new)
- Quality checklist

**2.2 Create STYLE_GUIDE.md**
Writing standards for:
- Blog posts
- Technical documentation
- Product copy
- Social media
- Code comments

**2.3 Create QUALITY_STANDARDS.md**
Quality bar definitions:
- Code quality criteria
- Content quality criteria
- Design quality criteria
- Performance benchmarks

### Phase 3: Agent Excellence System (Priority: MEDIUM)

**3.1 Reorganize Agent Department Structure**
```
agents/
├── technical/     ← AI architecture, development, DevOps
├── creative/      ← Music, content, design
├── business/      ← Strategy, marketing, products
├── editorial/     ← Writing, editing, publishing
└── quality/       ← Review, testing, auditing
```

**3.2 Create Agent Quality Framework**
Each agent file should have:
- Clear role definition
- Specific expertise areas
- Example prompts
- Quality criteria
- Integration points

**3.3 Create Agent Orchestration Patterns**
- Multi-agent workflows
- Handoff protocols
- Quality gates between agents

### Phase 4: Premium Quality Enforcement (Priority: MEDIUM)

**4.1 Quality Review Workflow**
- Auto-trigger code-reviewer agent after edits
- Content review before publishing
- Brand alignment check on all output

**4.2 Pre-Commit Quality Gates**
- Lint check
- Type check
- Brand language check (custom)

**4.3 Output Quality Templates**
- Blog post template with quality checklist
- Product page template
- Technical doc template

### Phase 5: Premium Design System (Priority: MEDIUM)

**5.1 Design Token Documentation**
Document the complete design system:
- Colors (void, space, tech spectrum, soul spectrum)
- Typography (Syne, Outfit, Playfair, JetBrains Mono)
- Spacing, shadows, animations
- Component patterns

**5.2 Premium Component Library**
- SpotlightCard, GlowBadge, etc.
- Usage guidelines
- Accessibility requirements

---

## Implementation Plan

### Week 1: Brand Completion
- [ ] Update all 17 files with old messaging
- [ ] Archive soulbook folder
- [ ] Review and update agent files
- [ ] Test brand consistency

### Week 2: Knowledge Foundation
- [ ] Create BRAND_GUIDELINES.md
- [ ] Create STYLE_GUIDE.md
- [ ] Create QUALITY_STANDARDS.md
- [ ] Update QUICK_REFERENCE.md

### Week 3: Agent Excellence
- [ ] Reorganize agent departments
- [ ] Create agent quality framework
- [ ] Document orchestration patterns
- [ ] Test multi-agent workflows

### Week 4: Quality Enforcement
- [ ] Implement quality review workflow
- [ ] Set up pre-commit hooks
- [ ] Create output templates
- [ ] Test quality gates

---

## Success Metrics

### Brand Consistency
- 0 files with old messaging
- All agents aligned with brand
- Consistent voice across all output

### Quality Output
- Every blog post passes quality checklist
- Every code change passes review
- Every design follows system

### Premium Feel
- Professional, confident tone
- Technical depth with accessibility
- Humble excellence in every detail

---

## Key Principles

1. **Excellence Over Speed** - Quality is non-negotiable
2. **Consistency Over Creativity** - Brand alignment first
3. **Results Over Philosophy** - Show, don't preach
4. **Technical Depth** - Expertise speaks through work
5. **Humble Confidence** - Let quality prove itself

---

## File Priority Matrix

| Priority | Files | Action |
|----------|-------|--------|
| P0 | CLAUDE.md files | Updated ✅ |
| P0 | Core skill files | Updated ✅ |
| P1 | .claude-skills/ (17 files) | Update this session |
| P1 | Agent files (40 files) | Review & update |
| P2 | Knowledge docs | Create this week |
| P2 | Blog content | Audit next week |
| P3 | Design system docs | Create as needed |

---

*This spec defines the foundation for premium quality across all FrankX output.*
