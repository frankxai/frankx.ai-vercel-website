import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const home = readFileSync(new URL('../../components/home/HomePageElite.tsx', import.meta.url), 'utf8')

test('homepage Music Lab copy drops the invented workflow, frequency and daily claims', () => {
  for (const claim of [
    'Suno production workflows',
    'genre-focused frequency field guides',
    'eyebrow="AI music production"',
    'Suno prompt systems',
    'daily studio practice',
    'Public music room and studio notes.',
  ]) {
    assert.ok(!home.includes(claim), claim)
  }
})

test('homepage Music Lab copy describes the playable browser instruments /music-lab ships', () => {
  assert.ok(
    home.includes(
      "description: 'Playable browser instruments (violin, piano, drums, and pads) with guided notes and tabs.',",
    ),
  )
  assert.ok(
    home.includes(
      'description="Playable browser instruments (violin, piano, drums, and pads) with guided notes and tabs, next to a working archive of AI songs and production notes."',
    ),
  )
})

test('the Music Lab proof room keeps a factual eyebrow above its heading', () => {
  assert.match(home, /eyebrow="Browser instruments"\s+title="Music Lab"/)
  assert.ok(!home.includes('eyebrow=""'))
})
