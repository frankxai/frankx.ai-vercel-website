import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import nextConfig from '../../next.config.mjs'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
const embedRoot = join(repoRoot, 'public', 'game-embeds')
const legacyGamesRoot = join(repoRoot, 'public', 'games')
const catalogSource = readFileSync(join(repoRoot, 'app', 'games', '[slug]', 'page.tsx'), 'utf8')
const playerSource = readFileSync(
  join(repoRoot, 'app', 'games', '[slug]', 'GamePlayerClient.tsx'),
  'utf8',
)
const tailwindBrowserScript = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'

function getHeader(rule, key) {
  return rule.headers.find((header) => header.key === key)?.value
}

function getDirective(csp, directive) {
  return csp
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(directive + ' '))
}

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right))
}

test('the App Router owns /games and every catalog slug', () => {
  assert.equal(
    existsSync(legacyGamesRoot),
    false,
    'public/games must not exist because static files there shadow app/games routes',
  )

  const catalogSlugs = new Set(
    [...catalogSource.matchAll(/\bslug:\s*'([^']+)'/gu)].map((match) => match[1]),
  )
  const embedSlugs = readdirSync(embedRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== 'assets')
    .map((entry) => entry.name)

  assert.ok(catalogSlugs.size > 0, 'the game catalog parser must find at least one slug')
  assert.deepEqual(sorted(embedSlugs), sorted(catalogSlugs))

  const gameSlugExpression = '$' + '{game.slug}'
  const templateDelimiter = String.fromCharCode(96)
  const expectedIframeSource =
    'src={' + templateDelimiter + '/game-embeds/' + gameSlugExpression +
    '/index.html' + templateDelimiter + '}'
  assert.ok(
    playerSource.includes(expectedIframeSource),
    'the player iframe must use the isolated embed prefix',
  )
  assert.doesNotMatch(playerSource, /\/games\/games\//u)

  for (const slug of embedSlugs) {
    const htmlPath = join(embedRoot, slug, 'index.html')
    assert.ok(existsSync(htmlPath), 'missing embed document for ' + slug)

    const html = readFileSync(htmlPath, 'utf8')
    const externalScripts = [...html.matchAll(
      /<script\b[^>]*\bsrc=["'](https:\/\/[^"']+)["'][^>]*>/giu,
    )].map((match) => match[1])
    assert.deepEqual(
      externalScripts,
      [tailwindBrowserScript],
      slug + ' must load only the explicitly authorized external script',
    )
    assert.doesNotMatch(html, /\/games\/(?:games|assets)\//u)
    assert.doesNotMatch(html, /\.\.\/\.\.\/index\.html/u)

    const assetReferences = [...html.matchAll(
      /\b(?:src|href)=["'](\/game-embeds\/assets\/[^"']+)["']/gu,
    )].map((match) => match[1])
    assert.ok(assetReferences.length >= 2, slug + ' must reference its local bundles')
    for (const assetReference of assetReferences) {
      assert.ok(
        existsSync(join(repoRoot, 'public', assetReference.slice(1))),
        slug + ' references a missing asset: ' + assetReference,
      )
    }
  }

  const legacyHub = readFileSync(join(embedRoot, 'legacy-hub.html'), 'utf8')
  assert.doesNotMatch(legacyHub, /\/games\/(?:games|assets)\//u)
  assert.match(legacyHub, /\/game-embeds\/neuro-matrix\/index\.html/u)
})

test('legacy static game URLs redirect to the isolated embed prefix', async () => {
  const redirects = await nextConfig.redirects()

  assert.deepEqual(
    redirects.find((rule) => rule.source === '/games/index.html'),
    {
      source: '/games/index.html',
      destination: '/games',
      permanent: true,
    },
  )
  assert.deepEqual(
    redirects.find((rule) => rule.source === '/games/games/:path*'),
    {
      source: '/games/games/:path*',
      destination: '/game-embeds/:path*',
      permanent: true,
    },
  )
  assert.deepEqual(
    redirects.find((rule) => rule.source === '/games/:slug/index.html'),
    {
      source: '/games/:slug/index.html',
      destination: '/game-embeds/:slug/index.html',
      permanent: true,
    },
  )
})

test('only relocated game embeds receive same-origin framing and Tailwind script access', async () => {
  const rules = await nextConfig.headers()
  const siteRule = rules.find((rule) => rule.source === '/((?!palace).*)')
  const gameRule = rules.find((rule) => rule.source === '/game-embeds/:path*')

  assert.ok(siteRule, 'the site-wide security-header rule must remain present')
  assert.ok(gameRule, 'embedded game documents need a dedicated security-header override')
  assert.ok(
    rules.indexOf(gameRule) > rules.indexOf(siteRule),
    'the game override must follow the site-wide rule so matching headers win',
  )

  const siteCsp = getHeader(siteRule, 'Content-Security-Policy')
  const gameCsp = getHeader(gameRule, 'Content-Security-Policy')
  const siteScriptSources = getDirective(siteCsp, 'script-src')
  const gameScriptSources = getDirective(gameCsp, 'script-src')

  assert.equal(getDirective(siteCsp, 'frame-ancestors'), "frame-ancestors 'none'")
  assert.equal(getHeader(siteRule, 'X-Frame-Options'), 'DENY')
  assert.doesNotMatch(siteScriptSources, /cdn\.jsdelivr\.net/u)

  assert.equal(getDirective(gameCsp, 'frame-ancestors'), "frame-ancestors 'self'")
  assert.equal(getHeader(gameRule, 'X-Frame-Options'), 'SAMEORIGIN')
  assert.match(gameScriptSources, /https:\/\/cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser@4/u)

  const jsDelivrRules = rules
    .filter((rule) => getHeader(rule, 'Content-Security-Policy')?.includes('cdn.jsdelivr.net'))
    .map((rule) => rule.source)
  assert.deepEqual(jsDelivrRules, ['/game-embeds/:path*'])
})
