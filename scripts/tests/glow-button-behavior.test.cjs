const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

// Exercise component event contracts without starting Next or a browser.
function render(props, { reduced = false, fine = true } = {}) {
  let pointerMoves = 0
  const modules = {
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    'framer-motion': { useReducedMotion: () => reduced },
    '@/lib/hooks/useMouseGlow': { useMouseGlow: () => ({ cardRef: {}, glowRef: {}, handlers: { onPointerMove: () => pointerMoves++, onPointerLeave() {} } }) },
    'next/link': { default: 'Link' },
    '@/lib/utils': { cn: (...values) => values.filter(Boolean).join(' ') },
  }
  const source = fs.readFileSync(path.resolve(__dirname, '../../components/ui/GlowButton.tsx'), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } })
  const sandbox = { exports: {}, require: name => {
    assert.ok(name in modules, `Unexpected dependency: ${name}`)
    return modules[name]
  }, window: { matchMedia: () => ({ matches: fine }) } }
  vm.runInNewContext(outputText, sandbox)
  return { element: sandbox.exports.GlowButton({ children: 'Continue', ...props }), moves: () => pointerMoves }
}

for (const href of ['/studio', 'https://example.com']) {
  test(`disabled link prevents navigation and callback: ${href}`, () => {
    let clicks = 0
    let prevented = false
    const { element } = render({ href, disabled: true, onClick: () => clicks++ })
    const link = element.props.children
    assert.equal(link.props['aria-disabled'], true)
    assert.equal(link.props.tabIndex, -1)
    link.props.onClick({ preventDefault: () => { prevented = true } })
    assert.equal(prevented, true)
    assert.equal(clicks, 0)
  })
}

test('enabled link retains callback and navigation', () => {
  let clicks = 0
  const { element } = render({ href: '/studio', onClick: () => clicks++ })
  element.props.children.props.onClick({ preventDefault: () => assert.fail('Navigation must remain enabled') })
  assert.equal(clicks, 1)
})

test('pointer glow ignores touch, coarse pointers, and reduced motion', () => {
  const mouse = render({})
  mouse.element.props.onPointerMove({ pointerType: 'touch' })
  assert.equal(mouse.moves(), 0)
  mouse.element.props.onPointerMove({ pointerType: 'mouse' })
  assert.equal(mouse.moves(), 1)
  const coarse = render({}, { fine: false })
  coarse.element.props.onPointerMove({ pointerType: 'mouse' })
  assert.equal(coarse.moves(), 0)
  assert.equal(render({}, { reduced: true }).element.props.onPointerMove, undefined)
  assert.equal(render({ disabled: true }).element.props.onPointerMove, undefined)
})
