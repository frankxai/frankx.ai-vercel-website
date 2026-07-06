import { buildModelRows } from '@/lib/llm-hub/rows'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { CAPABILITIES, CAPABILITY_ORDER } from '@/lib/llm-hub/capabilities'
import { COMPARISONS } from '@/lib/llm-hub/comparisons'
import { DECISION_MATRIX } from '@/lib/llm-hub/decisions'
import { getProviders } from '@/lib/llm-hub/registry'
import { getEditorial } from '@/lib/llm-hub/editorial'

export const revalidate = 3600

/**
 * /llm-hub.json — agent-readable surface for the LLM Hub.
 * Same curated intelligence as the human pages, as clean structured JSON.
 * Built for AI assistants answering "which model should I use for X."
 */
export async function GET() {
  const live = await fetchLivePricing()
  const rows = buildModelRows(live)
  const SITE = 'https://frankx.ai'

  const payload = {
    _meta: {
      name: 'FrankX LLM Provider Hub',
      description:
        'Curated decision layer over the frontier LLM landscape — models, benchmarks, pricing, agentic platforms, and verdicts. Built for humans and agents.',
      url: `${SITE}/llm-hub`,
      updated: new Date().toISOString().slice(0, 10),
      pricing_note:
        'Pricing is live via OpenRouter where available (field live=true), otherwise from the curated registry. Always verify against the provider before relying on it.',
      sources: [
        'https://openrouter.ai/models',
        'https://artificialanalysis.ai/leaderboards/models',
        'https://lmarena.ai/',
        'https://arcprize.org/',
        'https://blog.kilo.ai/p/you-dont-have-to-use-fable-and-mythos',
        'https://github.com/frankxai/Starlight-Intelligence-System/tree/main/tools/arena/runs',
      ],
    },
    capabilities: CAPABILITY_ORDER.map((c) => ({
      id: c,
      label: CAPABILITIES[c].label,
      description: CAPABILITIES[c].description,
    })),
    providers: getProviders().map((p) => ({
      slug: p.org.slug,
      name: p.org.name,
      one_liner: p.org.one_liner,
      flagship: p.org.flagship_model_id,
      capability_focus: p.org.capability_focus,
      models: p.models.map((m) => m.id),
      url: p.org.url,
    })),
    models: rows.map((r) => ({
      id: r.id,
      name: r.name,
      provider: r.org,
      released: r.released,
      status: r.status,
      context_tokens: r.contextTokens,
      input_per_1m_usd: r.input,
      output_per_1m_usd: r.output,
      pricing_live: r.live,
      capabilities: r.capabilities,
      tagline: r.tagline,
      best_for: getEditorial(r.id)?.bestFor ?? [],
      mentioned_in: ['frontier-model-routing-without-fable-5'],
      url: `${SITE}/llm-hub/${r.id}`,
    })),
    decision_matrix: DECISION_MATRIX.map((d) => ({
      need: d.constraint,
      pick: d.primaryId,
      runner_up: d.altId ?? null,
      why: d.reason,
    })),
    comparisons: COMPARISONS.map((c) => ({
      slug: c.slug,
      title: c.title,
      verdict: c.verdict,
      models: c.models,
      url: `${SITE}/llm-hub/compare/${c.slug}`,
    })),
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
