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
  assert.match(page, /anaLinks\.codexPluginsGuide/)
  assert.doesNotMatch(page, /Obsidian Second Brain|obsidianSecondBrainGuide/)
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

test('the Ana install panel links the method to official Codex plugins and team learning', async () => {
  const component = await read('components/ana/AnaPluginInstall.tsx')
  const links = await read('data/ana-collaboration.ts')

  assert.match(component, /Choose the team plugin stack/)
  assert.match(component, /Browse official plugins/)
  assert.match(links, /OFFICIAL-CODEX-PLUGIN-STACK\.md/)
  assert.match(links, /codex:\/\/plugins\/install\/\?marketplace=openai-curated/)
  assert.match(links, /codex:\/\/plugins\/ana-hr-operations@ana-business-kit/)
})
