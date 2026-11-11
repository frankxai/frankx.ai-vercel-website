import assert from 'node:assert/strict'
import test from 'node:test'

import {
  TOC_PANEL_CLOSED_TRANSLATE,
  TOC_PANEL_OPEN_TRANSLATE,
  tocPanelInertProps,
  tocPanelTranslateClass,
} from '../../app/golden-age/lib/tocPanel.ts'

test('closed translate clears the right-6 sliver and stays put at lg+', () => {
  assert.equal(
    tocPanelTranslateClass(false),
    'translate-x-[calc(100%+1.5rem)] lg:translate-x-0',
  )
  assert.equal(TOC_PANEL_CLOSED_TRANSLATE, tocPanelTranslateClass(false))
  assert.ok(!TOC_PANEL_CLOSED_TRANSLATE.includes('translate-x-full'))
  assert.ok(TOC_PANEL_CLOSED_TRANSLATE.includes('lg:translate-x-0'))
})

test('open translate is on-screen at every breakpoint', () => {
  assert.equal(tocPanelTranslateClass(true), 'translate-x-0')
  assert.equal(TOC_PANEL_OPEN_TRANSLATE, 'translate-x-0')
})

test('inert and aria-hidden apply only to the closed mobile instance', () => {
  const mobileClosed = tocPanelInertProps('mobile', false)
  assert.equal(mobileClosed.inert, true)
  assert.equal(mobileClosed['aria-hidden'], true)

  const mobileOpen = tocPanelInertProps('mobile', true)
  assert.equal('inert' in mobileOpen, false)
  assert.equal('aria-hidden' in mobileOpen, false)

  // Desktop must stay focusable even when isOpen is false (no mobile toggle).
  const desktopClosed = tocPanelInertProps('desktop', false)
  assert.deepEqual(desktopClosed, {})
  const desktopOpen = tocPanelInertProps('desktop', true)
  assert.deepEqual(desktopOpen, {})
})
