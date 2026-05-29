import { getAllGenModels, getCategories, getOrg } from '@/lib/models-hub/registry'

export const revalidate = 3600

/**
 * /models.json — agent-readable surface for the multimodal Generative Model Hub.
 * The same curated intelligence as the human pages, as clean structured JSON.
 * Companion to /llm-hub.json (text LLMs).
 */
export async function GET() {
  const SITE = 'https://frankx.ai'
  const categories = getCategories()
  const models = getAllGenModels()

  const payload = {
    _meta: {
      name: 'FrankX Generative Model Hub',
      description:
        'Curated decision layer over multimodal generative AI — image, video, music, voice, embeddings, world models. The deciding, not the doing. Built for humans and agents.',
      url: `${SITE}/models`,
      updated: '2026-05-29',
      engine_note:
        'This is an intelligence layer, not a generator. Generation in the FrankX ecosystem runs via arcanea-studio (200+ models) and tools like Suno, Nano Banana, Higgsfield, Veo.',
      text_models: `${SITE}/llm-hub.json`,
      pricing_note: 'Multimodal models price per image/second/minute. Figures are indicative and vendor-reported; verify with the provider.',
      sources: ['https://artificialanalysis.ai', 'https://openrouter.ai/models'],
    },
    categories: categories.map((c) => ({
      id: c.id,
      label: c.label,
      tagline: c.tagline,
      blurb: c.blurb,
      url: `${SITE}/models/${c.id}`,
      model_count: models.filter((m) => m.category === c.id).length,
    })),
    models: models.map((m) => ({
      id: m.id,
      name: m.name,
      category: m.category,
      provider: getOrg(m.organization)?.name || m.organization,
      released: m.released,
      status: m.status,
      io: m.io,
      license: m.license,
      tagline: m.tagline,
      highlight: m.highlight,
      best_for: m.best_for ?? [],
      pricing_note: m.pricing_note,
      access: m.access ?? [],
      url: `${SITE}/models/${m.category}/${m.id}`,
      sources: m.sources ?? [],
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
