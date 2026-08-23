import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('game player iframe uses the clean URL Vercel actually serves', async () => {
  const player = await read('app/games/[slug]/GamePlayerClient.tsx')

  assert.match(player, /src=\{`\/games\/games\/\$\{game\.slug\}`\}/)
  assert.doesNotMatch(
    player,
    /\/games\/games\/\$\{game\.slug\}\/index\.html/,
    'index.html 308s under vercel.json cleanUrls and inherits frame-ancestors none',
  )
})

test('same-origin game shells can be framed; the rest of the site cannot', async () => {
  const config = await read('next.config.mjs')
  const gameBlockStart = config.indexOf("source: '/games/games/:path*'")
  const palaceBlockStart = config.indexOf("source: '/palace/:path*'")

  assert.match(
    config,
    /source: '\/\(\(\?!palace\|games\/games\)\.\*\)'/,
    'site-wide CSP must exclude /games/games, not only /palace',
  )
  assert.ok(gameBlockStart >= 0, 'dedicated /games/games header block is required')
  assert.ok(
    palaceBlockStart > gameBlockStart,
    'game header block must exist as its own source, not as a comment',
  )

  const gameBlock = config.slice(gameBlockStart, palaceBlockStart)
  assert.match(gameBlock, /frame-ancestors 'self'/)
  assert.match(gameBlock, /X-Frame-Options[\s\S]*SAMEORIGIN/)
  assert.match(
    gameBlock,
    /cdn\.jsdelivr\.net/,
    'game HTML loads Tailwind from jsdelivr; without it the shells render unstyled',
  )
  assert.doesNotMatch(gameBlock, /frame-ancestors 'none'/)

  const siteWide = config.slice(
    config.indexOf("source: '/((?!palace|games/games).*)'"),
    gameBlockStart,
  )
  assert.match(siteWide, /frame-ancestors 'none'/)
})
