import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('friends/ana remains the public collaboration hub with guides and updates', async () => {
  const page = await read('app/friends/ana/page.tsx')
  assert.match(page, /path: '\/friends\/ana'/)
  assert.match(page, /noindex: true/)
  assert.match(page, /Guides &amp; updates|Guides & updates|ana-guides-title/)
  assert.match(page, /Codex Plugins/)
  assert.match(page, /Obsidian Second Brain/)
  assert.match(page, /agentic powered business|agentic business/i)
  assert.match(page, /anaLinks\.codexPluginsGuide/)
  assert.match(page, /anaLinks\.obsidianSecondBrainGuide/)
  assert.doesNotMatch(page, /redirect\('\/allies\/ana-cancino'\)/)
})

test('portal and legacy aliases route into the Ana suite without public indexing leakage', async () => {
  const portal = await read('app/portal/ana/page.tsx')
  const aliases = JSON.parse(await read('data/redirect-aliases.json')).aliases
  const links = await read('data/ana-collaboration.ts')

  assert.match(portal, /redirect\('\/(friends\/ana|allies\/ana-cancino)'\)/)
  assert.match(links, /friendPage: '\/friends\/ana'/)
  assert.match(links, /teamPlan: '\/allies\/ana-cancino'/)
  assert.match(links, /codexPluginsGuide: '\/blog\/codex-plugins-for-teams'/)
  assert.match(links, /obsidianSecondBrainGuide: '\/blog\/obsidian-second-brain-guide'/)

  for (const alias of ['/ais', '/ana', '/ana-intelligence-system']) {
    assert.ok(
      aliases[alias] === '/friends/ana' || aliases[alias] === '/allies/ana-cancino',
      `${alias} must resolve into the Ana suite`,
    )
  }
})

test('the generic Codex team article contains no Ana-specific material', async () => {
  const article = await read('content/blog/codex-plugins-for-teams.mdx')
  assert.doesNotMatch(article, /Ana Cancino|Ana Cecilia|ana-hr-operations|ana-ai-business-kit|Cecilia/i)
})

test('the Obsidian Second Brain guide links the friends hub', async () => {
  const article = await read('content/blog/obsidian-second-brain-guide.mdx')
  assert.match(article, /\/friends\/ana/)
  assert.match(article, /frankx\.ai\/friends\/ana|friends\/ana/)
  assert.match(article, /Codex Plugins for Teams/)
})
