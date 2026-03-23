# FrankX Evolved System
## Hybrid Architecture: Specs + Systems + Orchestration

---

## The Insight

The problem wasn't "specs vs systems thinking." It was treating them as separate.

**The evolved approach:** Use the **Starlight Orchestrator** pattern to coordinate between mechanical execution (specs) and strategic thinking (systems), letting the orchestrator decide which mode fits each situation.

---

## The Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      STARLIGHT META-ORCHESTRATOR                        │
│           (Decides WHAT approach to use for each task)                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Input: "Build the homepage"                                           │
│                                                                         │
│   Analysis:                                                             │
│   ├── Is this tactical (clear execution)? → SPEC MODE                  │
│   ├── Is this strategic (needs thinking)? → SYSTEMS MODE               │
│   └── Is this complex (both)?             → HYBRID MODE                │
│                                                                         │
│   Routing Decision: HYBRID (strategy + execution needed)                │
│                                                                         │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
    │  SPEC MODE    │ │ SYSTEMS MODE  │ │  HYBRID MODE  │
    │               │ │               │ │               │
    │ /spec         │ │ /starlight    │ │ Both modes    │
    │ /planning-    │ │ /council      │ │ coordinated   │
    │  with-files   │ │ Brand DNA     │ │               │
    │               │ │ thinking      │ │               │
    │ Clear tasks   │ │               │ │ Strategy then │
    │ Known scope   │ │ New territory │ │ execution     │
    │ Execution     │ │ Big decisions │ │               │
    └───────────────┘ └───────────────┘ └───────────────┘
```

---

## Mode Selection Logic

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    WHICH MODE FOR WHICH TASK?                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  SPEC MODE (Mechanical Execution)                                       │
│  ├── Known patterns, clear requirements                                 │
│  ├── Example: "Add dark mode toggle"                                    │
│  ├── Example: "Fix mobile nav bug"                                      │
│  └── Skills: /spec, /planning-with-files                               │
│                                                                         │
│  SYSTEMS MODE (Strategic Thinking)                                      │
│  ├── New territory, requires Brand DNA alignment                        │
│  ├── Example: "What should the homepage convey?"                        │
│  ├── Example: "How do products connect?"                                │
│  └── Skills: /starlight-intelligence, /council, Brand DNA              │
│                                                                         │
│  HYBRID MODE (Both)                                                     │
│  ├── Complex projects that need strategy THEN execution                 │
│  ├── Example: "Build the homepage" (What + How)                         │
│  ├── Example: "Launch Vibe OS" (Strategy + Tactics)                     │
│  └── Flow: Systems thinking → Spec creation → Execution                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## The Skill Selection Framework

Instead of guessing which skill to use, the **Starlight Orchestrator** reasons through it:

### Step 1: Classify the Task

| Signal | Points to... |
|--------|--------------|
| "Build", "implement", "fix" | SPEC MODE |
| "Should we", "what's the strategy", "how do we position" | SYSTEMS MODE |
| "Build [complex thing] that [strategic goal]" | HYBRID MODE |

### Step 2: Check Brand DNA Alignment

**Before ANY execution, ask:**
> "Does this help someone go from using AI tools to building AI systems?"

If unclear → SYSTEMS MODE first
If clear → SPEC MODE

### Step 3: Route to Appropriate Skills/Agents

```
SPEC MODE:
├── /spec [type] "description"
├── /planning-with-files
└── Task agents: Arcanea Developer, FrankX Content Creator, etc.

SYSTEMS MODE:
├── /starlight-intelligence
├── /council (multi-agent strategic thinking)
├── Brand DNA document consultation
└── Council agents: Starlight Architect, Visionary, Creation Engine

HYBRID MODE:
├── Phase 1: /council for strategic direction
├── Phase 2: /spec to translate strategy into tasks
├── Phase 3: /planning-with-files for execution
└── Phase 4: Review against Brand DNA
```

---

## Applied to FrankX Site Transformation

### The Homepage (HYBRID MODE)

**Phase 1: SYSTEMS MODE**
- What does the homepage need to convey? (Brand DNA)
- "Most creators use AI tools. You're going to build an AI system."
- The 3 systems: Proof, Blueprints, Journey

**Phase 2: SPEC MODE**
- SPEC-002: Homepage Redesign
- Tasks: Hero component, Proof section, Blueprint cards, etc.
- Clear acceptance criteria

**Phase 3: Execution**
- /planning-with-files creates task_plan.md
- Work through tasks sequentially
- Quality gates at each step

### The Products (HYBRID MODE)

**Phase 1: SYSTEMS MODE**
- How do products connect? (Funnel architecture)
- "Fork this operating system" positioning
- Stage progression: User → Architect

**Phase 2: SPEC MODE**
- SPEC-030 through SPEC-035 (one per product)
- Reframe copy, update pages, create fork instructions

### The Hubs (SPEC MODE - mostly)

Once strategy is clear, hubs are execution:
- SPEC-020: AI Architecture Hub
- SPEC-021: Music Lab Hub
- Clear requirements, known patterns

---

## The Orchestrator Command

To invoke this evolved system:

```bash
# For the orchestrator to reason about approach
/starlight

# Or specifically
/starlight-intelligence

# The orchestrator will:
# 1. Analyze your request
# 2. Classify as SPEC/SYSTEMS/HYBRID
# 3. Route to appropriate skills/agents
# 4. Coordinate the workflow
# 5. Synthesize results
```

---

## Skill Auto-Selection

The orchestrator should automatically select skills based on task type:

### Strategic Tasks
```
Task: "What positioning for FrankX?"
│
└─► Orchestrator activates:
    ├── /starlight-intelligence (strategic mode)
    ├── Brand DNA consultation
    ├── Visionary (future visioning)
    └── Creation Engine (product perspective)
```

### Execution Tasks
```
Task: "Build the hero section"
│
└─► Orchestrator activates:
    ├── /spec (create/update spec)
    ├── /planning-with-files
    ├── Frontend skills (nextjs-expert, frontend-design)
    └── FrankX website builder agent
```

### Hybrid Tasks
```
Task: "Transform the FrankX homepage"
│
└─► Orchestrator activates:
    │
    ├─► Phase 1 (SYSTEMS):
    │   ├── /council
    │   ├── Brand DNA alignment
    │   └── Strategic direction document
    │
    └─► Phase 2 (SPEC):
        ├── /spec from strategic direction
        ├── /planning-with-files
        └── Execution agents
```

---

## The Council for Big Decisions

For major strategic decisions, invoke the **Council** (all Tier 1 agents in parallel):

```
/council "How should we structure the FrankX transformation?"

Council Members:
├── Starlight Architect (30% weight) - Systems architecture
├── Creation Engine (25% weight) - Product & content
├── Visionary (25% weight) - Future strategy
└── Frequency Alchemist (20% weight) - Consciousness/music

Output:
├── Each agent's perspective
├── Points of agreement
├── Points of tension
├── Synthesized recommendation
└── Confidence score
```

---

## The Evolved FrankX Strategy

Combining the Brand DNA insight with the orchestration system:

### The Three Systems (Strategic Layer)

```
PROOF ENGINE        BLUEPRINT LIBRARY     COMPOUND JOURNEY
     │                     │                    │
     │                     │                    │
     ▼                     ▼                    ▼
12,000 songs         Forkable OS          User → Architect
Shipped systems      Not courses          Stage progression
Results at scale     Documentation        Clear next steps
```

### The Specs (Execution Layer)

```
TIER-0: Foundation
├── SPEC-001: Brand Cleanup (SPEC MODE)
├── SPEC-002: Homepage (HYBRID MODE)
├── SPEC-003: Navigation/IA (HYBRID MODE)
├── SPEC-004: Design System (SPEC MODE)
└── SPEC-005: Product Funnel (SYSTEMS MODE → SPEC MODE)

TIER-1: Core Systems
├── SPEC-010-014 (mostly SPEC MODE, strategy already defined)

TIER-2+: Hubs, Products, Infrastructure
├── Execution mode (SPEC MODE)
└── Brand DNA check at completion
```

### The Flow

```
1. Strategic Question
   │
   └─► /council or /starlight-intelligence
       │
       └─► Brand DNA aligned direction
           │
           └─► Create/update SPEC
               │
               └─► /planning-with-files
                   │
                   └─► Execute tasks
                       │
                       └─► Quality gate (Brand DNA check)
                           │
                           └─► Deploy
```

---

## Implementation

### Step 1: Enhance /spec to check mode

Update `/spec` to first determine if SYSTEMS thinking is needed:

```markdown
When /spec is invoked:

1. Analyze the request
2. IF request requires strategic thinking:
   - "This looks like it needs strategic direction first."
   - "Let me invoke /starlight-intelligence to think through the approach."
   - Run SYSTEMS MODE
   - Then create spec from output
3. ELSE:
   - Proceed with SPEC MODE directly
```

### Step 2: Create /starlight-architect command

For FrankX specifically, create a command that invokes the evolved system:

```markdown
/starlight-architect

1. Reads Brand DNA (docs/brand-foundation/BRAND_DNA.md)
2. Invokes strategic thinking mode
3. Routes to appropriate sub-agents
4. Produces actionable output
5. Optionally creates spec for execution
```

### Step 3: Update MASTER_SPEC_INDEX with modes

```markdown
| Spec | Mode | Status |
|------|------|--------|
| SPEC-001 | SPEC | ✅ Created |
| SPEC-002 | HYBRID | ✅ Created |
| SPEC-003 | HYBRID | 🔲 Needs systems thinking |
| SPEC-004 | SPEC | 🔲 Ready for spec |
| SPEC-005 | SYSTEMS → SPEC | 🔲 Needs council |
```

---

## The Meta-Question

Before any work on FrankX, the orchestrator asks:

> "Does this help someone go from using AI tools to building AI systems?"

This is the Brand DNA filter. If the answer is unclear, go to SYSTEMS MODE. If clear, go to SPEC MODE.

---

## Summary

| Approach | When | Skills |
|----------|------|--------|
| **SPEC MODE** | Clear requirements, known patterns | /spec, /planning-with-files |
| **SYSTEMS MODE** | New territory, strategic thinking | /starlight-intelligence, /council, Brand DNA |
| **HYBRID MODE** | Complex projects | Systems first, then specs |

**The orchestrator's job:** Decide which mode, route appropriately, synthesize results.

**Your job:** State what you want to accomplish. The system figures out how.
