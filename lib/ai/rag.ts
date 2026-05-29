/**
 * Semantic retrieval for the Studio Crew chat.
 *
 * Backed by Upstash Vector using its BUILT-IN embedding model — we upsert and
 * query raw text (`data`), and Upstash embeds server-side. That means no
 * separate embedding API call, no vector-dimension bookkeeping, and one fewer
 * key to manage.
 *
 * Graceful degradation: when UPSTASH_VECTOR_REST_URL is absent (local dev,
 * preview without the addon, or before the index is built) semanticSearch
 * returns null and callers fall back to the Lunr lexical index in knowledge.ts.
 * The chat keeps working everywhere; RAG simply turns on once the index exists.
 */

import { Index } from '@upstash/vector'

export interface RagHit {
  id: string
  score: number
  title: string
  href: string
  type: string
  snippet: string
}

export interface RagChunkMetadata {
  title: string
  href: string
  type: string
  text: string
  [key: string]: unknown
}

const VECTOR_AVAILABLE = !!(
  process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN
)

let indexSingleton: Index | null = null

export function isRagAvailable(): boolean {
  return VECTOR_AVAILABLE
}

export function getVectorIndex(): Index | null {
  if (!VECTOR_AVAILABLE) return null
  if (!indexSingleton) {
    indexSingleton = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
    })
  }
  return indexSingleton
}

/**
 * Semantic search over Frank's indexed content. Returns ranked hits with a
 * short snippet for grounding, or null when the vector index is unavailable
 * (caller should fall back to lexical search).
 */
export async function semanticSearch(
  query: string,
  opts: { topK?: number; minScore?: number; types?: string[] } = {}
): Promise<RagHit[] | null> {
  const index = getVectorIndex()
  if (!index) return null

  const topK = opts.topK ?? 6
  const minScore = opts.minScore ?? 0.7

  try {
    const filter =
      opts.types && opts.types.length > 0
        ? opts.types.map((t) => `type = '${t.replace(/'/g, "")}'`).join(' OR ')
        : undefined

    const results = await index.query({
      data: query,
      topK,
      includeMetadata: true,
      ...(filter ? { filter } : {}),
    })

    const hits: RagHit[] = []
    const seenHref = new Set<string>()
    for (const r of results) {
      const meta = (r.metadata || {}) as Partial<RagChunkMetadata>
      if (typeof r.score === 'number' && r.score < minScore) continue
      if (!meta.title || !meta.href) continue
      // Collapse multiple chunks of the same page to its best-scoring chunk.
      if (seenHref.has(meta.href)) continue
      seenHref.add(meta.href)
      hits.push({
        id: String(r.id),
        score: typeof r.score === 'number' ? r.score : 0,
        title: meta.title,
        href: meta.href,
        type: meta.type || 'blog',
        snippet: (meta.text || '').slice(0, 480),
      })
    }
    return hits
  } catch (err) {
    console.error('[rag] semanticSearch failed:', (err as Error).message)
    return null
  }
}
