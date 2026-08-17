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
    did: 'Returned a curated still-life. Runtime model grok-imagine-image. Quality id still not in the tool result. Video not run.',
    skillOrTool: 'hermes image_generate, image-workflow-orchestrator',
    date: '2026-08-15',
  },
  {
    actor: 'Codex + Antigravity',
    role: 'Native image peers',
    did: 'Same still-life brief. Codex image_gen and agy generate_image both wrote real files that passed QA.',
    skillOrTool: 'codex exec image_gen.imagegen · agy generate_image',
    date: '2026-08-16',
  },
  {
    actor: 'Frank Riemer',
    role: 'Human publish gate',
    did: 'Human publish gate. This wave ships only after PR 483 merges to main and Vercel deploys.',
    skillOrTool: 'GitHub PR + Vercel git integration',
    date: '2026-08-15',
  },
]
