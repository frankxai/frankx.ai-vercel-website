// Minimal BM25 (Okapi) over an in-memory corpus. No dependencies.
// Used as the lexical leg of the hybrid retriever in the retrieval-miss benchmark.

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are',
  'was', 'were', 'be', 'with', 'as', 'by', 'at', 'it', 'this', 'that', 'from',
])

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
}

export class BM25 {
  constructor(docs, { k1 = 1.5, b = 0.75 } = {}) {
    this.k1 = k1
    this.b = b
    this.docs = docs.map((d) => tokenize(d.text))
    this.ids = docs.map((d) => d.id)
    this.N = docs.length
    this.avgdl = this.docs.reduce((s, d) => s + d.length, 0) / Math.max(1, this.N)

    // document frequency per term
    this.df = new Map()
    for (const toks of this.docs) {
      for (const t of new Set(toks)) this.df.set(t, (this.df.get(t) || 0) + 1)
    }
    // term frequency per document
    this.tf = this.docs.map((toks) => {
      const m = new Map()
      for (const t of toks) m.set(t, (m.get(t) || 0) + 1)
      return m
    })
  }

  idf(term) {
    const n = this.df.get(term) || 0
    // BM25 idf with +1 to stay non-negative
    return Math.log(1 + (this.N - n + 0.5) / (n + 0.5))
  }

  // Returns ranked doc ids (best first) for a query string.
  rank(query) {
    const qToks = tokenize(query)
    const scores = this.docs.map((toks, i) => {
      const dl = toks.length
      let score = 0
      for (const t of qToks) {
        const f = this.tf[i].get(t) || 0
        if (f === 0) continue
        const idf = this.idf(t)
        const denom = f + this.k1 * (1 - this.b + (this.b * dl) / this.avgdl)
        score += idf * ((f * (this.k1 + 1)) / denom)
      }
      return { id: this.ids[i], score }
    })
    return scores.sort((a, b) => b.score - a.score).map((s) => s.id)
  }
}
