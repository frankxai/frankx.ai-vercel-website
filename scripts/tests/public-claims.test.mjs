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
  ['app/about/layout.tsx', ['12K+']],
  ['app/for/creators/layout.tsx', ['12K+']],
  ['app/for/creators/page.tsx', ['12K+']],
  ['app/lab/page.tsx', ['12,000+', '1k+', '12k+']],
  ['app/frankx/page.tsx', ['12,000+', '1,000+']],
  ['app/downloads/preview/vibe-os/page.tsx', ['500+', '12K+']],
  ['components/connect/ConnectHero.tsx', ['12K+']],
  ['app/vibe/VibeOSContent.tsx', ['12K+']],
]

for (const [file, phrases] of banned) {
  test(file + ' does not publish an unsupported headcount', () => {
    const text = fs.readFileSync(path.join(root, file), 'utf8')
    for (const phrase of phrases) {
      assert.equal(text.includes(phrase), false, phrase)
    }
  })
}
