import { defineTool } from 'eve/tools'
import { z } from 'zod'
import {
  publicAgentRegistry as PILLARS,
  type PublicAgentStatus,
  type PublicAgentTier,
} from '../lib/agent-registry.generated'

const statusValues = ['all', 'shipped', 'in-progress', 'gap'] as const
const tierValues = ['all', 'haiku', 'sonnet', 'opus', 'unassigned'] as const

function includesQuery(values: Array<string | undefined>, query: string): boolean {
  const normalized = query.toLowerCase().trim()
  return normalized.length === 0 || values.join(' ').toLowerCase().includes(normalized)
}

export default defineTool({
  description: 'Search the public ACOS operating registry by capability, pillar, status, or model tier. Use for questions about which specialist exists, what is shipped, and which quality gates are lit.',
  inputSchema: z.object({
    query: z.string().trim().max(160).default(''),
    pillar: z.string().trim().max(80).default('all'),
    status: z.enum(statusValues).default('all'),
    tier: z.enum(tierValues).default('all'),
    limit: z.number().int().min(1).max(25).default(12),
  }),
  execute({ query, pillar, status, tier, limit }) {
    const normalizedPillar = pillar.toLowerCase()
    const matches = PILLARS.flatMap((pillarRecord) =>
      pillarRecord.specialists.map((slot) => ({ pillar: pillarRecord, slot })),
    )
      .filter(({ pillar: pillarRecord, slot }) =>
        (normalizedPillar === 'all' || pillarRecord.id === normalizedPillar || pillarRecord.title.toLowerCase().includes(normalizedPillar)) &&
        (status === 'all' || slot.status === (status as PublicAgentStatus)) &&
        (tier === 'all' || (tier === 'unassigned' ? !slot.tier : slot.tier === (tier as PublicAgentTier))) &&
        includesQuery([slot.name, slot.ref, slot.kind, slot.one_liner, pillarRecord.title, pillarRecord.tagline], query),
      )
      .slice(0, limit)
      .map(({ pillar: pillarRecord, slot }) => ({
        name: slot.name,
        ref: slot.ref ?? null,
        kind: slot.kind,
        status: slot.status,
        tier: slot.tier ?? 'unassigned',
        summary: slot.one_liner,
        pillar: { id: pillarRecord.id, title: pillarRecord.title },
        gates: slot.gates ?? { dispatchable: false, tested: false, composed: false, brand_gated: false },
        publicUrl: `/agents#${pillarRecord.id}`,
      }))

    return {
      registryUrl: '/agents',
      resultCount: matches.length,
      results: matches,
      note: 'Public operating registry only. A shipped state does not imply every quality gate is lit.',
    }
  },
})
