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

/** True when the caller explicitly prefers text/markdown over text/html. */
export function wantsMarkdown(header: string | null): boolean {
  const parts = parseAccept(header)
  const markdown = parts.find((part) => part.type === 'text/markdown')
  if (!markdown || markdown.q <= 0) return false
  const html = parts.find((part) => part.type === 'text/html')
  if (!html || html.q <= 0) return true
  if (markdown.q !== html.q) return markdown.q > html.q
  return markdown.index < html.index
}
