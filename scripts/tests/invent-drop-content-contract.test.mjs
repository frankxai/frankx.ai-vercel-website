import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const readRepoFile = (file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

test('homepage drops invented music counts from the hero copy', () => {
  const homepage = readRepoFile('components/home/HomePageElite.tsx')

  assert.match(homepage, /Excellence and agentic operating systems—built/)
  assert.doesNotMatch(homepage, /twelve thousand|12,000\+ AI songs|630\+ AI skills/i)
})

test('golden age article drops specified invented metrics and retains wellness satisfaction', () => {
  const article = readRepoFile('content/blog/golden-age-of-intelligence.mdx')

  for (const inventedMetric of [
    /organic traffic up 62%/i,
    /\+62% traffic/i,
    /\$2\.3M/i,
    /retention up 38%/i,
    /\+38% retention/i,
    /churn decreased by 33%/i,
    /pipeline value tripled/i,
  ]) {
    assert.doesNotMatch(article, inventedMetric)
  }

  assert.match(article, /Signal 7: Wellness Startup[\s\S]*?4\.9\/5/)
  assert.doesNotMatch(article, /Secured launched/)
})
