# Spec Template Reference

This template shows the structure for a complete spec. Each spec is a **directory** containing multiple files.

---

## Directory Structure

```
SPEC-XXX-feature-name/
├── requirements.md    # User stories, acceptance criteria
├── design.md          # Architecture, MADR decisions
├── tasks.md           # Atomic task breakdown
└── status.md          # Execution tracking
```

---

## requirements.md Template

```markdown
# SPEC-XXX: [Feature Name] - Requirements

**Created:** YYYY-MM-DD
**Author:** [Name]
**Status:** Draft | In Review | Approved
**Priority:** P0 | P1 | P2 | P3

---

## Problem Statement

[2-3 sentences describing the problem. Why does this matter?]

---

## User Stories

### Story 1: [Primary User Action]

**As a** [user type]
**I want** [capability]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

### Story 2: [Secondary User Action]

**As a** [user type]
**I want** [capability]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [result]

---

## Success Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| [Metric 1] | [value] | [value] | [method] |
| [Metric 2] | [value] | [value] | [method] |

---

## Constraints

- **Technical:** [constraint]
- **Business:** [constraint]
- **Timeline:** [constraint]

---

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| [SPEC-XXX] | Spec | Pending |
| [External API] | External | Available |

---

## Out of Scope

- [Explicitly excluded item 1]
- [Explicitly excluded item 2]
```

---

## design.md Template (MADR Format)

```markdown
# SPEC-XXX: [Feature Name] - Design

**Status:** Proposed | Accepted | Deprecated | Superseded
**Deciders:** [Names]
**Date:** YYYY-MM-DD

---

## Context and Problem Statement

[Describe the architectural context and the problem being solved. 2-3 paragraphs.]

---

## Decision Drivers

- **[Driver 1]:** [e.g., Must support 10K concurrent users]
- **[Driver 2]:** [e.g., Team familiar with React, not Vue]
- **[Driver 3]:** [e.g., Budget constraint of $X]
- **[Driver 4]:** [e.g., Must integrate with existing auth]

---

## Considered Options

### Option 1: [Name]
[Brief description]

**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

### Option 2: [Name]
[Brief description]

**Pros:**
- [Pro 1]

**Cons:**
- [Con 1]
- [Con 2]

### Option 3: [Name]
[Brief description]

---

## Decision Outcome

**Chosen option:** "[Option X]"

**Because:**
- [Reason 1]
- [Reason 2]
- [Reason 3]

---

## Consequences

### Positive
- [Good outcome 1]
- [Good outcome 2]

### Negative
- [Trade-off 1] — Mitigation: [strategy]
- [Trade-off 2] — Mitigation: [strategy]

---

## Technical Specification

### Architecture Overview

```
[ASCII diagram or description]
```

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `app/feature/page.tsx` | Create | Main feature page |
| `components/Feature.tsx` | Create | Feature component |
| `lib/feature.ts` | Create | Business logic |
| `app/api/feature/route.ts` | Create | API endpoint |

### Data Structures

```typescript
interface FeatureData {
  id: string;
  name: string;
  createdAt: Date;
  // ...
}

type FeatureState = 'draft' | 'active' | 'archived';
```

### API Changes

| Endpoint | Method | Request | Response |
|----------|--------|---------|----------|
| `/api/feature` | GET | - | `FeatureData[]` |
| `/api/feature` | POST | `CreateFeatureInput` | `FeatureData` |
| `/api/feature/[id]` | PUT | `UpdateFeatureInput` | `FeatureData` |

### Database Changes

[If applicable - schema changes, migrations]

---

## Security Considerations

- [Security consideration 1]
- [Security consideration 2]

---

## Performance Considerations

- [Performance consideration 1]
- [Performance consideration 2]
```

---

## tasks.md Template

```markdown
# SPEC-XXX: [Feature Name] - Tasks

**Total Estimated Effort:** [X hours]
**Sprint Assignment:** [Sprint X.X]

---

## Task Overview

| ID | Task | Est. | Depends | Status |
|----|------|------|---------|--------|
| T1 | [Task name] | 1h | - | 🔲 |
| T2 | [Task name] | 2h | T1 | 🔲 |
| T3 | [Task name] | 1h | T1 | 🔲 |
| T4 | [Task name] | 2h | T2, T3 | 🔲 |
| T5 | [Task name] | 1h | T4 | 🔲 |

**Legend:** 🔲 Pending | 🔄 In Progress | ✅ Complete | ❌ Blocked

---

## Task Details

### T1: [Task Name]

**Description:** [Detailed description of what needs to be done]

**Files:**
- `path/to/file1.tsx`
- `path/to/file2.ts`

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

**Notes:** [Any additional context]

---

### T2: [Task Name]

**Description:** [Detailed description]

**Files:**
- `path/to/file.tsx`

**Acceptance Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

### T3: [Task Name]

[Continue for each task...]

---

## Quality Gates

Before marking spec complete:

- [ ] All tasks completed
- [ ] TypeScript compiles with no errors
- [ ] ESLint passes
- [ ] Manual testing completed
- [ ] Accessibility verified
- [ ] Mobile responsive verified
- [ ] Documentation updated (if applicable)
- [ ] Deployed to staging
- [ ] Stakeholder sign-off

---

## Rollback Plan

If issues arise after deployment:

1. [Rollback step 1]
2. [Rollback step 2]
3. [Notification step]
```

---

## status.md Template

```markdown
# SPEC-XXX: [Feature Name] - Status

**Last Updated:** YYYY-MM-DD HH:MM

---

## Current Status

| Phase | Status | Notes |
|-------|--------|-------|
| Requirements | ✅ Complete | Approved YYYY-MM-DD |
| Design | ✅ Complete | MADR accepted |
| Tasks | 🔄 In Progress | 3/5 complete |
| Deployment | 🔲 Pending | - |

---

## Progress Log

### YYYY-MM-DD
- Completed T1, T2
- Started T3
- Blocker: [description] - Resolved by [action]

### YYYY-MM-DD
- Initial spec created
- Requirements approved

---

## Blockers

| Blocker | Raised | Owner | Status |
|---------|--------|-------|--------|
| [Description] | YYYY-MM-DD | [Name] | 🔄 Working |

---

## Decisions Made

| Decision | Date | Rationale |
|----------|------|-----------|
| [Decision 1] | YYYY-MM-DD | [Why] |

---

## Links

- PR: [link]
- Staging: [link]
- Production: [link]
```

---

## Best Practices

1. **One spec = one feature** — Keep scope focused
2. **Atomic tasks** — Each task ≤2 hours
3. **Clear acceptance criteria** — Measurable, testable
4. **Update status daily** — Keep status.md current
5. **MADR for decisions** — Document the "why"
