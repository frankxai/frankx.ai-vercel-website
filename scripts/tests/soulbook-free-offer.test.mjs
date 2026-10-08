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
  assert.equal(pageContent.includes('Open the free vault'), true)
  assert.equal(pageContent.includes('Download free vault'), false)
  assert.equal(pageContent.includes('href="/soulbook/assessment"'), true)
  assert.equal(pageContent.includes('href="/assessment"'), false)

  assert.equal(selectorContent.includes('book.price'), false)
  assert.equal(selectorContent.includes('price.current'), false)
  assert.equal(selectorContent.includes('money-back'), false)
  assert.equal(selectorContent.includes('.guarantee'), false)
})

test('life-book cards publish no sessions, feature bundle or journey CTA', () => {
  const selectorContent = fs.readFileSync(selectorPath, 'utf8')
  const absent = [
    [/live\s+coaching\s+sessions/i, 'live coaching sessions'],
    [/\.sessions\b/, 'a rendered sessions count'],
    [/\.features\b/, 'the features preview'],
    [/\+[^\n]{0,80}\bmore\b/i, "a '+N more' line"],
    [/Start\s+your/i, 'Start your'],
    [/\bjourney\b/i, 'journey'],
    [/200\s*\+\s*pages/i, '200+ pages'],
    [/private\s+community/i, 'private community'],
    [/lifetime/i, 'lifetime'],
  ]
  for (const [pattern, label] of absent) {
    assert.doesNotMatch(selectorContent, pattern, `LifeBookSelector.tsx still contains ${label}`)
  }
  const actions = selectorContent.match(/<(PremiumButton|Link|a)\b[\s\S]*?<\/\1>/g) ?? []
  for (const action of actions) {
    assert.doesNotMatch(action, /journey|waitlist|deliver/i, `action text: ${action}`)
  }
})
