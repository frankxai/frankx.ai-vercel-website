import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialTitle, fitHeroTitle, titleTextSvg } from './editorial-title.mjs'

const writing = 'Best AI Writing Tools 2026: When You Actually Need One vs Just Using Claude'
const aeo = 'How to Get Cited by ChatGPT and Perplexity: The AEO Playbook for 2026'

function textFromSvg(svg) {
  return [...svg.matchAll(/<tspan[^>]*>([^<]*)<\/tspan>/g)]
    .map((match) => match[1]
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&'))
    .join(' ')
}

test('the writing-tools header keeps Tools and 2026', () => {
  const fitted = fitHeroTitle({ title: writing })
  const svg = titleTextSvg(fitted.lines, fitted)
  assert.equal(fitted.lines.join(' '), writing)
  assert.equal(textFromSvg(svg), writing)
  assert.ok(fitted.lines.every((line) => line.length <= 22))
  assert.equal(svg.includes('The Writing s field test'), false)
})

test('the AEO header keeps the year on the last line', () => {
  const fitted = fitHeroTitle({ title: aeo })
  const svg = titleTextSvg(fitted.lines, fitted)
  assert.equal(textFromSvg(svg), aeo)
  assert.ok(fitted.lines.every((line) => line.length <= 22))
  assert.equal(svg.includes('2026'), true)
})

test('a Best AI title keeps Tools and the year', () => {
  const title = 'Best AI Writing Tools: the 2026 field test'
  assert.equal(editorialTitle({ title }), title)
  assert.equal(fitHeroTitle({ title }).lines.join(' '), title)
})

test('apostrophes and ampersands survive the SVG text', () => {
  const title = "Claude's tools & models"
  const svg = titleTextSvg(fitHeroTitle({ title }).lines)
  assert.equal(textFromSvg(svg), title)
  assert.equal(svg.includes('&amp;'), true)
})

test('a trailing FrankX suffix is removed', () => {
  assert.equal(editorialTitle({ title: 'Field note   | FrankX' }), 'Field note')
})

test('a long title stays whole by stepping the type down', () => {
  const title = 'A field note about agent routing, evaluation, memory, and the operating map a solo builder actually ships'
  const fitted = fitHeroTitle({ title })
  assert.equal(fitted.lines.join(' '), title)
  assert.equal(fitted.overflow, false)
  assert.ok(fitted.size < 66)
})
