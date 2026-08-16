export type ProvenanceStep = {
  actor: string
  role: string
  did: string
  skillOrTool: string
  date: string
}

export const HUB_WAVE_ID = 'research-hub-recommend-2026-08-16'

export const hubProvenance: ProvenanceStep[] = [
  {
    actor: 'Grok 4.6',
    role: 'Hermes default / authoring',
    did: 'Wrote the sourced Grok 4.6 brief, hub registry row, 4.6 vs 4.3 compare page, and this recommendation board.',
    skillOrTool: 'content-swarm-production, seo-geo-public-contract-audit, estate-design-excellence',
    date: '2026-08-14 → 2026-08-16',
  },
  {
    actor: 'Claude Code',
    role: 'Independent read-only review',
    did: 'Confirmed: do not add n8n or Railway MCP for research publishing; Model Arena stays receipt-gated; do not invent a Grok winner.',
    skillOrTool: 'claude-code -p, print mode',
    date: '2026-08-14',
  },
  {
    actor: 'Grok Imagine',
    role: 'Image backend (not Grok 4.6 text)',
    did: 'Returned three locked-prompt JPEGs at 1280×720. Runtime model grok-imagine-image.',
    skillOrTool: 'hermes image_generate, image-workflow-orchestrator',
    date: '2026-08-15',
  },
  {
    actor: 'Nano Banana / GPT Image / FAL',
    role: 'Attempted comparators',
    did: 'HOLD. Gemini key present but invalid. OpenRouter/OpenAI and FAL keys absent.',
    skillOrTool: 'scripts/lib/nb-image.mjs, gpt-image.mjs, fal-image.mjs',
    date: '2026-08-15',
  },
  {
    actor: 'Frank Riemer',
    role: 'Human publish gate',
    did: 'Production merge of PR 475. This hub wave is a follow-on draft until he ships it.',
    skillOrTool: 'GitHub PR + Vercel git integration',
    date: '2026-08-15',
  },
]
