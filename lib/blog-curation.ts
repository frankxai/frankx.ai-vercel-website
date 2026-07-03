/**
 * Editorial curation — the single source of truth for what gets highlighted on
 * /blog. Curate by slug here instead of setting `featured`/`flagship` across
 * 200 MDX files. Order matters: items render in the order listed.
 *
 * How it maps to the page:
 *   HERO_SLUG      -> the single large hero at the top
 *   EDITORS_PICKS  -> the "Editor's Picks" rail directly under the hero
 *   COLLECTIONS    -> the themed pillar rows (the signature FrankX themes)
 *
 * Any slug that doesn't resolve to a published post is silently skipped, so
 * it's safe to list aspirational picks or retire a post without breaking the page.
 */

/** The single best evergreen authority piece — anchors the top of the blog. */
export const HERO_SLUG = 'ai-model-routing-guide'

/** Hand-picked best-of, one strong piece per pillar. Shown as a visual rail. */
export const EDITORS_PICKS: string[] = [
  'frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
  'agentic-creator-os-complete-guide',
  'best-ai-tools-for-creators-2026',
  'aeo-playbook-get-cited-by-ai-2026',
  'the-higher-self-protocol',
  'golden-age-of-creators-why-now-is-different',
]

export interface BlogCollection {
  id: string
  /** Emerald eyebrow label */
  eyebrow: string
  title: string
  subtitle: string
  slugs: string[]
}

/** The five signature FrankX themes, each a curated collection row. */
export const COLLECTIONS: BlogCollection[] = [
  {
    id: 'agentic',
    eyebrow: 'Pillar 01',
    title: 'Agentic AI & Creator OS',
    subtitle: 'Architect production agents and your own AI operating system.',
    slugs: [
      'agentic-creator-os-complete-guide',
      'agent-family-architecture',
      'multi-agent-orchestration-patterns-2026',
      'production-agentic-ai-systems',
      'build-your-own-jarvis-claude-code',
      'acos-enterprise-deployment-guide',
    ],
  },
  {
    id: 'models',
    eyebrow: 'Pillar 02',
    title: 'Model Intelligence',
    subtitle: 'Frontier model analyses and which one to actually use.',
    slugs: [
      'ai-model-routing-guide',
      'frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
      'chatgpt-vs-claude-vs-gemini-2026',
      'gpt-5-5-analysis-2026',
      'gemini-3-5-pro-analysis-2026',
      'deepseek-v4-analysis-2026',
    ],
  },
  {
    id: 'tools',
    eyebrow: 'Pillar 03',
    title: 'AI Tools & Workflows',
    subtitle: 'The stacks and workflows that ship real work.',
    slugs: [
      'best-ai-tools-for-creators-2026',
      'ultimate-guide-ai-coding-agents-2026',
      'cursor-vs-claude-code-vs-windsurf-2026',
      'claude-code-skills-2026-the-10-you-need',
      'prompt-engineering-mastery-workshop',
      'aeo-playbook-get-cited-by-ai-2026',
    ],
  },
  {
    id: 'conscious',
    eyebrow: 'Pillar 04',
    title: 'Conscious & Soul-Tech',
    subtitle: 'AI that serves meaning, not just output.',
    slugs: [
      'the-higher-self-protocol',
      'music-as-consciousness-technology',
      'no-bad-parts-sovereign-ai',
      'soul-frequency-framework',
      'conscious-ai-for-entrepreneurs',
      'ai-doesnt-have-to-be-soulless',
    ],
  },
  {
    id: 'creator-economy',
    eyebrow: 'Pillar 05',
    title: 'Creator Economy & Strategy',
    subtitle: 'Building an independent creator business in the AI age.',
    slugs: [
      'golden-age-of-creators-why-now-is-different',
      'golden-age-of-intelligence',
      'brand-evolution-from-consciousness-to-systems',
      'reader-first-golden-age',
      '30-minute-creator-os-quick-start',
    ],
  },
]

/** All slugs referenced anywhere in curation (hero + picks + collections). */
export const CURATED_SLUGS: string[] = Array.from(
  new Set([
    HERO_SLUG,
    ...EDITORS_PICKS,
    ...COLLECTIONS.flatMap((c) => c.slugs),
  ])
)
