import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('homepage repository proof derives from the canonical social registry', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')

  assert.match(homepage, /import \{ socialLinks \} from '@\/lib\/social-links'/)
  assert.match(homepage, /href: `\$\{socialLinks\.github\}\/agentic-creator-os`/)
  assert.doesNotMatch(homepage, /https:\/\/github\.com\/frankxai/)
})

test('homepage release evidence is portable and records the verified ship state', async () => {
  const rawEvidence = await readRepoFile('docs/premium-web-os/frankx-production-home-design-loop-evidence.json')
  const evidence = JSON.parse(rawEvidence)
  const mobileCheck = evidence.checks.find((check) => check.name === 'mobile-first-viewport')

  assert.doesNotMatch(rawEvidence, /[A-Za-z]:[\\/](?:Users|home)[\\/]/)
  assert.equal(mobileCheck?.status, 'pass')
  assert.equal(evidence.score.total, 28)
  assert.equal(evidence.score.max, 30)
  assert.equal(evidence.decision, 'ship')
  assert.ok(evidence.artifacts.every((artifact) => !artifact.path_or_url.startsWith('file:')))
})
