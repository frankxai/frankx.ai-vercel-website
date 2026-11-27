import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import pngjs from 'pngjs'

export async function comparePrimaryAction(expectedPath, screenshot) {
  const expected = pngjs.PNG.sync.read(await readFile(expectedPath))
  const actual = pngjs.PNG.sync.read(screenshot)
  assert.deepEqual([actual.width, actual.height], [expected.width, expected.height],
    'Aurora primary action dimensions changed: ' + expectedPath)
  let changed = 0
  for (let index = 0; index < actual.data.length; index += 4) {
    // Tolerate small edge-antialiasing differences between Linux renderers.
    const distance = Math.max(...actual.data.subarray(index, index + 4)
      .map((value, channel) => Math.abs(value - expected.data[index + channel])))
    if (distance > 32) changed++
  }
  const fraction = changed / (actual.width * actual.height)
  assert.ok(fraction <= 0.02, 'Aurora primary action differs in ' +
    (100 * fraction).toFixed(2) + '% of pixels: ' + expectedPath)
  return fraction
}
