import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { enumerateRoutes, hasAppRoute } from '../../lib/route-enumeration.mjs'

const route = '/partnerships/proposal/uva-rec-impact'
test('unlisted proposal resolves but cannot enter public route discovery', () => {
  assert.equal(hasAppRoute(route), true)
  assert.equal(enumerateRoutes().some(item => item.href === route), false)
})

test('rendered proposal preserves public-safe disclosure and inspectable source', {skip: !process.env.UVA_RENDERED_HTML}, () => {
  const html = fs.readFileSync(process.env.UVA_RENDERED_HTML, 'utf8')
  assert.match(html, /name="robots" content="noindex, nofollow, noarchive, nosnippet"/)
  for (const id of ['opportunity', 'founder', 'systems', 'possibilities', 'pilot', 'conversation']) {
    assert.match(html, new RegExp(`id="${id}"`))
  }
  assert.match(html, /Independent founder-authored proposal\. Not an official UvA partnership\./)
  assert.match(html, /Read the complete Markdown contract/)
  assert.match(html, /\.claude\/agents\/starlight-architecture-design\.md/)
  assert.match(html, /Source and interface audit/)
  assert.doesNotMatch(html, /mail\.google\.com|agentic-ops\/|x-vercel-protection-bypass|vercel\.com\/api/)
})
