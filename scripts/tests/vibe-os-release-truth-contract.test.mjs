import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

const surfaceFiles = [
  'app/products/vibe-os/page.tsx',
  'app/products/vibe-os/app/page.tsx',
  'app/products/vibe-os/docs/page.tsx',
  'app/products/vibe-os/components/VibeOSHero.tsx',
  'app/products/vibe-os/components/VibeOSModules.tsx',
  'app/products/vibe-os/components/VibeOSSocialProof.tsx',
  'app/products/vibe-os/components/VibeOSFinalCTA.tsx',
]

test('Vibe OS uses the shared demand capture with product attribution', () => {
  const capture = read('app/products/vibe-os/components/VibeOSFinalCTA.tsx')
  const page = read('app/products/vibe-os/page.tsx')

  assert.match(capture, /<EmailSignup/)
  assert.match(capture, /intent="vibe-os"/)
  assert.match(capture, /intentLabel="Vibe OS"/)
  assert.match(capture, /source="\/products\/vibe-os"/)
  assert.match(capture, /askDemand/)
  assert.match(capture, /id="interest"/)
  assert.match(page, /<VibeOSFinalCTA/)
})

test('every Vibe OS action resolves without the absent download anchor or generic newsletter', () => {
  const source = surfaceFiles.map(read).join('\n')

  assert.doesNotMatch(source, /#download/)
  assert.doesNotMatch(source, /href="\/newsletter"/)
  assert.match(read('app/products/vibe-os/components/VibeOSHero.tsx'), /href="#interest"/)
  assert.match(read('app/products/vibe-os/app/page.tsx'), /href="\/products\/vibe-os#interest"/)
  assert.match(read('app/products/vibe-os/docs/page.tsx'), /href="\/products\/vibe-os#interest"/)
})

test('unreleased Vibe OS surfaces contain no unsupported proof, scarcity, or access claims', () => {
  const source = surfaceFiles.map(read).join('\n')
  const unsupported = [
    /4\.9\/5/i,
    /average rating/i,
    /creators in early access/i,
    /500\+ sessions/i,
    /join hundreds/i,
    /limited availability/i,
    /30-day guarantee/i,
    /instant access/i,
    /aggregateRating/,
    /schema\.org\/InStock/,
  ]

  for (const pattern of unsupported) assert.doesNotMatch(source, pattern)
})
