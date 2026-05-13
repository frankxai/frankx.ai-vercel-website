# Partnerships system

A reusable Partner Proposal page system. First instance is **Arrow Electronics ECS** (Oracle Global Distributor of the Year 2025). The system is layered as **working reality (Tier 1) → labeled proposal (Tier 2)** so a 30-year channel veteran encounters trust before ask.

- Public hub: `/partnerships`
- Per-partner deep page: `/partnerships/[slug]`
- LLM citation surface: `/partnerships/[slug]/llms.txt`
- Affiliate transparency (separate hub): `/partners`
- Design spec: [`docs/superpowers/specs/2026-05-07-partnerships-arrow-design.md`](../../docs/superpowers/specs/2026-05-07-partnerships-arrow-design.md)

## File tree

```
app/partnerships/
├── layout.tsx                        # tech-spectrum route boundary
├── page.tsx                          # hub
├── README.md                         # this file
└── [slug]/
    ├── page.tsx                      # deep page
    └── llms.txt/route.ts             # plain-text LLM summary

components/partnerships/              # 12 domain-specific components
content/partnerships/
├── types.ts                          # Partner schema
├── index.ts                          # registry — wire new partners here
├── arrow.ts                          # full instance
└── _placeholders/{nvidia,anthropic,vercel,google}.ts

lib/
├── cta-links.ts                      # MEET_AND_GROW_URL
└── cross-links.ts                    # canonical surface hrefs

.frankx/private/partnerships/         # GITIGNORED — operator-only briefs
└── <slug>-brief.md

public/images/partnerships/
├── og-default.png                    # placeholder OG, 1200x630
├── arrow-og.png                      # generated via NB2 (TODO Frank)
└── logos/<slug>.svg                  # official press-kit downloads (TODO Frank)
```

## Add a new partner in under 10 minutes

### 1. Drop a config file

Create `content/partnerships/<slug>.ts` (for `active`) or `content/partnerships/_placeholders/<slug>.ts` (for `placeholder` / `in-conversation`):

```ts
import type { Partner } from '../types'           // or '../../types' from _placeholders/
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

export const <slug>: Partner = {
  slug: '<slug>',
  name: '<Full Name>',
  shortName: '<Short Name>',
  tier: 'distribution' | 'cloud' | 'model-provider' | 'tooling' | 'silicon',
  status: 'active' | 'in-conversation' | 'placeholder',

  // Hero
  title: '<Frank\'s role on this page>',
  tagline: '<one-sentence partnership statement>',
  subTagline: '<verifiable market context>',

  // Tier 1 — working reality (verifiable today, top of page)
  contextWindow: `<~150-word grounding paragraph in 2 to 3 paragraphs>`,
  workingReality: [
    {
      label: '<short label>',
      detail: '<one-sentence verifiable fact>',
      evidence: { label: '<link text>', href: '<URL or relative path>' }, // optional
    },
    // 3 to 6 blocks total
  ],
  proofPoints: [
    { label: '<artifact label>', href: '<URL>' },
    // optional metric, e.g. metric: '85+ repos / 31 tools'
  ],

  // Tier 2 — proposal (only for active partners)
  proposalIntro: '<1 to 2 sentence intro>',                  // active only
  asymmetricValue: [/* exactly 5 ValueBlocks */],            // active only
  programs: [/* 1 to 6 Programs */],                         // active only
  compoundingModel: [/* 4 nodes — month 0, 3, 6, 12 */],     // active only
  crossLinks: [                                              // active only
    crossLink('ai-coe',           '<partner-specific rationale>'),
    crossLink('ai-architecture',  '<rationale>'),
    crossLink('ai-architect-academy', '<rationale>'),
    crossLink('research',         '<rationale>'),
    crossLink('workshops',        '<rationale>'),
  ],
  whatThisIsNot: [/* 3 to 5 scope-limit strings */],         // active only

  cta: { label: 'Book Meet & Grow with Frank', href: MEET_AND_GROW_URL },

  accent: 'tech',                                            // default 'tech'
  ogImagePath: '/images/partnerships/<slug>-og.png',         // optional; default OG used if missing

  seo: {
    title: '<60-char or so meta title>',
    description: '<155-char or so meta description>',
  },
}
```

For a **placeholder**, set all Tier 2 fields to empty arrays and `proposalIntro: ''`. The page will render Tier 1 plus `PlaceholderState` automatically.

### 2. Wire it into the registry

Edit `content/partnerships/index.ts`:

```ts
import { <slug> } from './<slug>'                            // or './_placeholders/<slug>'

const registry: Record<string, Partner> = {
  // ...existing partners
  [<slug>.slug]: <slug>,
}
```

### 3. Add the OG image (optional but recommended)

Generate `public/images/partnerships/<slug>-og.png` (1200x630). Suggested prompt for NB2 (`node scripts/nb-generate.mjs`):

> Editorial-tech composition. Near-black `#0a0a0b` background with subtle iridescent emerald glow upper-left. White typography: "FrankX × <Partner>" centered. Subtitle below in muted white: "<partner tagline>". Bottom-left small wordmark "frankx.ai". Cinematic, restrained, Vercel-Linear taste. No people, no logos, no stock imagery.

### 4. Add the partner logo (optional but recommended)

Per playbook (see spec §13):

1. Download SVG from official press kit (see spec for canonical URLs)
2. Save to `public/images/partnerships/logos/<slug>.svg`
3. Create `public/images/partnerships/logos/<slug>-attribution.txt` with source URL + retrieved-on date + license terms
4. Reference in partner config: `partnerLogoUrl: '/images/partnerships/logos/<slug>.svg'`

### 5. Verify

```bash
npm run type-check                   # 9 baseline errors expected
npm run validate:rails               # all pass
npm run claims:audit:strict          # only pre-existing baseline findings
npm run build                        # full prod build
```

Visit `/partnerships`, `/partnerships/<slug>`, `/partnerships/<slug>/llms.txt`. Confirm:

- Hero pairs FrankX + partner at equal weight
- Tier 1 working reality renders before any proposal language
- Tier 2 only renders for `status === 'active'`
- `ProposalDivider` cleanly labels the transition
- llms.txt returns sanitized text/plain

## Two-tier model — why it matters

A 30-year channel veteran can smell a proposal page from the parking lot. The model that earns trust:

```
TIER 1: Working reality (top of page)
  ├─ What I already build with this kind of partner
  ├─ Verifiable facts — repos, events, audience numbers
  └─ Evidence links

──── ProposalDivider — labeled hairline ────

TIER 2: Proposal (bottom of page, clearly labeled)
  ├─ Asymmetric value (leverage blocks)
  ├─ Operating modes (program cards, qualitative pricing)
  ├─ Compounding model (M0 / M3 / M6 / M12)
  ├─ Cross-link tour (working surfaces of frankx.ai)
  ├─ Scope limits (anti-positioning)
  └─ Closing CTA (Meet & Grow)
```

Trust before ask. Honest layering. The proposal IS a proposal, and we don't pretend otherwise — we just earn the right to make it by leading with verifiable working reality.

## Private vs public

Anything you wouldn't shout in a corridor lives in `.frankx/private/partnerships/<slug>-brief.md` (gitignored). The public page references roles, not named individuals. The public page never names Oracle transition timing or pricing brackets.

Validate that a new private brief is invisible to git:

```bash
git check-ignore -v .frankx/private/partnerships/<slug>-brief.md
# Expect: .gitignore:<line>:.frankx/private/   .frankx/private/partnerships/<slug>-brief.md
```

## Brand contract

- **Spectrum**: tech only (emerald `#10b981`). Never mix soul (amber) on partnership pages.
- **Typography**: Inter body, Poppins display ≥18px, eyebrow pattern (11px / 0.25em tracking / 60% alpha) before every h2.
- **CTAs**: one primary per viewport. Primary = `bg-emerald-500 text-black rounded-full`. Secondary = `bg-white/[0.04] border border-white/10 rounded-full`.
- **No emojis**, **no Arcanea language**, **no AI-tone phrases** ("delve", "harness", "unleash", "navigate the landscape", "in conclusion"). Editorial gates: `validate:rails` + `claims:audit:strict` + manual `taste.md` polish pass.

## Anti-patterns (never do)

- Don't paste named individuals into a public partner file.
- Don't paste numeric pricing into a public partner file.
- Don't add "X times faster" or "trusted by" or "Fortune 500" claims — they break `claims:audit:strict`.
- Don't import affiliate components from `components/affiliates/` — that lives on the `/partners` transparency hub, not here.
- Don't break the two-tier order by sliding proposal language into Tier 1.
