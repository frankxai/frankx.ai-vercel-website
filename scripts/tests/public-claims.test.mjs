import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const banned = [
  ['app/links/page.tsx', ['10K+ Creators', '500+ AI Songs', '50+ proven templates', 'exclusive creator community']],
  ['app/showcase/page.tsx', ['500+ Suno', '500+ creators', 'Proven Results', 'WCAG 2.2 AAA', 'Sarah Chen']],
  ['app/linktree/page.tsx', ['12K+', '75+', '90+']],
  ['app/linktree/layout.tsx', ['12K+']],
  ['app/linktree/linktree-data.ts', ['75+', '65+', '50+ proven', '38 agents', '35+ commands']],
  ['app/about/layout.tsx', ['12K+', '12,000+']],
  ['app/about/page.tsx', ['12K+', '12,000+', '500+ tracks']],
  ['app/downloads/preview/vibe-os/page.tsx', ['12K+', '500+']],
  ['app/for/creators/layout.tsx', ['12K+', '50+ battle-tested']],
  ['app/for/creators/page.tsx', ['12K+', '70+ tutorials', '70+ Tutorials', '75+ AI Skills']],
  ['app/frankx/page.tsx', ['12K+', '12,000+']],
  ['app/lab/page.tsx', ['12K+', '12,000+', '8+ genres']],
  ['app/vibe/VibeOSContent.tsx', ['12K+', 'Suno sessions']],
  ['components/connect/ConnectHero.tsx', ['12K+']],
  ['components/MobileNavOverlay.tsx', ['12K+', '12,000+']],
  ['components/NavigationMega.tsx', ['12K+', '12,000+']],
]

for (const [file, phrases] of banned) {
  test(file + ' does not publish an unsupported headcount', () => {
    const text = fs.readFileSync(path.join(root, file), 'utf8')
    for (const phrase of phrases) {
      assert.equal(text.includes(phrase), false, phrase)
    }
  })
}
