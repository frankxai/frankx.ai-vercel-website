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

test('portrait proof overlay is bounded by the card at narrow widths', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const overlayMarkup = homepage.match(
    /<div\b(?=[^>]*\bdata-home-proof-overlay\b)[^>]*>[\s\S]*?<\/div>/,
  )?.[0]
  const overlayOpenTag = overlayMarkup?.match(/^<div\b[^>]*>/)?.[0]
  const overlayClasses = overlayOpenTag?.match(/\bclassName="([^"]+)"/)?.[1].split(/\s+/) ?? []
  const copyClasses = [...(overlayMarkup?.matchAll(/<p\b[^>]*\bclassName="([^"]+)"[^>]*>/g) ?? [])]
    .map((match) => match[1].split(/\s+/))
    .find((classes) => classes.includes('text-base'))

  assert.ok(overlayMarkup, 'proof overlay must remain addressable')
  for (const token of [
    'absolute',
    'inset-x-0',
    'bottom-0',
    'min-w-0',
    'max-w-full',
    'p-5',
    'min-[360px]:p-6',
    'sm:p-8',
  ]) {
    assert.ok(overlayClasses.includes(token), `proof overlay must retain ${token}`)
  }
  assert.ok(copyClasses?.includes('max-w-full'), 'proof copy must stay bounded at narrow widths')
  assert.ok(copyClasses?.includes('sm:max-w-sm'), 'proof copy must preserve its desktop measure')
})
