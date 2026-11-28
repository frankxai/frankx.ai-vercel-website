import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { dockClearance } from '../../lib/music-playback.ts'

const source = fs.readFileSync('components/music/MusicRuntime.tsx', 'utf8')
const clearanceCss = fs.readFileSync('app/qa-overlay-clearance.css', 'utf8')

test('reading routes use the corner music chip until the player is opened', () => {
  assert.match(
    source,
    /pathname === '\/library' \|\| pathname\.startsWith\('\/library\/'\)/,
  )
  assert.match(
    source,
    /pathname === '\/blueprints'/,
  )
  assert.match(source, /pathname === amsterdamPath \|\| pathname === fieldNotePath/)
  assert.match(
    source,
    /const collapsedChip = \(isHome \|\| onLibrary \|\| onBooks \|\| onBlueprints \|\| onAmsterdamEdition\) && !expanded/,
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

test('a hidden music dock reserves no end spacer; a visible one reserves its rendered height', () => {
  // display:none (e.g. body:has(.root) on /partnerships/universities) gives an all-zero rect.
  // Before 20 Nov this published 100vh (800px at 1280x800, 812px at 375x812).
  assert.equal(dockClearance({ top: 0, width: 0, height: 0 }, 800), 0)
  assert.equal(dockClearance({ top: 0, width: 0, height: 0 }, 812), 0)
  // Wide dock: 66px tall, 12px (bottom-3) above the viewport edge -> 78px.
  assert.equal(dockClearance({ top: 722, width: 544, height: 66 }, 800), 78)
  assert.equal(dockClearance({ top: 733.5, width: 351, height: 66 }, 812), 79)
  // Never more than the viewport, never negative, never NaN.
  assert.equal(dockClearance({ top: -50, width: 544, height: 900 }, 800), 800)
  assert.equal(dockClearance({ top: 900, width: 544, height: 66 }, 800), 0)
  assert.equal(dockClearance({ top: Number.NaN, width: 544, height: 66 }, 800), 0)

  assert.match(source, /const clearance = dockClearance\(el\.getBoundingClientRect\(\), window\.innerHeight\)/)
  assert.doesNotMatch(source, /Math\.ceil\(window\.innerHeight - rect\.top\)/)
})
