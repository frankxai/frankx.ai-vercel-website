# FrankX Spec-Driven Development

> Based on [Pimzino/claude-code-spec-workflow](https://github.com/Pimzino/claude-code-spec-workflow), [MADR](https://github.com/adr/madr), and [joelparkerhenderson ADRs](https://github.com/joelparkerhenderson/architecture-decision-record)

## Quick Start

```bash
# Create a new feature spec
/spec new-feature "Add user authentication"

# Create a spec for improvement
/spec improve "Blog search performance"

# Create a spec for a fix
/spec fix "Mobile navigation bug"
```

## The Flow

```
/spec → Requirements → Design → Tasks → /planning-with-files → Implementation
```

| Phase | Output | Purpose |
|-------|--------|---------|
| 1. Requirements | `requirements.md` | User stories, acceptance criteria |
| 2. Design | `design.md` | Architecture decisions (MADR format) |
| 3. Tasks | `tasks.md` | Atomic task breakdown |
| 4. Planning | `task_plan.md` | Auto-invoked execution |

## Spec Directory Structure

```
docs/specs/
├── README.md                      # This file
├── SPEC_TEMPLATE.md              # Reference template
├── SPEC-001-brand-cleanup/
│   ├── requirements.md
│   ├── design.md
│   ├── tasks.md
│   └── status.md
└── SPEC-002-[next-feature]/
    └── ...
```

## Spec Lifecycle

```
Draft → Review → Approved → In Progress → Complete
  │        │         │           │           │
  │        │         │           │           └── All tasks done, verified
  │        │         │           └── /planning-with-files active
  │        │         └── Approved by stakeholder
  │        └── Under review
  └── Being written
```

## Commands

| Command | Purpose |
|---------|---------|
| `/spec [type] "desc"` | Create new spec |
| `/spec status` | Check all spec progress |
| `/spec list` | List all specs |
| `/planning-with-files` | Manual planning mode |

## Spec Numbering

Specs are numbered sequentially: `SPEC-001`, `SPEC-002`, etc.

To find the next number:
```bash
ls docs/specs/ | grep "^SPEC-" | sort -V | tail -1
```

## Related Docs

- [MASTER_DEVELOPMENT_PLAN.md](/MASTER_DEVELOPMENT_PLAN.md) - Strategic roadmap
- [CLAUDE.md](/CLAUDE.md) - Brand and project context
- [task_plan.md](/task_plan.md) - Current execution plan
