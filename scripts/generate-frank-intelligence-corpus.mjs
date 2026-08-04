import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import matter from 'gray-matter'
import { PILLARS, enrichedSlot } from '../data/acos/agents.ts'

const ROOT = process.cwd()
const BLOG_DIR = join(ROOT, 'content', 'blog')
const ROUTE_INDEX = join(ROOT, 'data', 'route-index.json')
const OUTPUT = join(ROOT, 'agent', 'lib', 'public-corpus.generated.ts')
const REGISTRY_OUTPUT = join(ROOT, 'agent', 'lib', 'agent-registry.generated.ts')
const META_OUTPUT = join(ROOT, 'data', 'frank-intelligence-corpus-meta.ts')
const AGENT_SOURCE = join(ROOT, 'agent')
const AGENT_RUNTIME = join(ROOT, '.frank-agent-runtime')

const DOMAIN_RULES = {
  architecture: ['ai', 'agent', 'architecture', 'cloud', 'code', 'developer', 'llm', 'model', 'rag', 'mcp', 'automation', 'oracle'],
  creator: ['music', 'suno', 'creator', 'creative', 'story', 'design', 'visual', 'writing', 'brand', 'art', 'song'],
  operator: ['business', 'founder', 'operator', 'product', 'marketing', 'sales', 'launch', 'workflow', 'strategy', 'execution', 'company'],
  vitality: ['health', 'nutrition', 'fitness', 'training', 'sleep', 'recovery', 'energy', 'performance', 'body', 'wellness'],
  perspective: ['mindset', 'purpose', 'grief', 'philosophy', 'consciousness', 'meaning', 'identity', 'soul', 'family', 'life', 'attention'],
}

const FOUNDATION = [
  {
    id: 'foundation:identity',
    url: '/about',
    title: 'Frank Riemer — AI Architect & Creator',
    description: 'The public, approved FrankX identity and authority boundary.',
    section: 'Identity',
    date: '2026-06-25',
    domains: ['architecture', 'creator', 'operator', 'perspective'],
    tags: ['frank', 'identity', 'bio', 'human-first-ai'],
    text: 'Frank Riemer is a musician-technologist, founder of FrankX, and AI Architect & Creator. He has worked around enterprise-scale AI and cloud transformation environments, helped build a seven-figure business with his brother, and turns that pattern recognition into practical AI systems for creators, entrepreneurs, and operators. FrankX is his independent studio for human-first AI systems. His position is simple: AI should help humans create more, think better, and ship work they are proud of.',
  },
  {
    id: 'foundation:origin',
    url: '/agent#origin',
    title: 'Builder before architect',
    description: 'The lived foundation beneath FrankX.',
    section: 'Origin',
    date: '2026-08-04',
    domains: ['operator', 'perspective', 'creator'],
    tags: ['construction', 'father', 'family-business', 'craft', 'grief'],
    text: 'Frank learned building as a child beside his father on construction sites, renovating houses and seeing that good work must hold up in the real world. Losing his father gave the work more depth: systems matter because time is finite and what we build can outlast us. He later helped his brother build a seven-figure business. That lineage connects physical craft, family responsibility, technical architecture, and creative independence.',
  },
  {
    id: 'foundation:enterprise-boundary',
    url: '/agent#boundaries',
    title: 'Enterprise perspective, independent work',
    description: 'How the public agent may use Frank’s enterprise experience.',
    section: 'Boundary',
    date: '2026-06-25',
    domains: ['architecture', 'operator'],
    tags: ['enterprise-ai', 'oracle', 'independence', 'governance'],
    text: 'FrankX translates lessons from enterprise-scale AI and cloud environments into creator- and founder-scale systems: clear architecture, repeatable workflows, governance, human judgment, and a bias toward shipped work. FrankX is independent and is not affiliated with, endorsed by, or sponsored by Oracle. The system must never use confidential material, customer examples, private deal details, internal roadmaps, or unverified deal-size claims.',
  },
  {
    id: 'foundation:music',
    url: '/music',
    title: 'The architect who composes',
    description: 'Music as a working laboratory for human–AI collaboration.',
    section: 'Creative practice',
    date: '2026-07-11',
    domains: ['creator', 'perspective', 'architecture'],
    tags: ['music', 'twelve-thousand-songs', 'systems', 'human-ai-collaboration'],
    text: 'Frank has created more than 12,000 AI-assisted songs through systematic production. Music is not a side project; it is the laboratory where iteration, taste, emotion, and human–AI collaboration are tested at scale. The principle is not more output for its own sake. Build an instrument that helps a person hear and refine their own voice.',
  },
  {
    id: 'foundation:vitality',
    url: '/peak-performance',
    title: 'Whole-person performance',
    description: 'The public vitality and high-performance boundary.',
    section: 'Vitality',
    date: '2026-08-04',
    domains: ['vitality', 'perspective', 'operator'],
    tags: ['nutrition', 'training', 'recovery', 'mindset', 'performance'],
    text: 'FrankX treats performance as a whole system: nutrition, training, recovery, attention, creative work, relationships, and meaning affect one another. Advice should be practical, evidence-aware, and humble. It may support reflection and general education, but it must not diagnose conditions, prescribe treatment, or replace a qualified health professional.',
  },
  {
    id: 'foundation:taste',
    url: '/design',
    title: 'Taste is part of the architecture',
    description: 'Design, aesthetics, and story as functional system constraints.',
    section: 'Taste',
    date: '2026-07-12',
    domains: ['creator', 'architecture', 'operator'],
    tags: ['design', 'aesthetics', 'storytelling', 'restraint', 'craft'],
    text: 'FrankX treats design taste, aesthetics, and storytelling as part of the system rather than decoration applied at the end. Strong work has hierarchy, restraint, a clear emotional register, and proof that survives inspection. The goal is not generic futurism. It is technology that feels authored, useful, and unmistakably human.',
  },
]

function plainText(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^import .*$/gm, ' ')
    .replace(/^export .*$/gm, ' ')
    .replace(/[#{|}>*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferDomains(...values) {
  const haystack = values.flat().join(' ').toLowerCase()
  const matches = Object.entries(DOMAIN_RULES)
    .filter(([, words]) => words.some((word) => haystack.includes(word)))
    .map(([domain]) => domain)
  return matches.length > 0 ? matches : ['general']
}

function chunkSection(text, maxLength = 1800) {
  const paragraphs = text.split(/\n\s*\n/).map(plainText).filter(Boolean)
  const chunks = []
  let current = ''

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxLength) {
      if (current) chunks.push(current)
      current = ''
      for (let start = 0; start < paragraph.length; start += maxLength) {
        chunks.push(paragraph.slice(start, start + maxLength).trim())
      }
      continue
    }

    const joined = current ? `${current}\n\n${paragraph}` : paragraph
    if (joined.length > maxLength && current) {
      chunks.push(current)
      current = paragraph
    } else {
      current = joined
    }
  }

  if (current) chunks.push(current)
  return chunks
}

function blogRecords() {
  const records = []
  const sourceParts = []
  const files = readdirSync(BLOG_DIR).filter((name) => name.endsWith('.mdx')).sort()

  for (const file of files) {
    const raw = readFileSync(join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    if (data.draft === true || data.published === false) continue

    const slug = file.replace(/\.mdx$/, '')
    const title = plainText(data.title || slug.replaceAll('-', ' '))
    const description = plainText(data.description || data.excerpt || data.tldr)
    const tags = Array.isArray(data.tags) ? data.tags.map(plainText).filter(Boolean) : []
    const date = plainText(data.lastUpdated || data.lastModified || data.date || data.publishedAt)
    const sections = content.split(/\n(?=##?\s+)/)
    let index = 0

    for (const sectionBody of sections) {
      const heading = plainText(sectionBody.match(/^#{1,3}\s+(.+)$/m)?.[1] || title)
      for (const chunk of chunkSection(sectionBody)) {
        if (chunk.length < 120) continue
        records.push({
          id: `blog:${slug}:${String(index).padStart(3, '0')}`,
          url: `/blog/${slug}`,
          title,
          description,
          section: heading,
          date,
          domains: inferDomains(title, description, heading, tags),
          tags,
          text: chunk,
        })
        index += 1
      }
    }
    sourceParts.push(raw)
  }

  return { records, sourceParts, publishedPostCount: sourceParts.length }
}

function routeRecords() {
  const raw = readFileSync(ROUTE_INDEX, 'utf8')
  const parsed = JSON.parse(raw)
  const excluded = /^\/(?:admin|api|auth|checkout|dashboard|magic|realm|thank-you|unsubscribe)(?:\/|$)/
  const records = parsed.routes
    .filter((route) => route.href?.startsWith('/') && !excluded.test(route.href) && route.type !== 'blog')
    .filter((route) => route.title || route.description)
    .map((route) => {
      const title = plainText(route.title || route.href)
      const description = plainText(route.description)
      const tags = Array.isArray(route.tags) ? route.tags.map(plainText).filter(Boolean) : []
      return {
        id: `route:${route.href}`,
        url: route.href,
        title,
        description,
        section: 'Public page',
        date: '',
        domains: inferDomains(title, description, tags, route.href),
        tags,
        text: [title, description, tags.join(', ')].filter(Boolean).join('. '),
      }
    })

  return { records, raw }
}

function materializeAgentRuntime() {
  rmSync(AGENT_RUNTIME, { recursive: true, force: true })
  cpSync(AGENT_SOURCE, AGENT_RUNTIME, {
    recursive: true,
    filter: (source) => !source.endsWith('.json'),
  })
}

function writeIfChanged(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  const previous = existsSync(path) ? readFileSync(path, 'utf8') : ''
  if (previous !== content) writeFileSync(path, content, 'utf8')
}

function main() {
  const blog = blogRecords()
  const routes = routeRecords()
  const records = [...FOUNDATION, ...blog.records, ...routes.records]
  const fingerprint = createHash('sha256')
    .update(blog.sourceParts.join('\n---SOURCE---\n'))
    .update(routes.raw)
    .update(JSON.stringify(FOUNDATION))
    .digest('hex')
    .slice(0, 16)

  const payload = {
    version: 1,
    fingerprint,
    publishedPostCount: blog.publishedPostCount,
    publicRouteCount: routes.records.length,
    recordCount: records.length,
    records,
  }
  const output = `// Generated by scripts/generate-frank-intelligence-corpus.mjs. Do not edit.\nconst corpus: unknown = ${JSON.stringify(payload)}\n\nexport default corpus\n`
  const registryOutput = `// Generated by scripts/generate-frank-intelligence-corpus.mjs. Do not edit.\nexport type PublicAgentStatus = 'shipped' | 'in-progress' | 'gap'\nexport type PublicAgentTier = 'haiku' | 'sonnet' | 'opus'\nexport interface PublicAgentRegistrySlot {\n  name: string\n  kind: 'skill' | 'command' | 'agent' | 'mcp'\n  ref?: string\n  status: PublicAgentStatus\n  tier?: PublicAgentTier\n  gates?: { dispatchable: boolean; tested: boolean; composed: boolean; brand_gated: boolean }\n  one_liner: string\n}\nexport interface PublicAgentRegistryPillar {\n  id: string\n  number: number\n  title: string\n  tagline: string\n  specialists: PublicAgentRegistrySlot[]\n}\nexport const publicAgentRegistry: PublicAgentRegistryPillar[] = ${JSON.stringify(PILLARS.map((pillar) => ({
    id: pillar.id,
    number: pillar.number,
    title: pillar.title,
    tagline: pillar.tagline,
    specialists: pillar.specialists.map(enrichedSlot),
  })))}\n`
  const metaOutput = `// Generated by scripts/generate-frank-intelligence-corpus.mjs. Do not edit.\nexport const frankIntelligenceCorpusMeta = ${JSON.stringify({
    version: payload.version,
    fingerprint: payload.fingerprint,
    publishedPostCount: payload.publishedPostCount,
    publicRouteCount: payload.publicRouteCount,
    recordCount: payload.recordCount,
  })} as const\n`

  writeIfChanged(OUTPUT, output)
  writeIfChanged(REGISTRY_OUTPUT, registryOutput)
  writeIfChanged(META_OUTPUT, metaOutput)
  materializeAgentRuntime()
  console.log(`Frank Intelligence corpus: ${blog.publishedPostCount} posts, ${routes.records.length} routes, ${records.length} records (${fingerprint})`)
}

main()
