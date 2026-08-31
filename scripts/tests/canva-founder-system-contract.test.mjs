import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relativePath) => fs.readFile(path.join(root, relativePath), 'utf8')

test('the Canva founder hub exposes one governed, agent-readable architecture', async () => {
  const [hub, graph, graphStage, data, route] = await Promise.all([
    read('components/canva/CanvaFounderHub.tsx'),
    read('components/canva/CanvaAgentGraph.tsx'),
    read('components/canva/CanvaGraphStage.tsx'),
    read('data/canva-founder-content.ts'),
    read('app/canva/page.tsx'),
  ])

  assert.match(hub, /canvaArchitectureSteps\.map/)
  assert.match(hub, /md:hidden/)
  assert.match(hub, /CanvaGraphStage/)
  assert.match(hub, /Independent editorial disclosure/)
  assert.match(hub, /\/brand\/canva\/canva-wordmark\.svg/)
  assert.match(hub, /\/canva\/llms\.txt/)
  assert.match(hub, /placement="source-ledger"/)

  assert.match(graph, /ReactFlow/)
  assert.match(graph, /\/brand\/canva\/canva-icon\.svg/)
  assert.match(graph, /canva_architecture_node_opened/)
  assert.match(graph, /nodesDraggable=\{false\}/)
  assert.match(graph, /panOnScroll=\{false\}/)
  assert.match(graph, /zoomOnScroll=\{false\}/)
  assert.match(graph, /preventScrolling=\{false\}/)
  assert.doesNotMatch(graph, /hideAttribution/)
  assert.match(graphStage, /matchMedia\('\(min-width: 768px\)'\)/)
  assert.match(graphStage, /showGraph \? <CanvaAgentGraph \/> : null/)

  const stepKinds = [...data.matchAll(/kind: '(signal|brief|agent|canva|library|review|site|channel|measure)'/g)]
    .map((match) => match[1])
  assert.deepEqual(stepKinds, [
    'signal',
    'brief',
    'agent',
    'canva',
    'library',
    'review',
    'site',
    'channel',
    'measure',
  ])

  assert.match(route, /path: '\/canva'/)
  assert.doesNotMatch(route, /FAQPage/)
})

test('public Canva creative declares the independent relationship', async () => {
  const ogSource = await read('public/images/canva/canva-founder-operating-graph-og.svg')

  assert.match(ogSource, /AN INDEPENDENT FRANKX GUIDE/)
  assert.doesNotMatch(ogSource, /CANVA × FRANKX/)
})

test('official Canva assets retain the verified first-party bytes', async () => {
  const expected = new Map([
    ['public/brand/canva/canva-icon.svg', 'fbbd91cfb0dcc0f9e9eeabc7ea5a6393974167bb06902c27df0b5b50c1fe798f'],
    ['public/brand/canva/canva-wordmark.svg', '6b820e9d8463e3f6e173f5a97a7fd9abb279c7a1a0424f2d484bc6a0d3371860'],
  ])

  for (const [relativePath, digest] of expected) {
    const bytes = await fs.readFile(path.join(root, relativePath))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), digest)
  }
})

test('MCP, outbound, disclosure, and video contracts stay current', async () => {
  const [outbound, redirectRoute, article, guide, llms, affiliateCatalog, blogPage, guidePage] = await Promise.all([
    read('data/outbound-links.ts'),
    read('app/go/[slug]/route.ts'),
    read('content/blog/ultimate-canva-ai-workflow-2026.mdx'),
    read('content/guides/canva-mcp-for-founders.mdx'),
    read('app/canva/llms.txt/route.ts'),
    read('data/affiliate/programs.json'),
    read('app/blog/[slug]/page.tsx'),
    read('app/guides/[slug]/page.tsx'),
  ])

  for (const slug of ['canva', 'canva-mcp', 'canva-mcp-tools', 'canva-brand', 'canva-canvassador', 'canva-youtube']) {
    assert.match(outbound, new RegExp(`slug: '${slug}'`))
  }

  assert.match(redirectRoute, /request\.headers\.get\('dnt'\) === '1'/)
  assert.match(redirectRoute, /request\.headers\.get\('sec-gpc'\) === '1'/)
  assert.doesNotMatch(redirectRoute, /userAgent:\s*request/)

  assert.match(article, /https:\/\/mcp\.canva\.com\/mcp/)
  assert.match(guide, /https:\/\/mcp\.canva\.com\/mcp/)
  assert.equal((article.match(/structuredData=\{false\}/g) || []).length, 2)
  assert.doesNotMatch(article, /\$36|30-day cookie|Impact affiliate/i)

  assert.match(llms, /Google states that it does not use llms\.txt/)
  assert.doesNotMatch(blogPage, /type="FAQPage"/)
  assert.doesNotMatch(guidePage, /FAQPageJsonLd/)

  const programs = JSON.parse(affiliateCatalog)
  const canva = programs.programs.find((program) => program.tool === 'Canva')
  assert.equal(canva.hasProgram, false)
  assert.equal(canva.status, 'closed')
  assert.equal(canva.ourLink, null)
})
