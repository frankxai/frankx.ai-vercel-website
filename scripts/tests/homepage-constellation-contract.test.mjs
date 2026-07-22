import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (filePath) => readFile(new URL(`../../${filePath}`, import.meta.url), 'utf8')

test('homepage leads with the FrankX identity promise and preserves the full constellation', async () => {
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')
  const constellation = await readRepoFile('components/home/HomeConstellationSections.tsx')

  assert.match(homepage, />\s*Build what matters\.\s*</)
  assert.match(homepage, /public workshop where I share the systems, evidence, creative practices/)
  assert.match(homepage, /<StartFromSituation \/>/)
  assert.match(homepage, /<HubConstellation \/>/)
  assert.match(homepage, /<CurrentKnowledge \/>/)
  assert.match(homepage, /<HumanSystems \/>/)
  assert.match(homepage, /<WorkAndConversation \/>/)

  for (const world of ['Music', 'GenCreators', 'Learn', 'Build', 'Explore', 'Blog']) {
    assert.match(constellation, new RegExp(`title: '${world}'`))
  }
  for (const supportingWorld of ['Research Library', 'Guides', 'Books', 'Library', 'ACOS', 'Studio', 'Foundry', 'Partnerships']) {
    assert.match(constellation, new RegExp(`label: '${supportingWorld}'`))
  }
  assert.match(constellation, /\/guides\/agentic-obsidian-second-brain/)
  assert.match(constellation, /The work behind the work\./)
  assert.doesNotMatch(`${homepage}\n${constellation}`, /\/become\b/)
})

test('top-level navigation labels and destinations remain locked', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const expected = [
    ['music', 'Music', '/music'],
    ['gencreators', 'GenCreators', '/gencreator'],
    ['learn', 'Learn', '/learn'],
    ['build', 'Build', '/ai-architecture'],
    ['explore', 'Explore', '/resources'],
  ]

  for (const [key, label, href] of expected) {
    assert.match(
      navigation,
      new RegExp(`${key}: \\{[\\s\\S]*?label: '${label}'[\\s\\S]*?href: '${href}'`),
    )
  }
  assert.match(navigation, /href="\/blog"/)
})

test('priority navigation copy contains no stale quantity or price claims', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const homepagePage = await readRepoFile('app/page.tsx')
  const publicCopy = `${navigation}\n${homepagePage}`

  for (const staleClaim of [/12,000\+/, /12K\+/, /411K\+/, /\$29-199/, /130\+ curated/, /Acquire for paid tools/]) {
    assert.doesNotMatch(publicCopy, staleClaim)
  }
})

test('homepage filters dynamic covers against the verified asset registry', async () => {
  const homepagePage = await readRepoFile('app/page.tsx')

  assert.match(homepagePage, /assetRegistry from '@\/data\/site-experience\/asset-registry\.json'/)
  assert.match(homepagePage, /verifiedPublicAssets\.has\(assetPath\)/)
  assert.doesNotMatch(homepagePage, /existsSync/)
  assert.match(homepagePage, /hasRenderablePublicAsset/)
  assert.match(homepagePage, /hasRenderablePublicAsset\(book\.coverImage\)/)
  assert.match(homepagePage, /hasRenderablePublicAsset\(review\.coverImage\)/)
})
