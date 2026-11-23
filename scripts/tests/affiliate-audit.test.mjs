import assert from 'node:assert/strict'
import test from 'node:test'
import { inspectArticle } from '../affiliate-audit.mjs'

const now = new Date('2026-11-23T12:00:00Z')
const elevenLabs = {
  tool: 'ElevenLabs',
  aliases: ['elevenlabs'],
  hasProgram: true,
  status: 'active',
  checkedOn: '2026-11-05',
  verifiedOn: '2026-11-05',
  evidence: 'first-party',
  useHop: true,
  ourLink: 'https://partner.example/issued',
}

test('a catalog link does not count as an article placement', () => {
  const result = inspectArticle(
    'I tested ElevenLabs. [Docs](https://elevenlabs.io) and [example](https://external.example/go/elevenlabs).',
    [elevenLabs],
    now,
  )
  assert.deepEqual(result.placements, [])
  assert.deepEqual(result.opportunities, ['ElevenLabs'])
})

test('matches literal tool aliases that contain regex punctuation', () => {
  const program = { ...elevenLabs, aliases: ['Voice AI (Pro)'] }
  const result = inspectArticle('I tested Voice AI (Pro).', [program], now)
  assert.deepEqual(result.opportunities, ['ElevenLabs'])
})

test('recognizes the published hop, exact issued URL and configured MDX component', () => {
  const source = [
    '[Try ElevenLabs](https://www.frankx.ai/go/elevenlabs?src=guide)',
    '[Partner link](https://partner.example/issued)',
    '<ArticleRecommendation affiliateId="elevenlabs">Test</ArticleRecommendation>',
  ].join('\n')
  assert.deepEqual(inspectArticle(source, [elevenLabs], now).placements, [
    { tool: 'ElevenLabs', forms: ['hop', 'issued URL', 'component'], state: 'eligible' },
  ])
})

test('ignores examples and drafts and asks for review of a stale hop', () => {
  const examples = [
    '<!-- [try](/go/elevenlabs) -->',
    '~~~mdx',
    '<ArticleRecommendation affiliateId="elevenlabs" />',
    '~~~',
    '![image](/go/elevenlabs)',
    'An ElevenLabs mention.',
  ].join('\n')
  assert.deepEqual(inspectArticle(examples, [elevenLabs], now).placements, [])
  assert.equal(inspectArticle('---\ndraft: true\n---\nElevenLabs', [elevenLabs], now), null)
  const stale = { ...elevenLabs, checkedOn: '2026-08-01' }
  assert.deepEqual(inspectArticle('[try](/go/elevenlabs)', [stale], now).placements, [
    { tool: 'ElevenLabs', forms: ['hop'], state: 'review destination' },
  ])
})
