import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (rel) => readFileSync(resolve(root, rel), 'utf8')

test('Higgsfield Workbench component is exported, accessible, and registered', () => {
  const componentContent = read('components/guides/HiggsfieldWorkbench.tsx')
  const mdxComponentsContent = read('components/blog/MDXComponents.tsx')
  const guideContent = read('content/guides/higgsfield-ai-video-guide.mdx')

  // Component structure & accessibility assertions
  assert.match(componentContent, /role="tablist"/)
  assert.match(componentContent, /aria-selected=\{isSelected\}/)
  assert.match(componentContent, /navigator\.clipboard\.writeText/)
  assert.match(componentContent, /\/downloads\/higgsfield-shot-brief\.md/)
  assert.match(componentContent, /\/downloads\/higgsfield-shot-ledger\.csv/)
  assert.match(componentContent, /\/go\/higgsfield/)
  assert.match(componentContent, /Referral Link/)

  // MDX registration
  assert.match(mdxComponentsContent, /import HiggsfieldWorkbench from '@\/components\/guides\/HiggsfieldWorkbench'/)
  assert.match(mdxComponentsContent, /HiggsfieldWorkbench,/)

  // MDX integration in guide
  assert.match(guideContent, /<HiggsfieldWorkbench \/>/)
})

test('Higgsfield Mastery learning path contains verified video attribution and ecosystem links', () => {
  const learningPathsContent = read('data/learning-paths.ts')

  assert.match(learningPathsContent, /id: 'higgsfield-mastery'/)
  assert.match(learningPathsContent, /slug: 'higgsfield-mastery'/)
  assert.match(learningPathsContent, /creator: 'Higgsfield AI'/)
  assert.match(learningPathsContent, /youtubeId: 'tW40b122Rbs'/)
  assert.match(learningPathsContent, /href: '\/go\/higgsfield'/)
  assert.match(learningPathsContent, /href: 'https:\/\/open\.higgsfield\.ai\/'/)
  assert.match(learningPathsContent, /href: 'https:\/\/higgsfield\.ai\/blog\/cinema-studio-4-0'/)
})
