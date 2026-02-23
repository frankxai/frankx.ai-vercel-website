# GenAI Interface System — Master Plan

## Vision
Ship a world-class GenAI interface design system ("FrankX GenAI Kit") that:
1. Powers frankx.ai as a living showcase
2. Packages as v0/boilerplate templates for healthcare, finance, and other verticals
3. Includes pre-built multi-agent workflows where users inject API keys and ship
4. Comes with CLAUDE.md-style handover instructions for coding agents
5. Has recorded walkthrough content for each layer

---

## Phase 1: Unify the Design System Foundation

### Problem
The repo has overlapping implementations:
- `components/ui/GlassmorphicCard.tsx` vs `components/liquid-glass/GlassCard.tsx`
- `components/ui/GlassCard.tsx` (a third variant)
- Multiple homepage variants (V2, V3, Elite, 2025)
- Animation primitives scattered across `AdvancedAnimations.tsx`, `motion.ts`, individual components

### Actions
1. **Canonical Component Inventory** — Audit all 189+ components, mark which are canonical vs deprecated
2. **Single Glass Primitive** — Consolidate into one `<Glass>` component with variant props (frosted, crystal, liquid, obsidian) living in `components/genai-kit/`
3. **Single Button System** — Merge GlowButton, PremiumButton, LiquidButton into one `<Button>` with variant + element props
4. **Motion Choreography Layer** — Create `<Sequence>` and `<Stagger>` orchestration wrappers that coordinate child enter/exit timing
5. **Token Export** — All design tokens (colors, spacing, motion, gradients) exportable as JSON + CSS custom properties + Tailwind preset

### New Directory Structure
```
components/genai-kit/
├── primitives/
│   ├── Glass.tsx           # THE glass component (frosted/crystal/liquid/obsidian)
│   ├── Button.tsx          # THE button (solid/ghost/glass + element themes)
│   ├── Input.tsx           # Glass input with focus ring
│   ├── Pill.tsx            # Iridescent selection pill
│   ├── Card.tsx            # Composition of Glass + elevation + hover
│   ├── Badge.tsx           # Status/label badges
│   └── Divider.tsx         # Subtle gradient dividers
├── surfaces/
│   ├── Panel.tsx           # Content panel with glass + padding presets
│   ├── Modal.tsx           # Dialog with backdrop blur + spring animation
│   ├── Drawer.tsx          # Side panel with slide + blur
│   ├── Popover.tsx         # Floating content with arrow
│   └── Toast.tsx           # Notification with slide + glow
├── motion/
│   ├── Sequence.tsx        # Orchestrate child animations in order
│   ├── Stagger.tsx         # Stagger children with configurable delay
│   ├── Reveal.tsx          # Viewport-triggered entrance (up/down/left/right/scale)
│   ├── Parallax.tsx        # Scroll-linked transform
│   ├── Float.tsx           # Continuous floating motion
│   ├── Magnetic.tsx        # Cursor-following magnetic effect
│   └── Morph.tsx           # Layout animation wrapper (shared layout)
├── effects/
│   ├── Grain.tsx           # Film grain overlay (SVG noise)
│   ├── Aurora.tsx          # Radial gradient background blobs
│   ├── Glow.tsx            # Element glow halo effect
│   ├── Spotlight.tsx       # Cursor-following spotlight
│   ├── Shimmer.tsx         # Rotating conic gradient border
│   └── Particles.tsx       # Canvas-based particle field
├── layout/
│   ├── Container.tsx       # Max-width + padding presets
│   ├── Section.tsx         # Full-width section with background options
│   ├── Grid.tsx            # Responsive grid with gap presets
│   ├── Stack.tsx           # Vertical/horizontal stack
│   └── Bento.tsx           # Bento grid layout
├── data-display/
│   ├── Stat.tsx            # Animated number with label
│   ├── Chart.tsx           # Minimal chart wrapper
│   ├── Table.tsx           # Glass table with hover rows
│   ├── Timeline.tsx        # Vertical timeline with glow dots
│   └── CodeBlock.tsx       # Syntax-highlighted code with glass
├── ai/
│   ├── ChatBubble.tsx      # AI/Human message bubble
│   ├── StreamingText.tsx   # Token-by-token text reveal
│   ├── AgentCard.tsx       # Agent identity card with status
│   ├── WorkflowNode.tsx    # Visual workflow step
│   ├── WorkflowCanvas.tsx  # Connected workflow graph
│   ├── ToolCallCard.tsx    # Tool invocation display
│   ├── ThinkingIndicator.tsx # AI processing state
│   └── APIKeyInput.tsx     # Secure key input with validation
├── tokens/
│   ├── colors.ts           # Color palette + semantic tokens
│   ├── typography.ts       # Font families, scale, weights
│   ├── spacing.ts          # 4px grid system
│   ├── motion.ts           # Duration, easing, spring presets
│   ├── gradients.ts        # All gradient presets
│   ├── shadows.ts          # Elevation + glow shadows
│   ├── borders.ts          # Radius + border color tokens
│   └── index.ts            # Unified export
├── tailwind-preset.ts      # Drop-in Tailwind preset (colors, animations, etc.)
├── globals.css             # CSS custom properties + grain + base styles
└── index.ts                # Public API barrel export
```

### Design Decisions
- **Element themes stay**: fire, water, earth, wind, arcane — this is distinctive and no one else has it
- **Dark-first stays**: void/space/elevated background system is strong
- **Dual spectrum stays**: tech (emerald/cyan) + soul (amber/pink) is brand-differentiated
- **Glass material system stays**: frosted/crystal/liquid/obsidian is the hero feature
- **Grain overlay stays**: The SVG noise texture at 0.03 opacity is a signature detail

---

## Phase 2: Premium Polish — Closing the Gap with Linear/Vercel

### What separates "very good" from "world-class"

#### 2a. Motion Choreography
Current state: Individual animations work independently.
Target: Coordinated sequences where elements enter in waves.

```tsx
// Current (disconnected)
<FadeIn><Card /></FadeIn>
<FadeIn><Card /></FadeIn>

// Target (choreographed)
<Sequence staggerMs={80}>
  <Reveal direction="up"><Heading /></Reveal>
  <Reveal direction="up"><Subheading /></Reveal>
  <Stagger delayMs={60}>
    <Card /><Card /><Card />
  </Stagger>
</Sequence>
```

#### 2b. Scroll-Linked Depth
- Parallax layers at different speeds creating z-depth
- Background aurora blobs move slower than content
- Grain overlay stays fixed (already implemented)
- Cards slightly scale on scroll proximity

#### 2c. Interaction Density
- Every interactive element needs: hover, focus, active, disabled states
- Cursor changes contextually (pointer, grab, text)
- Focus rings use the rotating conic gradient from GlassInput
- Keyboard navigation animates the same as mouse

#### 2d. Loading & Empty States
- Skeleton screens using Glass + shimmer animation
- Empty state illustrations using the element theme colors
- Error states with subtle red glow pulse
- Success states with emerald glow burst

#### 2e. Performance Discipline
- Three.js scenes lazy-loaded, only on pages that need them
- Framer Motion `LazyMotion` with feature detection
- CSS-only animations where Framer Motion adds no value
- `will-change` applied surgically, not globally
- Intersection Observer for viewport-triggered animations (already in place)

---

## Phase 3: Vertical Templates with Supabase

### Template Architecture
Each vertical template ships as a standalone Next.js project:

```
templates/
├── healthcare/
│   ├── app/
│   │   ├── layout.tsx          # GenAI Kit theme applied
│   │   ├── page.tsx            # Dashboard home
│   │   ├── patients/           # Patient management
│   │   ├── chat/               # AI clinical assistant
│   │   ├── workflows/          # Multi-agent triggers
│   │   └── settings/           # API key configuration
│   ├── components/             # Domain-specific components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Supabase client init
│   │   │   ├── schema.sql      # Database schema
│   │   │   ├── migrations/     # Incremental migrations
│   │   │   └── seed.ts         # Demo data
│   │   ├── agents/
│   │   │   ├── triage.ts       # Triage agent definition
│   │   │   ├── summarize.ts    # Clinical summary agent
│   │   │   ├── research.ts     # Medical research agent
│   │   │   └── orchestrator.ts # Multi-agent coordinator
│   │   └── workflows/
│   │       ├── patient-intake.ts
│   │       ├── clinical-review.ts
│   │       └── report-generation.ts
│   ├── .env.example            # Required API keys documented
│   ├── SETUP.md                # Human setup guide
│   └── CLAUDE.md               # Agent handover instructions
├── finance/
│   └── ... (similar structure)
├── creative-studio/
│   └── ... (similar structure)
└── general-saas/
    └── ... (similar structure)
```

### Supabase Integration Pattern
```typescript
// lib/supabase/client.ts — Template pattern
import { createClient } from '@supabase/supabase-js'

// User provides these via .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Multi-Agent Trigger Pattern
```typescript
// lib/agents/orchestrator.ts — Template pattern
import Anthropic from '@anthropic-ai/sdk'

interface AgentConfig {
  apiKey: string       // User provides
  model: string        // Configurable
  systemPrompt: string // Pre-built per vertical
}

interface WorkflowTrigger {
  event: string                    // e.g., 'patient.intake.complete'
  agents: string[]                 // Which agents fire
  sequence: 'parallel' | 'chain'  // Execution mode
}

// Pre-built workflow triggers per vertical
export const healthcareWorkflows: WorkflowTrigger[] = [
  {
    event: 'patient.intake.complete',
    agents: ['triage', 'summarize'],
    sequence: 'parallel'
  },
  {
    event: 'triage.flagged.urgent',
    agents: ['research', 'notify'],
    sequence: 'chain'
  }
]
```

### API Key Injection UX
- Settings page with `<APIKeyInput>` component from the kit
- Keys stored in Supabase (encrypted) or local .env
- Validation: test API call on save, show success/error glow
- Status indicators per service (green dot = connected)

---

## Phase 4: Handover System for Coding Agents

### CLAUDE.md Template for Recipients
Each template includes a CLAUDE.md that tells the recipient's Claude Code (or Cursor, Copilot, etc.) how to work with the codebase:

```markdown
# [Template Name] — Agent Instructions

## Stack
- Next.js 16+ (App Router)
- FrankX GenAI Kit (design system)
- Supabase (auth, database, storage)
- Anthropic Claude API (AI agents)

## Design System
All UI components come from `@frankx/genai-kit`.
DO NOT create custom styled components — use kit primitives:
- `<Glass variant="frosted">` for cards
- `<Button variant="solid" element="water">` for actions
- `<Reveal direction="up">` for scroll animations
- See `/components/genai-kit/index.ts` for full API

## Adding New Pages
1. Create route in `app/[route]/page.tsx`
2. Use `<Section>` + `<Container>` for layout
3. Wrap content sections in `<Reveal>` for entrance animations
4. Use `<Glass>` cards for content blocks

## Adding New Agents
1. Create agent file in `lib/agents/[name].ts`
2. Define system prompt, tools, and output schema
3. Register in `lib/agents/orchestrator.ts`
4. Add workflow trigger in `lib/workflows/`
5. Create UI card using `<AgentCard>` component

## Adding New Workflows
1. Define trigger event in `lib/workflows/[name].ts`
2. Specify agent chain (parallel or sequential)
3. Add to workflow registry
4. UI automatically picks up new workflows via `<WorkflowCanvas>`

## Environment Variables
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Server-side service key
- `ANTHROPIC_API_KEY` — Claude API key
- Additional per-vertical keys as documented

## Code Style
- TypeScript strict mode
- Tailwind utility classes (via genai-kit preset)
- Framer Motion for all animations
- Server Components by default, 'use client' only when needed
```

### Extension Guide for Humans
A separate SETUP.md covers:
1. Clone, install, configure environment
2. Set up Supabase project (with link to one-click template)
3. Add API keys
4. Run locally, verify demo data
5. Customize: swap element theme, change colors, add pages
6. Deploy to Vercel (one-click)

---

## Phase 5: Walkthrough Recording Plan

### Recording Structure
Each video covers one composable layer. Modular so they work standalone or as a series.

#### Episode 1: "The Design System" (Foundation)
- Tour of token system (colors, typography, spacing, motion)
- How element themes work (fire, water, earth, wind, arcane)
- Glass material system demo (frosted → crystal → liquid → obsidian)
- Grain overlay and depth effects
- Live demo: compose a card from primitives

#### Episode 2: "Motion & Choreography" (Animation)
- Motion token system (durations, easings, springs)
- Individual effects: Reveal, Float, Magnetic, Parallax
- Orchestration: Sequence + Stagger
- Scroll-linked animations
- Live demo: build an animated hero section

#### Episode 3: "AI Components" (GenAI-Specific)
- ChatBubble, StreamingText, ThinkingIndicator
- AgentCard system
- WorkflowCanvas — visual agent orchestration
- ToolCallCard — showing what agents do
- Live demo: build an AI chat interface

#### Episode 4: "Multi-Agent Workflows" (Backend)
- Agent definition pattern
- Orchestrator architecture
- Workflow triggers and event system
- Supabase integration for state persistence
- Live demo: wire up a 3-agent healthcare workflow

#### Episode 5: "Ship It — Template to Production" (Deployment)
- Fork template, configure .env
- Supabase setup (schema, seed data)
- API key injection and validation
- Deploy to Vercel
- Live demo: go from zero to deployed in one recording

#### Recording Tips
- Screen: 1920x1080, dark theme, VS Code + browser side by side
- Narrate decisions, not just keystrokes
- Show the component rendering after each change
- Keep each episode under 15 minutes for retention
- Add chapter markers in YouTube description

---

## What Gets Built First

Priority order based on leverage (what unlocks the most value):

1. **`components/genai-kit/primitives/`** — Glass, Button, Input, Card, Pill
   - These are the foundation everything else builds on
   - Most of the code already exists, it needs consolidation

2. **`components/genai-kit/motion/`** — Sequence, Stagger, Reveal
   - This is the #1 differentiator vs competitors
   - Choreographed motion is what makes interfaces feel "alive"

3. **`components/genai-kit/ai/`** — ChatBubble, StreamingText, AgentCard, WorkflowCanvas
   - This is the unique value prop — no one packages AI UI primitives with this design quality

4. **`components/genai-kit/tokens/` + `tailwind-preset.ts`** — Exportable design tokens
   - Makes the system portable and installable

5. **`templates/healthcare/`** — First vertical template
   - Proves the system works end-to-end with real use case

6. **Remaining templates** — Finance, Creative Studio, General SaaS

---

## v0 MCP / Package Distribution

### Option A: npm Package
```bash
npm install @frankx/genai-kit
```
- Ships primitives, tokens, Tailwind preset, globals.css
- Templates are separate repos/packages

### Option B: v0 Template (Vercel)
- Submit to v0.dev as a template
- Users fork via "Deploy to Vercel" button
- Includes Supabase schema + seed

### Option C: Both (Recommended)
- npm package for the design system components
- v0 templates for the full vertical apps
- Templates depend on the npm package

---

## Quality Benchmarks

How to know when each phase is "done":

| Phase | Benchmark |
|-------|-----------|
| 1. Unify | Every component in genai-kit/ has: TypeScript types, element theme support, all interaction states, storybook-ready props |
| 2. Polish | Side-by-side with linear.app — motion choreography matches, no dead pixels, consistent spacing |
| 3. Templates | Healthcare template: clone → env → deploy in under 5 minutes. All agent workflows functional |
| 4. Handover | Give CLAUDE.md to a fresh Claude Code session, it can add a new page + agent without human help |
| 5. Walkthroughs | Each episode watchable standalone. Viewer can pause and replicate what's shown |

---

*This plan is a living document. Update as phases complete.*
