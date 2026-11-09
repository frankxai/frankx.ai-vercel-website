// Shared pieces for the zero-subscription search plane: IndexNow submission and
// Google Search Console reads. Pure functions live here so they can be tested
// without network; the two CLIs next to this file do the I/O.
import { createSign } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const SITE_ORIGIN = 'https://www.frankx.ai'
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
export const INDEXNOW_MAX_URLS = 10_000
export const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
export const GSC_MAX_ROWS = 25_000

export function parseSitemap(xml) {
  const isIndex = /<sitemapindex[\s>]/.test(xml)
  const block = isIndex ? 'sitemap' : 'url'
  const entries = []
  for (const m of xml.matchAll(new RegExp(`<${block}>([\\s\\S]*?)</${block}>`, 'g'))) {
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(m[1])?.[1]
    if (!loc) continue
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(m[1])?.[1] ?? null
    entries.push({ loc: decodeXml(loc), lastmod })
  }
  return { isIndex, entries }
}

function decodeXml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
}

// Only content collections whose public URL is a plain function of the file
// name. Anything else (app routes, data files) must be submitted by URL.
const CONTENT_ROUTES = [
  [/^content\/blog\/([^/]+)\.mdx?$/, (slug) => `/blog/${slug}`],
  [/^content\/journal\/([^/]+)\.mdx?$/, (slug) => `/journal/${slug}`],
]

export function contentPathToUrl(path, origin = SITE_ORIGIN) {
  const normalized = path.replace(/\\/g, '/')
  for (const [pattern, route] of CONTENT_ROUTES) {
    const m = pattern.exec(normalized)
    if (m) return origin + route(m[1])
  }
  return null
}

// The key file is public/<key>.txt whose body is exactly <key>.
export function findIndexNowKey(publicDir) {
  for (const name of readdirSync(publicDir)) {
    const m = /^([0-9a-f]{32})\.txt$/.exec(name)
    if (m && readFileSync(join(publicDir, name), 'utf8').trim() === m[1]) return m[1]
  }
  return null
}

export function filterOwnHost(urls, origin = SITE_ORIGIN) {
  const host = new URL(origin).host
  return [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).host === host
    } catch {
      return false
    }
  })
}

export function chunk(list, size) {
  const out = []
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
  return out
}

const b64url = (buf) => Buffer.from(buf).toString('base64url')

// OAuth2 JWT bearer assertion for a Google service account (RFC 7523).
export function buildServiceAccountAssertion(serviceAccount, scope, nowSeconds = Math.floor(Date.now() / 1000)) {
  const { client_email, private_key, token_uri = 'https://oauth2.googleapis.com/token' } = serviceAccount
  if (!client_email || !private_key) throw new Error('service account JSON needs client_email and private_key')
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = b64url(JSON.stringify({ iss: client_email, scope, aud: token_uri, iat: nowSeconds, exp: nowSeconds + 3600 }))
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${claims}`)
  return { assertion: `${header}.${claims}.${b64url(signer.sign(private_key))}`, tokenUri: token_uri }
}

export function isoDaysAgo(days, from = new Date()) {
  const d = new Date(from)
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString().slice(0, 10)
}

// Striking distance: queries Google already shows us for, on page one's edge
// or page two, where a better page moves clicks. Ordered by impressions.
export function strikingDistance(rows, { minImpressions = 20, minPosition = 4, maxPosition = 20 } = {}) {
  return rows
    .filter((r) => r.impressions >= minImpressions && r.position >= minPosition && r.position <= maxPosition)
    .sort((a, b) => b.impressions - a.impressions)
}

// Rows with page-one positions but a CTR well under what that position
// usually earns: the title and description are the fix, not the content.
export function ctrGaps(rows, { minImpressions = 50, maxPosition = 10, ratio = 0.5 } = {}) {
  const expected = (p) => Math.max(0.02, 0.3 / p)
  return rows
    .filter((r) => r.impressions >= minImpressions && r.position <= maxPosition && r.ctr < expected(r.position) * ratio)
    .sort((a, b) => b.impressions - a.impressions)
}

export function toCsv(rows, columns) {
  const cell = (v) => {
    let s = v == null ? '' : String(v)
    // Search queries are untrusted text. These CSVs are for spreadsheet review;
    // rows.json remains the lossless source for programmatic consumers. Follow
    // OWASP's quoted-tab mitigation for Excel, including whitespace/fullwidth
    // formula prefixes. Other spreadsheet importers should import cells as text.
    if (typeof v === 'string' && /^[\s\u0000-\u001f]*[=+\-@\uFF1D\uFF0B\uFF0D\uFF20]/u.test(s)) s = `\t${s}`
    return /[",\r\n\t]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [columns.map(cell).join(','), ...rows.map((r) => columns.map((c) => cell(r[c])).join(','))].join('\n') + '\n'
}
