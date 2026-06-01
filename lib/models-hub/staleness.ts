/**
 * Pure staleness audit over both model registries.
 *
 * Returns a structured report consumed by:
 *  - /api/cron/model-hub-audit (Vercel cron, weekly)
 *  - GitHub Action (opens an issue from the report)
 *  - The model-intelligence-curator agent (work queue)
 *
 * No I/O — just reads the registries and applies the freshness rules.
 */

import llmRegistry from '@/data/model-registry.json'
import genRegistry from '@/data/generative-model-registry.json'

interface AuditFlag {
  modality: 'text' | 'image' | 'video' | 'audio' | 'voice' | 'embedding' | 'world'
  registry: 'model-registry.json' | 'generative-model-registry.json'
  id: string
  name: string
  released: string
  reason: 'stale' | 'preview-overdue' | 'missing-sources' | 'unreviewed'
  detail: string
  url: string
}

const SITE = 'https://frankx.ai'

const STALE_MONTHS = 4
const PREVIEW_MONTHS = 3

function monthsBetween(iso: string, now: Date): number {
  // Accept "YYYY-MM-DD" or "YYYY-MM".
  if (!iso) return Infinity
  const [ys, ms = '01'] = iso.split('-')
  const y = Number(ys)
  const m = Number(ms)
  if (!y || !m) return Infinity
  const then = new Date(Date.UTC(y, m - 1, 1))
  return (now.getUTCFullYear() - then.getUTCFullYear()) * 12 + (now.getUTCMonth() - then.getUTCMonth())
}

export interface StalenessReport {
  generated_at: string
  totals: { text: number; multimodal: number; flagged: number }
  flags: AuditFlag[]
  by_reason: Record<AuditFlag['reason'], number>
}

export function runStalenessAudit(now: Date = new Date()): StalenessReport {
  const flags: AuditFlag[] = []

  // Text LLM registry
  const llmModels = (llmRegistry as { models: Record<string, Record<string, unknown>> }).models
  for (const [id, raw] of Object.entries(llmModels)) {
    const released = String(raw.released || '')
    const status = String(raw.status || '')
    const sources = (raw.sources as string[]) || []
    const name = String(raw.name || id)
    const age = monthsBetween(released, now)
    const url = `${SITE}/llm-hub/${id}`

    if (sources.length === 0) {
      flags.push({ modality: 'text', registry: 'model-registry.json', id, name, released, reason: 'missing-sources', detail: 'No sources[] — every claim needs at least one source.', url })
    }
    if (status === 'preview' && age >= PREVIEW_MONTHS) {
      flags.push({ modality: 'text', registry: 'model-registry.json', id, name, released, reason: 'preview-overdue', detail: `Status: preview for ${age} months — verify GA status.`, url })
    }
    if (age >= STALE_MONTHS && status !== 'legacy') {
      flags.push({ modality: 'text', registry: 'model-registry.json', id, name, released, reason: 'stale', detail: `Released ${age} months ago — refresh pricing/benchmarks.`, url })
    }
  }

  // Multimodal registry
  const genModels = (genRegistry as { models: Record<string, Record<string, unknown>> }).models
  for (const [id, raw] of Object.entries(genModels)) {
    const released = String(raw.released || '')
    const status = String(raw.status || '')
    const sources = (raw.sources as string[]) || []
    const name = String(raw.name || id)
    const cat = String(raw.category || '') as AuditFlag['modality']
    const age = monthsBetween(released, now)
    const url = `${SITE}/models/${cat}/${id}`

    if (sources.length === 0) {
      flags.push({ modality: cat, registry: 'generative-model-registry.json', id, name, released, reason: 'missing-sources', detail: 'No sources[].', url })
    }
    if (status === 'preview' && age >= PREVIEW_MONTHS) {
      flags.push({ modality: cat, registry: 'generative-model-registry.json', id, name, released, reason: 'preview-overdue', detail: `Status: preview for ${age} months — verify GA status.`, url })
    }
    if (age >= STALE_MONTHS && status !== 'legacy') {
      flags.push({ modality: cat, registry: 'generative-model-registry.json', id, name, released, reason: 'stale', detail: `Released ${age} months ago — refresh.`, url })
    }
  }

  const by_reason = flags.reduce(
    (acc, f) => {
      acc[f.reason] = (acc[f.reason] || 0) + 1
      return acc
    },
    { stale: 0, 'preview-overdue': 0, 'missing-sources': 0, unreviewed: 0 } as Record<AuditFlag['reason'], number>
  )

  return {
    generated_at: now.toISOString(),
    totals: {
      text: Object.keys(llmModels).length,
      multimodal: Object.keys(genModels).length,
      flagged: flags.length,
    },
    flags,
    by_reason,
  }
}

/** Render the report as a Markdown body suitable for a GitHub issue or PR. */
export function reportToMarkdown(report: StalenessReport): string {
  const date = report.generated_at.slice(0, 10)
  if (report.flags.length === 0) {
    return `# Model Hub Staleness Audit — ${date}\n\nAll clear. ${report.totals.text} text models + ${report.totals.multimodal} multimodal models tracked; nothing flagged.\n`
  }
  const byReason = report.by_reason
  const groups = ['stale', 'preview-overdue', 'missing-sources', 'unreviewed'] as const
  const sections = groups
    .filter((g) => (byReason[g] || 0) > 0)
    .map((g) => {
      const rows = report.flags
        .filter((f) => f.reason === g)
        .map((f) => `- **[${f.name}](${f.url})** *(${f.modality})* — ${f.detail}`)
        .join('\n')
      return `## ${g} (${byReason[g]})\n\n${rows}\n`
    })
    .join('\n')
  return `# Model Hub Staleness Audit — ${date}\n\n${report.totals.flagged} model(s) flagged across ${report.totals.text} text + ${report.totals.multimodal} multimodal entries.\n\n${sections}\n---\n\n*Resolve each flag by editing the registry and running \`/new-gen-model\` (multimodal) or \`/new-model\` (text). Generated by the model-hub audit.*\n`
}
