import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

import {
  extractFAQFromBody,
  generateSchemaForFile,
  normalizeFAQText,
} from '../generate-schema.mjs'

const clusterFiles = [
  'graph-engineering-ai-agents.mdx',
  'multi-agent-orchestration-patterns-2026.mdx',
  'stanford-cs329z-engineering-ai-agents.mdx',
  'stanford-mstar-walk-graph.mdx',
  'graph-engineering-claude-code.mdx',
  'graph-engineering-openai-codex.mdx',
  'graph-engineering-hermes-agent.mdx',
  'graph-engineering-grok-build.mdx',
  'graph-engineering-antigravity-adk.mdx',
]

test('FAQ plain-text normalization removes MDX syntax without damaging names', () => {
  assert.equal(normalizeFAQText(undefined), '')
  assert.equal(normalizeFAQText('What is M\\* and `AGENTS.md`?'), 'What is M* and AGENTS.md?')
  assert.equal(
    normalizeFAQText('Read the [official workflow guide](https://example.com) for **details**.'),
    'Read the official workflow guide for details.',
  )
})

for (const filename of clusterFiles) {
  test(`${filename} generates one body-derived FAQ schema`, async () => {
    const filepath = path.join(process.cwd(), 'content', 'blog', filename)
    const source = await fs.readFile(filepath, 'utf8')
    const bodyFaqs = extractFAQFromBody(source)
    const generated = await generateSchemaForFile(filepath)
    const faqSchema = generated.schema['@graph'].find((entry) => entry['@type'] === 'FAQPage')
    const schemaFaqs = faqSchema.mainEntity.map((entity) => ({
      question: entity.name,
      answer: entity.acceptedAnswer.text,
    }))

    assert.match(source, /^faqSource: "body"$/m)
    assert.ok(bodyFaqs.length >= 5)
    assert.deepEqual(schemaFaqs, bodyFaqs)
    assert.equal(new Set(schemaFaqs.map((faq) => faq.question.toLocaleLowerCase('en-US'))).size, schemaFaqs.length)

    for (const faq of schemaFaqs) {
      assert.doesNotMatch(faq.question, /\[[^\]]+\]\([^)]+\)|`|\\[*_`]/)
      assert.doesNotMatch(faq.answer, /\[[^\]]+\]\([^)]+\)|`|\\[*_`]/)
    }
  })
}
