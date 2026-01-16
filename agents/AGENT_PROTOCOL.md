# FrankX Agent Communication Protocol
*Unified Handoff System for Multi-Agent Collaboration*

## Overview

This protocol defines how Claude, Codex, and Gemini (plus specialized business agents) communicate and hand off work to ensure smooth collaboration across the FrankX ecosystem.

## Agent Roster

### Core Agents (Always Active)

| Agent | File | Role | Primary Domain |
|-------|------|------|----------------|
| **Claude** | `agents/claude.md` | Story & Resonance Lead | Content, copy, narrative |
| **Codex** | `agents/codex.md` | Systems Architect | Architecture, data models, APIs |
| **Gemini** | `GEMINI.md` | Guardian Engineer | Implementation, testing, deployment |

### Specialized Agents (Activated as Needed)

| Agent | Role | When to Activate |
|-------|------|------------------|
| Technical Translator | AI accessibility | Creator education content |
| Frequency Alchemist | Music production | Suno sessions, Vibe OS |
| Creation Engine | Content production | Product launches, campaigns |
| Soul Strategist | Transformation design | User journeys, coaching |

### Business Agents (Website/Marketing Focus)

| Agent | Role | When to Activate |
|-------|------|------------------|
| Brand Architect | Design systems | Visual identity work |
| Conversion Engineer | Growth optimization | Landing pages, funnels |
| SEO Dominator | Search visibility | Content optimization |
| Product Alchemist | Product strategy | New product development |
| Performance Guardian | Site performance | Speed optimization |
| Content Strategist | Editorial planning | Content calendars |
| Market Intelligence | Competitive analysis | Research, positioning |

---

## Communication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRANKX AGENT ECOSYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   STRATEGY LAYER                                                 │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │    Soul     │    │   Market    │    │   Product   │        │
│   │ Strategist  │───▶│Intelligence │───▶│  Alchemist  │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│          │                                      │                │
│          ▼                                      ▼                │
│   CONTENT LAYER                                                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   Claude    │◀──▶│  Creation   │◀──▶│  Content    │        │
│   │(Story Lead) │    │   Engine    │    │ Strategist  │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│          │                  │                   │                │
│          ▼                  ▼                   ▼                │
│   TECHNICAL LAYER                                                │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   Codex     │───▶│   Gemini    │◀───│ Performance │        │
│   │ (Architect) │    │(Implementer)│    │  Guardian   │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                                                  │
│   SPECIALIZED LAYER                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │  Frequency  │    │  Technical  │    │    SEO      │        │
│   │  Alchemist  │    │ Translator  │    │  Dominator  │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Handoff Templates

### Claude → Codex (Content to Architecture)

```markdown
## Content Handoff: [Feature/Page Name]

### Content Structure
- Section 1: [Purpose]
- Section 2: [Purpose]
- [PLACEHOLDER:dynamic_content_here]

### Data Requirements
- Field: description (type, constraints)
- Field: description (type, constraints)

### Voice Guidelines
- Tone: [casual/formal/technical]
- Avoid: [specific words/phrases]

### Success Criteria
- [ ] Copy renders correctly
- [ ] Dynamic content populates
- [ ] CTAs function as expected
```

### Codex → Gemini (Architecture to Implementation)

```markdown
## Technical Handoff: [Feature Name]

### Architecture Decision
- Pattern: [MVC/MVVM/etc]
- Rationale: [Why this approach]

### Data Model
```typescript
interface Entity {
  field: Type; // description
}
```

### API Contract
```yaml
endpoint: /api/resource
method: POST
auth: required
input: { field: Type }
output: { data: Entity }
```

### Acceptance Criteria
- [ ] Endpoint returns correct data
- [ ] Error handling covers edge cases
- [ ] Tests pass at 80%+ coverage

### Performance Requirements
- Max response time: 200ms
- Bundle impact: <10KB
```

### Gemini → Claude (Implementation to Content)

```markdown
## Component Constraints: [Component Name]

### Text Limits
- Headline: 60 characters max
- Description: 150 characters max
- CTA: 20 characters max

### Dynamic Fields
- {{title}}: renders in h2
- {{body}}: renders in paragraph
- {{link}}: href attribute

### Responsive Behavior
- Mobile: stacked layout
- Desktop: side-by-side

### Implementation Notes
- Animation on scroll: Framer Motion
- Loading state: skeleton included
```

### All Agents → Daily Log

```markdown
## Daily Intelligence Log: [Date]

### Agent: [Name]

**Completed Today**
- [Task]: [Outcome]

**In Progress**
- [Task]: [Status/Blocker]

**Metrics Questions**
- How is [metric] tracking?
- Should we A/B test [variation]?

**Next Steps**
- [ ] Tomorrow priority 1
- [ ] Tomorrow priority 2

**Handoff Needed**
- To [Agent]: [What they need]
```

---

## Project Kickoff Protocol

When starting a new feature or project:

### 1. Soul Strategist Initiates
```
"Soul Strategist, define the transformation journey for [feature]"
```
Output: User journey map, success metrics

### 2. Claude Develops Narrative
```
"Claude, create the content strategy for [feature]"
```
Output: Copy deck, content structure, voice guidelines

### 3. Codex Designs Architecture
```
"Codex, design the data model and API for [feature]"
```
Output: Schema, API contracts, system diagram

### 4. Gemini Implements
```
"Gemini, implement [feature] from [Codex's spec]"
```
Output: Working code, tests, documentation

### 5. Performance Guardian Reviews
```
"Performance Guardian, audit [feature] before launch"
```
Output: Performance report, optimization recommendations

---

## Conflict Resolution

When agents disagree:

### Priority Order
1. **User transformation** (Soul Strategist) trumps optimization
2. **Technical feasibility** (Codex) trumps ideal design
3. **Performance requirements** (Gemini) trump feature scope
4. **Brand consistency** (Claude) trumps conversion tactics

### Escalation Path
1. Agents discuss in daily log
2. If unresolved, Soul Strategist mediates
3. Final decision: Frank (human override)

---

## Skill Invocation During Handoffs

### Claude Creating Content
```bash
/skill frankx-brand              # Ensure voice consistency
/skill golden-age-book-writing   # For long-form content
/skill soulbook/[pillar]         # For transformation content
```

### Codex Designing Systems
```bash
/skill mcp-architecture          # For AI integrations
/skill oracle-database-expert    # For data modeling
/skill claude-sdk                # For agent development
```

### Gemini Implementing
```bash
/skill nextjs-react-expert       # For component patterns
/skill ui-ux-design-expert       # For accessibility
/skill framer-expert             # For animations
```

---

## Communication Channels

| Type | Channel | When |
|------|---------|------|
| Handoffs | Markdown in `/docs/handoffs/` | Per feature |
| Daily Sync | `DAILY_INTELLIGENCE_OPERATIONS.md` | Daily |
| Architecture | `docs/architecture/` | Major decisions |
| Retrospectives | `docs/retros/` | Weekly |

---

## Emergency Protocols

### Production Bug
1. **Gemini** investigates immediately
2. **Codex** reviews for architectural implications
3. **Claude** drafts user communication if needed
4. All document in daily log

### Content Emergency
1. **Claude** drafts correction
2. **Gemini** deploys update
3. **Soul Strategist** reviews impact on user journey

### Performance Crisis
1. **Performance Guardian** diagnoses
2. **Gemini** implements fix
3. **Codex** reviews for systemic issues

---

## Success Metrics

### Collaboration Health
- Handoffs completed without rework: >90%
- Daily log consistency: 100%
- Cross-agent blockers resolved <24h

### Output Quality
- Features shipped on schedule: >85%
- Post-launch bugs: <2 per feature
- User satisfaction: >4.5/5

---

*This protocol ensures the FrankX agent team operates as a cohesive unit, not a collection of silos.*
