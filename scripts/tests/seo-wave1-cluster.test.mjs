import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { getGuide } from '../../lib/guides.ts'

const ROOT = process.cwd()

test('/skills layout and page expose SKILL.md anatomy, primitive comparison table, and JSON-LD', () => {
  const layout = fs.readFileSync(path.join(ROOT, 'app/skills/layout.tsx'), 'utf8')
  const page = fs.readFileSync(path.join(ROOT, 'app/skills/page.tsx'), 'utf8')

  assert.match(layout, /claude code skills/i)
  assert.match(layout, /path:\s*['"]\/skills['"]/)
  assert.match(page, /type="CollectionPage"/)
  assert.match(page, /type="FAQPage"/)
  assert.match(page, /<table/)
  assert.doesNotMatch(page, /transition-all/)
})

test('ask-questions.ts includes Wave 1 architecture Q&A nodes and zero present-tense Oracle claims', () => {
  const askSrc = fs.readFileSync(path.join(ROOT, 'data/ask-questions.ts'), 'utf8')

  assert.doesNotMatch(askSrc, /I layer these inside Oracle Cloud/i)
  assert.doesNotMatch(askSrc, /I implement at Oracle/i)
  for (const slug of [
    'claude-skills-vs-agents',
    'claude-code-plugins-vs-skills',
    'mcp-vs-a2a',
    'llm-gateway-vs-direct-api',
    'what-is-agentic-ai-architecture',
    'ai-agents-vs-agentic-ai',
  ]) {
    assert.match(askSrc, new RegExp(`slug:\\s*['"]${slug}['"]`), `Missing /ask/${slug}`)
  }
})

test('Wave 1 guides parse valid GuideDecision[] and faqs via lib/guides.ts with no duplicate H1', () => {
  const slugs = [
    'claude-code-templates-starter-kit',
    'claude-code-plugins-vs-skills',
    'mcp-servers-claude-code-business',
    'ai-agent-ready-website-checklist',
    'elevenlabs-voice-guide',
  ]

  for (const slug of slugs) {
    const rel = `content/guides/${slug}.mdx`
    const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    const body = raw.replace(/^---[\s\S]*?---\r?\n/, '')
    assert.doesNotMatch(
      body.replace(/```[\s\S]*?```/g, ''),
      /^#\s+/m,
      `${rel} must not render a duplicate markdown H1 outside code blocks`
    )

    const parsed = getGuide(slug)
    assert.ok(parsed, `getGuide(${slug}) returned null`)
    assert.ok(
      (parsed.decisions?.length ?? 0) >= 3,
      `${slug} expected >= 3 valid GuideDecision rows, got ${parsed.decisions?.length ?? 0}`
    )
    assert.ok(
      (parsed.faqs?.length ?? 0) >= 3,
      `${slug} expected >= 3 valid FAQ rows, got ${parsed.faqs?.length ?? 0}`
    )
  }

  const gatewayPost = fs.readFileSync(
    path.join(ROOT, 'content/blog/llm-gateway-architecture-guide.mdx'),
    'utf8'
  )
  assert.match(gatewayPost, /llm-gateway-architecture-guide-hero\.svg/)
  assert.ok(
    fs.existsSync(path.join(ROOT, 'public/images/blog/llm-gateway-architecture-guide-hero.svg')),
    'Hero SVG for LLM gateway guide must exist'
  )
})
