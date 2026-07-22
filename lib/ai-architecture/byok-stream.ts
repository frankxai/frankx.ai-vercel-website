/**
 * Shared client helper for the BYOK prototypes. Streams a chat completion
 * through /api/byok/chat (which forwards the user's key to the provider and
 * never persists it) and invokes onDelta for each token chunk.
 *
 * Used by the chat playground, RAG tester, and agent simulator so the three
 * demos share one proven streaming path instead of re-implementing SSE.
 */
export interface ByokMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function streamByokChat(opts: {
  provider: string
  apiKey: string
  messages: ByokMessage[]
  signal?: AbortSignal
  onDelta?: (text: string) => void
}): Promise<string> {
  const { provider, apiKey, messages, signal, onDelta } = opts

  const response = await fetch('/api/byok/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-API-Key': apiKey,
      'X-Provider': provider,
    },
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!response.ok) {
    let message = 'Request failed'
    try {
      const err = await response.json()
      message = err.error || message
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(message)
  }

  const reader = response.body?.getReader()
  if (!reader) return ''

  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6)
      if (data === '[DONE]') continue
      try {
        const parsed = JSON.parse(data)
        if (parsed.content) {
          full += parsed.content
          onDelta?.(parsed.content)
        }
      } catch {
        // skip partial JSON chunks
      }
    }
  }

  return full
}

/**
 * Dependency-free lexical retrieval for the RAG tester demo. Splits text into
 * overlapping chunks and ranks them by query-term overlap. Production RAG uses
 * embeddings + a reranker (see the rag-starter template) — this keeps the
 * in-browser demo provider-agnostic and zero-setup while showing the shape:
 * chunk -> retrieve -> ground -> cite.
 */
export interface RetrievedChunk {
  index: number
  text: string
  score: number
}

export function chunkText(text: string, size = 700, overlap = 120): string[] {
  const clean = text.replace(/\r\n/g, '\n').trim()
  if (!clean) return []
  const chunks: string[] = []
  let start = 0
  while (start < clean.length) {
    const end = Math.min(start + size, clean.length)
    chunks.push(clean.slice(start, end).trim())
    if (end >= clean.length) break
    start = end - overlap
  }
  return chunks.filter(Boolean)
}

export function lexicalRetrieve(query: string, chunks: string[], k = 4): RetrievedChunk[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)
  if (terms.length === 0) return []
  return chunks
    .map((text, index) => {
      const lower = text.toLowerCase()
      let score = 0
      for (const term of terms) {
        const matches = lower.split(term).length - 1
        score += matches
      }
      return { index, text, score }
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}
