import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const pagePath = path.resolve(currentDir, '../../app/soulbook/page.tsx')
const selectorPath = path.resolve(currentDir, '../../components/soulbook/LifeBookSelector.tsx')

test('soulbook offers the free vault and publishes no price', () => {
  const pageContent = fs.readFileSync(pagePath, 'utf8')
  const selectorContent = fs.readFileSync(selectorPath, 'utf8')

  assert.equal(pageContent.includes('minPrice'), false)
  assert.equal(pageContent.includes('maxPrice'), false)
  assert.equal(pageContent.includes('Money-Back'), false)
  assert.equal(pageContent.includes('pricingTiers'), false)
  assert.equal(pageContent.includes('href="/soulbook/vault"'), true)
  assert.equal(pageContent.includes('Download free vault'), true)
  assert.equal(pageContent.includes('href="/assessment"'), true)

  assert.equal(selectorContent.includes('book.price'), false)
  assert.equal(selectorContent.includes('price.current'), false)
  assert.equal(selectorContent.includes('money-back'), false)
  assert.equal(selectorContent.includes('.guarantee'), false)
})
