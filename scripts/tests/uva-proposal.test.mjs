import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { experienceCases, collaborationAreas } from '../../content/partnerships/proposals/uva-rec-impact.ts'
import { contractMarkdown } from '../../content/partnerships/proposals/uva-contract-snapshots.ts'
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
  for (const label of ['What can AI do for', 'Campus lab', 'Blind review of both answer sets', 'Affiliate member', 'Past event credits', 'Which canal rules apply here?', 'Can listeners hear the brief?', 'What does one accepted job cost?']) {
    assert.ok(html.includes(label), label)
  }
  assert.doesNotMatch(html, /try\.elevenlabs\.io|[?&]fpr=/)
  assert.match(html, /Read the complete Markdown contract/)
  assert.match(html, /\.claude\/agents\/starlight-architecture-design\.md/)
  assert.match(html, /Source and interface audit/)
  assert.doesNotMatch(html, /mail\.google\.com|agentic-ops\/|x-vercel-protection-bypass|vercel\.com\/api/)
})

test('deployed snapshots preserve every byte of the reviewed public contracts', () => {
  const names = ['starlight-architecture-design', 'research-guardian', 'integrity-guard']
  for (const [index, name] of names.entries()) {
    assert.equal(contractMarkdown[index], fs.readFileSync(`.claude/agents/${name}.md`, 'utf8'))
  }
})


test('experience publication separates attribution and withholds unverified scale', () => {
  const publicCopy = JSON.stringify({ experienceCases, collaborationAreas })
  assert.doesNotMatch(publicCopy, /60\+|500|50[–-]70|BMW|KPN/)
  for (const item of experienceCases) {
    assert.ok(item.boundary && item.proof && item.role)
    assert.ok(item.links.every(link => new URL(link.url).protocol === 'https:'))
  }
  assert.equal(collaborationAreas.length, 3)
})
