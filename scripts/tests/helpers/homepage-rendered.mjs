// Server-rendered homepage, for behavioural contracts.
//
// The homepage contracts used to match exact source text in
// components/home/** (function names, class strings, JSX snippets). That froze
// the implementation: a performance refactor that kept every visible behaviour
// still failed the contract. These helpers read what a visitor and a crawler
// actually receive instead, the HTML from a production build, so the component
// tree underneath is free to change.
//
// Where the HTML comes from, in order:
//   1. HOMEPAGE_HTML_FILE, an explicit file (useful for a saved preview).
//   2. The prerendered route Next writes for `/` in a production build.
//   3. A `next start` of the existing build, if `/` stopped being prerendered.
// Without a build there is nothing honest to assert, so the rendered tests
// skip with a reason. HOMEPAGE_RENDERED_REQUIRED=1 turns that skip into a
// failure; CI sets it on the step that runs after its production build.
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { existsSync, readFileSync, statSync } from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { startNextServer, stopManagedProcess } from './managed-next-process.mjs'

export const rootDirectory = fileURLToPath(new URL('../../..', import.meta.url))
const distDirectory = path.join(rootDirectory, '.next')
const prerenderedHomepage = path.join(distDirectory, 'server', 'app', 'index.html')
export const renderedRequired = process.env.HOMEPAGE_RENDERED_REQUIRED === '1'

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function getAvailablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  return port
}

async function fetchFromNextStart() {
  const port = await getAvailablePort()
  const child = startNextServer({ cwd: rootDirectory, port })
  let output = ''
  child.stdout?.on('data', (chunk) => (output += chunk))
  child.stderr?.on('data', (chunk) => (output += chunk))
  try {
    for (let attempt = 0; attempt < 300; attempt += 1) {
      if (child.spawnError) throw new Error(`next start failed to spawn: ${child.spawnError.message}`)
      if (child.exitCode !== null) throw new Error(`next start exited (code ${child.exitCode}):\n${output}`)
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`)
        if (response.ok) return await response.text()
      } catch {
        // Not listening yet.
      }
      await delay(100)
    }
    throw new Error(`next start did not serve / in time:\n${output}`)
  } finally {
    await stopManagedProcess(child)
  }
}

let cached
/** @returns {Promise<{ html: string, source: string } | null>} */
export function loadHomepageHtml() {
  cached ??= (async () => {
    if (process.env.HOMEPAGE_HTML_FILE) {
      return { html: readFileSync(process.env.HOMEPAGE_HTML_FILE, 'utf8'), source: process.env.HOMEPAGE_HTML_FILE }
    }
    if (existsSync(prerenderedHomepage)) {
      return { html: readFileSync(prerenderedHomepage, 'utf8'), source: 'prerendered /' }
    }
    if (existsSync(path.join(distDirectory, 'BUILD_ID'))) {
      return { html: await fetchFromNextStart(), source: 'next start /' }
    }
    return null
  })()
  return cached
}

const SKIP_REASON =
  'no production build: run `pnpm run build` first (CI runs these after its build step with HOMEPAGE_RENDERED_REQUIRED=1)'

/**
 * A test against the server-rendered homepage document. Skips without a build
 * unless HOMEPAGE_RENDERED_REQUIRED=1.
 */
export function renderedTest(name, fn) {
  test(name, async (t) => {
    const loaded = await loadHomepageHtml()
    if (!loaded) {
      assert.ok(!renderedRequired, `HOMEPAGE_RENDERED_REQUIRED=1 but ${SKIP_REASON}`)
      t.skip(SKIP_REASON)
      return
    }
    await fn(parseHtml(loaded.html), loaded)
  })
}

// ---------------------------------------------------------------------------
// A small, dependency-free HTML tree. React's server output is well formed, so
// this needs void elements, raw-text elements and attribute quoting, nothing
// more. It is not a general HTML parser.
// ---------------------------------------------------------------------------

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
])
const RAW_TEXT = new Set(['script', 'style', 'textarea', 'title'])
const TOKEN_RE = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|[^<]+|</gi
const ATTR_RE = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', ldquo: '\u201c', rdquo: '\u201d', lsquo: '\u2018', rsquo: '\u2019', mdash: '\u2014', ndash: '\u2013', middot: '\u00b7', hellip: '\u2026' }
export const decodeEntities = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, body) => {
    if (body[0] === '#') {
      const code = body[1].toLowerCase() === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole
    }
    return ENTITIES[body.toLowerCase()] ?? whole
  })

function parseAttributes(source) {
  const attrs = {}
  for (const match of source.matchAll(ATTR_RE)) {
    const value = match[2] ?? match[3] ?? match[4] ?? ''
    attrs[match[1].toLowerCase()] = decodeEntities(value)
  }
  return attrs
}

export function parseHtml(html) {
  const root = { tag: '#document', attrs: {}, children: [], parent: null }
  const stack = [root]
  const top = () => stack[stack.length - 1]
  TOKEN_RE.lastIndex = 0
  let match
  while ((match = TOKEN_RE.exec(html))) {
    const [token, closeTag, openTag, rawAttrs] = match
    if (token.startsWith('<!')) continue
    if (closeTag) {
      const tag = closeTag.toLowerCase()
      const index = stack.findLastIndex((node) => node.tag === tag)
      if (index > 0) stack.length = index
      continue
    }
    if (openTag) {
      const tag = openTag.toLowerCase()
      const selfClosing = /\/\s*$/.test(rawAttrs)
      const node = { tag, attrs: parseAttributes(rawAttrs.replace(/\/\s*$/, '')), children: [], parent: top() }
      top().children.push(node)
      if (RAW_TEXT.has(tag) && !selfClosing) {
        const end = html.toLowerCase().indexOf(`</${tag}`, TOKEN_RE.lastIndex)
        const stop = end === -1 ? html.length : end
        node.raw = html.slice(TOKEN_RE.lastIndex, stop)
        node.children.push({ text: tag === 'script' || tag === 'style' ? '' : decodeEntities(node.raw), parent: node })
        const close = html.indexOf('>', stop)
        TOKEN_RE.lastIndex = close === -1 ? html.length : close + 1
        continue
      }
      if (!VOID.has(tag) && !selfClosing) stack.push(node)
      continue
    }
    top().children.push({ text: decodeEntities(token), parent: top() })
  }
  return root
}

export const isElement = (node) => Boolean(node?.tag)

export function* descendants(node) {
  for (const child of node.children ?? []) {
    if (!isElement(child)) continue
    yield child
    yield* descendants(child)
  }
}

export const findAll = (node, predicate) => [...descendants(node)].filter(predicate)
export const find = (node, predicate) => {
  for (const element of descendants(node)) if (predicate(element)) return element
  return undefined
}
export const byTag = (tag) => (node) => node.tag === tag

export function closest(node, predicate) {
  for (let current = node?.parent; current; current = current.parent) {
    if (isElement(current) && predicate(current)) return current
  }
  return undefined
}

export const contains = (ancestor, node) => {
  for (let current = node; current; current = current.parent) if (current === ancestor) return true
  return false
}

export const normalise = (text) => text.replace(/\s+/g, ' ').trim()

export function textContent(node) {
  if (!isElement(node)) return node.text ?? ''
  if (node.tag === 'br') return '\n'
  if (node.tag === 'script' || node.tag === 'style') return ''
  return node.children.map(textContent).join('')
}

export const classTokens = (node) => (node.attrs.class ?? '').split(/\s+/).filter(Boolean)

/** The smallest element whose normalised text includes `text`. */
export function elementWithText(scope, text, predicate = () => true) {
  let best
  for (const element of descendants(scope)) {
    if (!predicate(element) || !normalise(textContent(element)).includes(text)) continue
    best = element
  }
  return best
}

/** All JSON-LD objects in the document, flattened through @graph. */
export function jsonLd(document) {
  const out = []
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit)
    if (value && typeof value === 'object') {
      out.push(value)
      if (value['@graph']) visit(value['@graph'])
    }
  }
  for (const script of findAll(document, (node) => node.tag === 'script' && node.attrs.type === 'application/ld+json')) {
    try {
      visit(JSON.parse(script.raw))
    } catch {
      // A malformed block is its own failure elsewhere; ignore it here.
    }
  }
  return out
}

/** The section that holds the page's only H1, i.e. the hero. */
export function heroOf(document) {
  const headings = findAll(document, byTag('h1'))
  assert.equal(headings.length, 1, `the homepage must render exactly one <h1>, found ${headings.length}`)
  const hero = closest(headings[0], (node) => node.tag === 'section') ?? closest(headings[0], (node) => node.tag === 'main')
  assert.ok(hero, 'the <h1> must sit inside the hero section')
  return { h1: headings[0], hero }
}

/** Opacity of a `text-white/NN` token, 100 for `text-white`, or undefined. */
export function whiteTextOpacity(node) {
  for (const token of classTokens(node)) {
    if (token === 'text-white') return 100
    const match = token.match(/^text-white\/(?:\[(0?\.\d+)\]|(\d{1,3}))$/)
    if (match) return match[1] ? Math.round(Number(match[1]) * 100) : Number(match[2])
  }
  return undefined
}

// ---------------------------------------------------------------------------
// Source the homepage actually ships. Some guarantees (what happens after
// hydration, under reduced motion, on a coarse pointer) are not visible in the
// server HTML. Those are checked as invariants over every module the homepage
// entry imports from components/home, wherever it lives and whatever it is
// called, so the rule follows the code instead of pinning a file or a name.
// ---------------------------------------------------------------------------

const resolveImport = (fromFile, specifier) => {
  let base
  if (specifier.startsWith('@/')) base = path.join(rootDirectory, specifier.slice(2))
  else if (specifier.startsWith('.')) base = path.resolve(path.dirname(fromFile), specifier)
  else return undefined
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, path.join(base, 'index.tsx'), path.join(base, 'index.ts')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  return undefined
}

/** Every components/home module reachable from the homepage entry, with its source. */
export function homepageModules() {
  const homeDirectory = path.join(rootDirectory, 'components', 'home') + path.sep
  const entry = path.join(rootDirectory, 'app', 'page.tsx')
  const seen = new Map()
  const queue = [entry]
  while (queue.length > 0) {
    const file = queue.shift()
    if (seen.has(file)) continue
    const source = readFileSync(file, 'utf8')
    seen.set(file, source)
    for (const match of source.matchAll(/(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      const resolved = resolveImport(file, match[1] ?? match[2])
      if (resolved && resolved.startsWith(homeDirectory)) queue.push(resolved)
    }
  }
  seen.delete(entry)
  return [...seen].map(([file, source]) => ({ file: path.relative(rootDirectory, file).split(path.sep).join('/'), source }))
}

