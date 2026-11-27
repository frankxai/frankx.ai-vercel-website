import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire, register } from 'node:module'
import { test } from 'node:test'
import { runInThisContext } from 'node:vm'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

register('./support/app-module-hooks.mjs', import.meta.url)
const seo = await import('../../lib/seo.ts')
const require = createRequire(import.meta.url)

function loadPage(route) {
  const file = new URL(`../../app/checkout/${route}/page.tsx`, import.meta.url)
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    fileName: file.pathname,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  })
  const exports = {}
  const load = runInThisContext(`(function (exports, require) { ${outputText}\n })`, { filename: file.pathname })
  load(exports, (id) => id === '@/lib/seo' ? seo : require(id))
  return exports
}

for (const route of ['success', 'cancel']) {
  test(`/${route} is a checkout return, never a payment or delivery receipt`, () => {
    const page = loadPage(route)
    assert.equal(page.metadata.robots?.index, false)
    for (const params of [{}, { session_id: 'unverified-reference', paid: 'true' }]) {
      const html = renderToStaticMarkup(createElement(page.default, { searchParams: Promise.resolve(params) }))
      assert.match(html, /href="mailto:frank@frankx.ai"/)
      assert.match(html, /href="\/products"/)
      const text = [html, page.metadata.title, page.metadata.description].join(' ')
      assert.doesNotMatch(text, /purchase successful|no charges were made|has been sent|cart is still waiting|your resources are ready|unverified-reference/i)
    }
  })
}
