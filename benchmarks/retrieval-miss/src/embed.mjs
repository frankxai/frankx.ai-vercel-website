// OpenAI embeddings via global fetch (Node 18+). BYOK: the key comes from the
// environment and is never persisted or logged. No dependencies.

const ENDPOINT = 'https://api.openai.com/v1/embeddings'

// Rough token estimate for the cost receipt (~4 chars/token). The benchmark
// reports this alongside the price you pass in, so the dollar figure is
// reproducible and you can see exactly what produced it.
export function estimateTokens(texts) {
  return texts.reduce((s, t) => s + Math.ceil(t.length / 4), 0)
}

export async function embedBatch(texts, apiKey, model = 'text-embedding-3-small') {
  if (!apiKey) throw new Error('OPENAI_API_KEY is required for dense/hybrid retrieval.')
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, input: texts }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Embeddings API error ${res.status}: ${body.slice(0, 300)}`)
  }
  const json = await res.json()
  return json.data.map((d) => d.embedding)
}

export function cosine(a, b) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1)
}

// Rank corpus ids by cosine similarity to the query vector (best first).
export function denseRank(queryVec, corpusVecs, ids) {
  return corpusVecs
    .map((v, i) => ({ id: ids[i], score: cosine(queryVec, v) }))
    .sort((a, b) => b.score - a.score)
    .map((s) => s.id)
}

// Reciprocal Rank Fusion of multiple ranked id-lists.
export function rrf(rankings, k = 60) {
  const score = new Map()
  for (const ranking of rankings) {
    ranking.forEach((id, idx) => {
      score.set(id, (score.get(id) || 0) + 1 / (k + idx + 1))
    })
  }
  return [...score.entries()].sort((a, b) => b[1] - a[1]).map((e) => e[0])
}
