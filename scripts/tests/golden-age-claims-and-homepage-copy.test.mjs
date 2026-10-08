import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const homepage = readFileSync(
  new URL('../../components/home/HomePageElite.tsx', import.meta.url),
  'utf8',
)
const article = readFileSync(
  new URL('../../content/blog/golden-age-of-intelligence.mdx', import.meta.url),
  'utf8',
)
const caseSignals = article.split('### Case Signal Examples')[1].split('### Measurement Dashboard')[0]

test('homepage component is restored and uses the requested hero copy', () => {
  assert.ok(homepage.length > 1000)
  assert.ok(!homepage.startsWith('$file:'))
  assert.ok(homepage.includes('Excellence and agentic operating systems—built'))
})

test('case signals omit unsupported claims, quotes and the unbacked rating', () => {
  assert.doesNotMatch(
    caseSignals,
    /organic traffic up 62%|\+62% traffic|Retention up 38%|\+38% retention|\$2\.3M budget|pipeline value tripled|churn decreased by 33%|Customer satisfaction hit 4\.9\/5|\*\*Quote\*\*/,
  )
  assert.ok(!caseSignals.includes('4.9/5'))
})
