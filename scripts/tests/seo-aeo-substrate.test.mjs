import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('ai-architecture child routes emit self-canonicals and blueprint aliases consolidate', async () => {
  const slugPage = await readRepoFile('app/ai-architecture/[slug]/page.tsx')
  assert.match(slugPage, /createMetadata\(/)
  assert.match(slugPage, /path:\s*`\/ai-architecture\/\$\{blueprint\.slug\}`/)

  const aliasPage = await readRepoFile('app/blueprint/[slug]/page.tsx')
  assert.match(aliasPage, /createMetadata\(/)
  assert.match(aliasPage, /canonical:\s*`\$\{siteConfig\.url\}\/ai-architecture\/\$\{blueprint\.slug\}`/)

  for (const child of [
    'blueprints',
    'prototypes',
    'templates',
    'tools',
    'multi-cloud-comparison',
  ]) {
    const layout = await readRepoFile(`app/ai-architecture/${child}/layout.tsx`)
    assert.match(layout, /createMetadata\(/)
    assert.match(layout, new RegExp(`path:\\s*'/ai-architecture/${child}'`))
  }
})

test('blog and guide routes avoid broken /api/og fallback and cap serialized recommendations', async () => {
  const blogPage = await readRepoFile('app/blog/[slug]/page.tsx')
  assert.doesNotMatch(blogPage, /\/api\/og/)
  assert.match(blogPage, /\.slice\(0,\s*6\)/)

  const guidePage = await readRepoFile('app/guides/[slug]/page.tsx')
  assert.doesNotMatch(guidePage, /\/api\/og/)
  assert.match(guidePage, /siteConfig\.ogImage/)
})

test('sitemap excludes draft and noindex blog and guide entries', async () => {
  const sitemap = await readRepoFile('app/sitemap.ts')
  assert.match(sitemap, /data\.draft === true \|\| data\.noindex === true/)
})

test('llms.txt and llms-full.txt expose skills, guides, and canonical ai-architecture routes', async () => {
  const llms = await readRepoFile('app/llms.txt/route.ts')
  assert.match(llms, /\/skills\)/)
  assert.match(llms, /\/guides\)/)
  assert.match(llms, /\/ai-architecture\)/)
  assert.doesNotMatch(llms, /\/ai-architectures\)/)

  const llmsFull = await readRepoFile('app/llms-full.txt/route.ts')
  assert.match(llmsFull, /\/skills\)/)
  assert.match(llmsFull, /\/ai-architecture\//)
  assert.doesNotMatch(llmsFull, /\/api\/og/)
})
