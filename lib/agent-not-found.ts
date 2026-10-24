const SITE = 'https://www.frankx.ai'

type AcceptItem = {
  type: string
  q: number
  index: number
}

export function parseAccept(header: string | null): AcceptItem[] {
  if (!header) return []
  return header
    .split(',')
    .map((part, index) => {
      const [rawType, ...params] = part.split(';').map((piece) => piece.trim())
      let q = 1
      for (const param of params) {
        const [key, value] = param.split('=').map((piece) => piece.trim())
        if (key !== 'q') continue
        const parsed = Number(value)
        q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0
      }
      return { type: rawType.toLowerCase(), q, index }
    })
    .filter((item) => item.type.length > 0)
}

function htmlQuality(items: AcceptItem[]): { q: number; index: number } | null {
  let best: AcceptItem | null = null
  let bestSpecificity = -1
  for (const item of items) {
    let specificity = -1
    if (item.type === 'text/html') {
      specificity = 2
    } else if (item.type === 'text/*') {
      specificity = 1
    } else if (item.type === '*/*') {
      specificity = 0
    }
    if (specificity > bestSpecificity) {
      best = item
      bestSpecificity = specificity
    }
  }
  if (!best || best.q <= 0) return null
  return { q: best.q, index: best.index }
}

/** True when text/markdown is explicitly acceptable and beats text/html (including wildcard ranges). */
export function wantsMarkdownNotFound(header: string | null): boolean {
  const items = parseAccept(header)
  const markdown = items.find((item) => item.type === 'text/markdown')
  if (!markdown || markdown.q <= 0) return false
  const html = htmlQuality(items)
  if (!html) return true
  if (markdown.q !== html.q) return markdown.q > html.q
  return markdown.index < html.index
}

export function displayedPath(pathname: string): string {
  const clean = pathname.split(/[?#]/)[0] ?? '/'
  const safe = clean.replace(/[\u0000-\u001f\u007f`]/g, '').slice(0, 200)
  if (!safe.startsWith('/')) return `/${safe}`
  return safe
}

export function agentNotFoundMarkdown(pathname: string): string {
  const path = displayedPath(pathname)
  return [
    '# Page not found',
    '',
    `No page exists at \`${path}\`.`,
    '',
    'frankx.ai has no document at that URL. Use one of these to find the right page:',
    '',
    `- [Sitemap](${SITE}/sitemap.xml)`,
    `- [Agent index](${SITE}/llms.txt)`,
    `- [Developer notes](${SITE}/developers)`,
    `- [Home](${SITE}/)`,
    '',
  ].join('\n')
}

export function agentNotFoundHeaders(): Headers {
  const headers = new Headers()
  headers.set('Content-Type', 'text/markdown; charset=utf-8')
  headers.set('Vary', 'Accept')
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Cache-Control', 'private, no-store')
  headers.set(
    'Link',
    `<${SITE}/llms.txt>; rel="describedby", <${SITE}/sitemap.xml>; rel="sitemap"`,
  )
  return headers
}

export function agentNotFoundResponse(method: string, pathname: string): Response {
  return new Response(method === 'HEAD' ? null : agentNotFoundMarkdown(pathname), {
    status: 404,
    headers: agentNotFoundHeaders(),
  })
}
