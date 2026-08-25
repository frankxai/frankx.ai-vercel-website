import assert from 'node:assert/strict'
import test from 'node:test'

import nextConfig from '../../next.config.mjs'

function getHeader(rule, key) {
  return rule.headers.find((header) => header.key === key)?.value
}

test('static game documents can be embedded only by the FrankX origin', async () => {
  const rules = await nextConfig.headers()
  const siteRule = rules.find((rule) => rule.source === '/((?!palace).*)')
  const gameRule = rules.find((rule) => rule.source === '/games/games/:path*')

  assert.ok(siteRule, 'the site-wide security-header rule must remain present')
  assert.ok(gameRule, 'embedded game documents need a dedicated security-header override')
  assert.ok(
    rules.indexOf(gameRule) > rules.indexOf(siteRule),
    'the game override must follow the site-wide rule so matching headers win',
  )

  const siteCsp = getHeader(siteRule, 'Content-Security-Policy')
  const gameCsp = getHeader(gameRule, 'Content-Security-Policy')

  assert.match(siteCsp, /frame-ancestors 'none'/)
  assert.equal(getHeader(siteRule, 'X-Frame-Options'), 'DENY')
  assert.match(gameCsp, /frame-ancestors 'self'/)
  assert.doesNotMatch(gameCsp, /frame-ancestors 'none'/)
  assert.equal(getHeader(gameRule, 'X-Frame-Options'), 'SAMEORIGIN')
})
