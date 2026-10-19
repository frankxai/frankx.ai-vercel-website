type AcceptPart = { type: string; q: number; index: number }

export function parseAccept(header: string | null): AcceptPart[] {
  if (!header) return []
  return header
    .split(',')
    .map((part, index) => {
      const [typeRaw, ...params] = part.split(';').map((piece) => piece.trim())
      let q = 1
      for (const param of params) {
        const [key, value] = param.split('=').map((piece) => piece.trim())
        if (key !== 'q') continue
        const parsed = Number(value)
        q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0
      }
      return { type: (typeRaw ?? '').toLowerCase(), q, index }
    })
    .filter((part) => part.type.length > 0)
}

// RFC 9110: a concrete type overrides type/*, which overrides */*.
// q=0 on the winning range rejects the type; a later broader range cannot revive it.
function rangeSpecificity(type: string): number {
  if (type === '*/*') return 0
  if (type.endsWith('/*')) return 1
  return 2
}

function rangeMatches(range: string, mediaType: string): boolean {
  if (range === '*/*') return true
  const slash = range.indexOf('/')
  if (slash <= 0) return false
  const major = range.slice(0, slash)
  const minor = range.slice(slash + 1)
  if (minor === '*') return mediaType.startsWith(`${major}/`)
  return range === mediaType
}

function mediaQuality(parts: AcceptPart[], mediaType: string): { q: number; index: number } | null {
  let best: AcceptPart | null = null
  let bestSpecificity = -1
  for (const part of parts) {
    if (!rangeMatches(part.type, mediaType)) continue
    const specificity = rangeSpecificity(part.type)
    // Same specificity keeps the earlier range, so equal-q order stays the header order.
    if (specificity > bestSpecificity) {
      best = part
      bestSpecificity = specificity
    }
  }
  if (!best || best.q <= 0) return null
  return { q: best.q, index: best.index }
}

/** True when text/markdown outranks text/html, including wildcard ranges. */
export function wantsMarkdown(header: string | null): boolean {
  const parts = parseAccept(header)
  const markdown = mediaQuality(parts, 'text/markdown')
  if (!markdown) return false
  const html = mediaQuality(parts, 'text/html')
  if (!html) return true
  if (markdown.q !== html.q) return markdown.q > html.q
  return markdown.index < html.index
}
