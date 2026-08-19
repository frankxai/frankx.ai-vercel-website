import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  SHARE_URLS,
  SOCIAL_META,
  socialHandles,
  socialLinks,
} from '../../lib/social-links.ts'

test('blog metadata and sharing use the canonical FrankX identity', () => {
  const articlePage = fs.readFileSync(
    path.join(process.cwd(), 'app/blog/[slug]/page.tsx'),
    'utf8',
  )

  assert.equal(socialLinks.x, 'https://x.com/frankx_ai')
  assert.equal(socialHandles.x, '@frankx_ai')
  assert.equal(SOCIAL_META.creator, '@frankx_ai')
  assert.match(SHARE_URLS.twitter('Article', 'https://frankx.ai/blog/article'), /via=frankx_ai/)
  assert.doesNotMatch(articlePage, /frankxeth/)
  assert.match(articlePage, /import \{ socialLinks \} from '@\/lib\/social-links'/)
  assert.match(articlePage, /socialLinks\.x/)
})

test('active source and metadata contain no retired FrankX X identity', () => {
  const patterns = [
    '*.ts',
    '*.tsx',
    '*.js',
    '*.mjs',
    '*.sh',
    '*.html',
    '*.txt',
    '*.md',
    '*.mdx',
    '*.json',
    '*.yaml',
    '*.yml',
  ]
  const trackedFiles = execFileSync('git', ['ls-files', '-z', '--', ...patterns])
    .toString('utf8')
    .split('\0')
    .filter(Boolean)
    .filter((file) => !file.startsWith('docs/archive/'))
    .filter((file) => file !== 'lib/social-links.ts')
    .filter((file) => file !== 'scripts/tests/social-identity-contract.test.mjs')

  const staleReferences = trackedFiles.flatMap((file) => {
    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
    return content
      .split('\n')
      .map((line, index) => ({ file, line: index + 1, text: line.trim() }))
      .filter(({ text }) => /frankxeth/i.test(text))
  })

  assert.deepEqual(staleReferences, [])
})
