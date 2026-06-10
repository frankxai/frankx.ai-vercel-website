# Voice Router — which register for which surface

Two voice systems coexist in this codebase and they conflict. This file is the
tiebreaker. Check it before writing copy for any page, skill output, or campaign.

## The two registers

| Register | Source of truth | Sound |
|---|---|---|
| **Technical authority** | `CLAUDE.md` → Voice Guidelines | Results first. Precise, understated, zero spiritual language, no exclamation marks. Reads like a strong PR description. |
| **Studio / creator** | `.claude-skills/creative/frankx-brand/SKILL.md` | Cinematic, intimate, studio-session metaphors, soul + systems framing. |

Both are intentional. Neither is "the real one." They serve different audiences.

## Routing table

| Surface | Register | Why |
|---|---|---|
| `/agentic-builder-lab`, `/agentic-builder-lab/[slug]` | **Technical authority** | Audience is builders/architects scanning for proof. Voice override formalized in `.claude-skills/projects/agentic-builder-lab/resources/voice-spec.md` (banned-words lint included). |
| `/build`, `/build/template-pack` | **Technical authority** | B2B commercial surface. Claims must be receipt-backed (see Claims rules below). |
| `/ai-architecture`, `/ai-coe`, `/agentic-ai-center`, `/developers`, `/llm-hub` | **Technical authority** | Enterprise/architect audience. |
| Blog posts tagged `agentic-builder`, `architecture`, `engineering` | **Technical authority** | Continuation of the lab voice. |
| `/music`, `/music-lab`, `/products/vibe-os`, Suno content | **Studio / creator** | Creator audience; studio metaphors are literal here, not decoration. |
| `/soulbook`, lifebook skills, Arcanea | **Studio / creator** | The product *is* the soul + systems framing. |
| `/gencreator`, creator-economy content | **Studio / creator**, hype-trimmed | Creator-first but grounded per CLAUDE.md "show don't tell." |
| Newsletters | Match the stream: `agentic-builder-lab` list → technical; `music-lab`/`creation-chronicles` → studio. |
| Homepage, `/about`, `/bio` | **Technical authority** with warmth | The front door defaults to the more conservative register. |

**Default when unlisted:** technical authority. Escalate to studio register only
when the audience is explicitly creators/musicians/spiritual-growth readers.

## Claims rules (apply to BOTH registers — from PR #107's launch hardening)

- Oracle: always past tense — `Ex-Oracle`, `Former AI Architect, Oracle`. Never
  "at Oracle," never "built at Oracle" as product provenance.
- Numbers must be verifiable from a public repo or analytics: `90+ open-source
  AI skills`, `12,000+ Suno tracks`. No invented or rounded-up stats.
- "Tested in production" only for things that ran in production. For lab
  artifacts still maturing, say "drawn from live builds" or "iterated as each
  build progresses."
- Builds with `status: wip` are described as in progress — no implied shipped
  outcomes.

## When skills collide

A skill's own `voice_override` (e.g. `agentic-builder-lab`) beats `frankx-brand`
for that skill's outputs. If no override exists, this routing table decides by
surface. If the surface is genuinely ambiguous, technical authority wins —
it's cheaper to add warmth later than to retract hype.
