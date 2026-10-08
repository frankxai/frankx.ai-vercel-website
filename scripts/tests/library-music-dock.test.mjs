import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const source = fs.readFileSync('components/music/MusicRuntime.tsx', 'utf8')
const clearanceCss = fs.readFileSync('app/qa-overlay-clearance.css', 'utf8')

test('the library uses the corner music chip until the player is opened', () => {
  assert.match(
    source,
    /pathname === '\/library' \|\| pathname\.startsWith\('\/library\/'\)/,
  )
  assert.match(
    source,
    /const collapsedChip = \(isHome \|\| onLibrary\) && !expanded/,
  )
  assert.match(
    source,
    /collapsedChip\s*\?\s*'fixed bottom-3 right-3 z-50 flex h-12 w-12/,
  )
  assert.equal(source.includes('homeCollapsedChip'), false)
  assert.match(source, /scrollPaddingBottom/)

  // Assert library shelf clears the collapsed chip
  assert.match(
    clearanceCss,
    /padding-bottom:\s*calc\(\s*var\(--music-chip-reserve,\s*4\.75rem\)\s*\+\s*env\(safe-area-inset-bottom,\s*0px\)\s*\);/,
  )
})
