/**
 * Vercel AI Gateway client wrapper.
 *
 * Why this exists: Frank's machine-global doctrine (~/.claude/CLAUDE.md) routes
 * LLM calls through OpenRouter, but for the FrankX site we want first-class
 * Vercel Gateway integration so AI agents (this 404 cron, future Vercel Agent
 * code reviews, etc.) get streaming + observability + model fallback for free.
 *
 * Per Vercel guidance (knowledge update 2026-02-27): use plain "provider/model"
 * strings through the Gateway. Do NOT import @ai-sdk/anthropic or other
 * provider packages directly unless you specifically need provider-only
 * features.
 *
 * Auth: AI Gateway uses `AI_GATEWAY_API_KEY` (Vercel auto-injects on deploy
 * if your project has Gateway access; locally set via `vercel env pull`).
 * When the key is missing we no-op gracefully — phases 1/2/4 work without it.
 */

import { generateObject } from 'ai'
import { z } from 'zod'

/** Whether the Gateway is configured in the current environment. */
export function isGatewayAvailable(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)
}

// ─── Schemas ────────────────────────────────────────────────

export const AliasProposal = z.object({
  kind: z.literal('alias'),
  pattern: z.string().describe('The 404 path that should redirect. Must start with /'),
  canonical: z.string().describe('The canonical route from the route-index that this should redirect to. Must start with /'),
  confidence: z.enum(['high', 'medium', 'low']),
  reasoning: z.string().describe('One sentence explaining why this canonical is the best match for the pattern'),
})

export const StubPageProposal = z.object({
  kind: z.literal('stub-page'),
  topic: z.string().describe('The conceptual topic the user was looking for'),
  targetRoute: z.string().describe('Suggested URL path for a new page. Must start with /'),
  outline: z.array(z.string()).describe('3-7 H2 section headings the new page should contain'),
  rationale: z.string().describe('Why creating this page would solve the 404 cluster'),
})

export const ProposalsResponseSchema = z.object({
  proposals: z.array(z.union([AliasProposal, StubPageProposal])),
  notes: z.string().optional().describe('Caveats or observations about the data'),
})

export type AliasProposalT = z.infer<typeof AliasProposal>
export type StubPageProposalT = z.infer<typeof StubPageProposal>
export type ProposalsResponse = z.infer<typeof ProposalsResponseSchema>

// ─── Public API ─────────────────────────────────────────────

export interface PathEvent {
  path: string
  count: number
  lastHit: string
  topReferrer?: string
}

/**
 * Ask the Gateway-routed LLM to propose aliases + stub pages for unresolved 404s.
 *
 * Model: anthropic/claude-haiku-4-5 by default — cheap, fast, brand-voice clean.
 * Override via `AI_GATEWAY_404_MODEL` env var if you want to A/B test.
 *
 * Returns null if the Gateway isn't configured (graceful no-op).
 */
export async function proposeAliasesAndStubs(args: {
  events: PathEvent[]
  knownRoutes: Array<{ href: string; title?: string; tags?: string[] }>
  existingAliases: Record<string, string>
}): Promise<ProposalsResponse | null> {
  if (!isGatewayAvailable()) {
    console.warn('[gateway-client] AI Gateway not configured; skipping')
    return null
  }

  const model = process.env.AI_GATEWAY_404_MODEL ?? 'anthropic/claude-haiku-4-5'

  // Keep the prompt compact: top 50 paths + a sample of canonical routes.
  // The model only needs route HREFS + titles for matching — full descriptions
  // would balloon the prompt without improving alias quality.
  const promptPaths = args.events.slice(0, 50)
  const promptRoutes = args.knownRoutes.slice(0, 200).map((r) => ({
    href: r.href,
    title: r.title,
  }))

  const systemPrompt = `You are the 404 recovery analyst for frankx.ai (a personal hub for AI architect and creator Frank).

Your job: cluster a list of 404 paths and propose two kinds of fixes:

1. ALIAS: when a 404 path obviously maps to a canonical route that already exists,
   propose an alias redirect. Confidence levels:
   - high   = single typo or missing path prefix (e.g. /ikigai-branding → /workshops/ikigai-branding)
   - medium = semantic match but not literal (e.g. /ai-coach → /coaching)
   - low    = plausible match but operator should verify

2. STUB-PAGE: when several 404s cluster around a topic that has NO canonical route
   in the index, propose a new page outline. Use this sparingly — only when the
   404 cluster has 5+ hits OR clearly indicates an audience need.

Hard rules:
- Never propose an alias to a path that's not in the provided "knownRoutes" list.
- Never propose to override an existing alias unless confidence is "high" AND you explain.
- Skip paths that look like scrapers, fuzzers, or .well-known/* probes.
- Match Frank's voice: precise, technical, no hype, no spiritual language.`

  const userPrompt = `KNOWN ROUTES (canonical hrefs you may redirect to):
${promptRoutes.map((r) => `  ${r.href} — ${r.title ?? '(no title)'}`).join('\n')}

EXISTING ALIASES (already approved, do not duplicate):
${Object.entries(args.existingAliases).map(([from, to]) => `  ${from} → ${to}`).join('\n') || '  (none)'}

UNRESOLVED 404 PATHS FROM THE LAST 24h (sorted by hit count):
${promptPaths.map((e) => `  ${e.path}  (${e.count} hits, last: ${e.lastHit}, referrer: ${e.topReferrer ?? '—'})`).join('\n')}

Propose at most 15 fixes total. Quality over quantity.`

  try {
    const result = await generateObject({
      model,
      schema: ProposalsResponseSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2,
    })
    return result.object
  } catch (err) {
    console.error('[gateway-client] generateObject failed:', (err as Error).message)
    return null
  }
}
