import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const home = readFileSync(new URL('../../components/home/HomePageElite.tsx', import.meta.url), 'utf8')

test('homepage Music Lab copy drops the invented workflow and instrument claims', () => {
  for (const claim of [
    'Suno production workflows',
    'genre-focused frequency field guides',
    'eyebrow="AI music production"',
    'Suno prompt systems',
    'playable instruments',
    'built from daily studio practice',
  ]) {
    assert.ok(!home.includes(claim), claim)
  }
  assert.ok(home.includes('A working archive of AI songs and production notes, built from studio practice.'))
})

test('an empty proof-room eyebrow renders no empty paragraph', () => {
  assert.ok(home.includes('{eyebrow ? ('))
})
