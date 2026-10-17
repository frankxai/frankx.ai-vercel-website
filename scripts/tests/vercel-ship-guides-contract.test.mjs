import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { enumerateRoutes } from '../../lib/route-enumeration.mjs'
import { getAllGuides, getGuide } from '../../lib/guides.ts'
import { extractFAQFromBody, generateSchemaForFile } from '../generate-schema.mjs'

const jsonLdSource = readFileSync(new URL('../../components/seo/JsonLd.tsx', import.meta.url), 'utf8')
const faqFnStart = jsonLdSource.indexOf('export function buildFAQPageData')
const faqFnEnd = jsonLdSource.indexOf('export function buildHowToData')
assert.ok(faqFnStart > 0 && faqFnEnd > faqFnStart, 'shipped buildFAQPageData must stay in JsonLd.tsx')
const { buildFAQPageData } = await import(
  `data:text/javascript,${encodeURIComponent(
    `${stripTypeScriptTypes(jsonLdSource.slice(faqFnStart, faqFnEnd))}\n`,
  )}`
)

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const guideSlugs = ['vercel-ship-2026-recap', 'vercel-agent-runtime-decisions']
const blogSlug = 'vercel-ship-2026-builder-decisions'
const preservedSlug = 'founder-ai-stack-2026'

const sourcedThemes = [
  ['AI SDK', 'https://vercel.com/blog/agent-stack'],
  ['AI Gateway', 'https://vercel.com/blog/agent-stack'],
  ['Workflow SDK', 'https://vercel.com/blog/agent-stack'],
  ['Vercel Sandbox', 'https://vercel.com/blog/agent-stack'],
  ['Chat SDK', 'https://vercel.com/blog/agent-stack'],
  ['long-lived', 'https://vercel.com/changelog/vercel-connect-ga'],
  ['Dockerfile', 'https://vercel.com/blog/dockerfile-on-vercel'],
  ['Vercel Services', 'https://vercel.com/docs/services'],
  ['Vercel Agent', 'https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta'],
  ['Python', 'https://vercel.com/changelog/python-on-vercel-is-now-generally-available'],
  ['Daemons', 'https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta'],
  ['Drives', 'https://vercel.com/changelog/vercel-drives-is-now-generally-available'],
  ['MCP Events', 'https://vercel.com/changelog/mcp-events-support-in-vercel-connect-is-now-in-public-beta'],
]

const audiences = [
  'Founders',
  'AI architects',
  'Creators',
  'SaaS and agent-platform builders',
]

function readRepo(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8')
}

test('new guides are loaded, indexed, and old guide slugs still resolve', () => {
  const listed = getAllGuides().map((guide) => guide.slug)
  for (const slug of guideSlugs) {
    assert.ok(listed.includes(slug), `${slug} missing from getAllGuides`)
    const guide = getGuide(slug)
    assert.ok(guide, `${slug} missing from getGuide`)
    assert.equal(guide.slug, slug)
    assert.ok(guide.title.length > 10)
    assert.ok(guide.description.length > 40)
  }

  const preserved = getGuide(preservedSlug)
  assert.ok(preserved)
  assert.match(preserved.title, /Founder/)

  const hrefs = new Set(enumerateRoutes().map((route) => route.href))
  for (const slug of guideSlugs) assert.ok(hrefs.has(`/guides/${slug}`))
  assert.ok(hrefs.has(`/blog/${blogSlug}`))
  assert.ok(hrefs.has(`/guides/${preservedSlug}`))
})

test('ship and runtime guides carry sourced themes, four audience calls, videos, and matching FAQ schema', () => {
  const guides = guideSlugs.map((slug) => getGuide(slug))
  const combined = guides.map((guide) => guide.content).join('\n')
  for (const [phrase, url] of sourcedThemes) {
    assert.ok(combined.includes(phrase), `missing theme ${phrase}`)
    assert.ok(combined.includes(url), `missing citation ${url}`)
  }

  const recap = getGuide('vercel-ship-2026-recap')
  assert.doesNotMatch(recap.content, /San Francisco was still ahead/)
  assert.doesNotMatch(recap.content, /A merge waits for a person/)
  assert.doesNotMatch(recap.content, /microservices a first-class/)
  assert.match(recap.content, /London, Berlin, New York, Sydney, and San Francisco/)
  assert.match(recap.content, /frontend and backend deploy together/)
  assert.match(recap.content, /surface pull requests/)
  assert.match(recap.content, /Arthur Viegers/)
  assert.match(recap.content, /60-70% of low-risk pull requests/)

  const runtime = getGuide('vercel-agent-runtime-decisions')
  assert.equal(runtime.decisions.length, 4)
  for (const audience of audiences) {
    const row = runtime.decisions.find((decision) => decision.audience === audience)
    assert.ok(row, `missing decision for ${audience}`)
    assert.ok(['adopt', 'wait', 'skip'].includes(row.call))
    assert.match(row.source, /^https:\/\/vercel\.com\//)
    assert.ok(row.because.length > 40)
  }
  assert.equal(new Set(runtime.decisions.map((row) => row.audience)).size, 4)

  const page = readRepo('app/guides/[slug]/page.tsx')
  const matrix = readRepo('components/guides/AudienceDecisionMatrix.tsx')
  assert.match(page, /AudienceDecisionMatrix decisions=\{guide\.decisions\}/)
  assert.match(page, /buildFAQPageData\(guide\.faqs\)/)
  assert.match(page, /guide\.faqs\.map\(\(faq\)/)
  assert.match(matrix, /id="decision-matrix"/)
  assert.match(matrix, /scroll-mt-24/)
  assert.doesNotMatch(matrix, /fetch\(|axios|fs\./)

  for (const guide of guides) {
    assert.ok(guide.video)
    assert.match(guide.video.url, /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{6,}$/)
    assert.doesNotMatch(guide.video.url, /example\.com|placeholder|TODO|changeme/i)
    assert.ok(guide.video.title.length > 8)
    assert.ok(guide.content.includes(guide.video.title))
    assert.ok(guide.content.includes(guide.video.url))
    assert.ok(guide.faqs.length >= 4)

    const schema = buildFAQPageData(guide.faqs)
    assert.equal(schema.mainEntity.length, guide.faqs.length)
    guide.faqs.forEach((faq, index) => {
      assert.equal(schema.mainEntity[index].name, faq.question)
      assert.equal(schema.mainEntity[index].acceptedAnswer.text, faq.answer)
    })

    assert.ok(guide.content.includes('/blog/vercel-ship-2026-builder-decisions'))
    assert.ok(guide.content.includes('/guides/vercel-agent-runtime-decisions#decision-matrix') || guide.content.includes('#decision-matrix'))
  }
})

test('the skill map is crawlable, linked from related pages, and the primary videos stay real', () => {
  const recap = getGuide('vercel-ship-2026-recap')
  assert.match(recap.content, /<GuideSkillMap/)
  assert.match(recap.content, /id="skill-map"|#skill-map/)
  for (const skill of ['AI SDK', 'AI Gateway', 'Workflow SDK', 'Vercel Sandbox', 'Chat SDK', 'Vercel Connect', 'Python', 'Vercel Drives', 'Vercel Daemons', 'Vercel Agent']) {
    assert.ok(recap.content.includes(skill), `skill map missing ${skill}`)
  }
  assert.match(recap.content, /https:\/\/www\.youtube\.com\/watch\?v=Fr5vzNknYJE/)
  assert.match(recap.content, /https:\/\/www\.youtube\.com\/watch\?v=T1vs9jE-EEI/)
  assert.match(recap.content, /https:\/\/www\.youtube\.com\/watch\?v=w6bjGDwn4ZY/)
  assert.doesNotMatch(recap.content, /structuredData=\{false\}/)

  const map = readRepo('components/guides/GuideSkillMap.tsx')
  assert.match(map, /id="skill-map"/)
  assert.match(map, /scroll-mt-28/)
  assert.doesNotMatch(map, /fetch\(|axios|fs\./)
  assert.match(readRepo('components/blog/MDXComponents.tsx'), /GuideSkillMap/)

  for (const relativePath of [
    'content/guides/founder-ai-stack-2026.mdx',
    'content/guides/vercel-agent-runtime-decisions.mdx',
    'content/blog/vercel-ship-2026-builder-decisions.mdx',
    'content/blog/ai-architecture-2026-four-decisions-hard-to-reverse.mdx',
    'content/blog/best-ai-app-builders-2026.mdx',
    'content/blog/vercel-ai-sdk-first-agent-stack.mdx',
  ]) {
    assert.ok(readRepo(relativePath).includes('/guides/vercel-ship-2026-recap#skill-map'), `${relativePath} missing skill-map link`)
  }
})

test('the blog post cross-links the guides and the matrix, and its FAQ schema matches the body', async () => {
  const filepath = path.join(root, 'content', 'blog', `${blogSlug}.mdx`)
  const source = readFileSync(filepath, 'utf8')
  assert.match(source, /^faqSource: "body"$/m)
  assert.doesNotMatch(source, /examines core production patterns/i)
  assert.ok(source.includes('/guides/vercel-ship-2026-recap'))
  assert.ok(source.includes('/guides/vercel-agent-runtime-decisions'))
  assert.ok(source.includes('/guides/vercel-agent-runtime-decisions#decision-matrix'))
  assert.match(source, /https:\/\/www\.youtube\.com\/watch\?v=w6bjGDwn4ZY/)
  assert.ok(source.includes('Opening Keynote - Ship 26 NYC'))

  const bodyFaqs = extractFAQFromBody(source)
  const generated = await generateSchemaForFile(filepath)
  const faqSchema = generated.schema['@graph'].find((entry) => entry['@type'] === 'FAQPage')
  const schemaFaqs = faqSchema.mainEntity.map((entity) => ({
    question: entity.name,
    answer: entity.acceptedAnswer.text,
  }))
  assert.ok(bodyFaqs.length >= 4)
  assert.deepEqual(schemaFaqs, bodyFaqs)

  const blogPage = readRepo('app/blog/[slug]/page.tsx')
  assert.match(blogPage, /BodyFaqSchema source=\{post\.content\}/)
  assert.doesNotMatch(blogPage, /type="FAQPage"/)
})
