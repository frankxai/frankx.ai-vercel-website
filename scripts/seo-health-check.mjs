#!/usr/bin/env node

/**
 * Automated SEO/GEO/AEO Health Check & Validation Suite
 * 
 * Verifies:
 * 1. robots.txt configuration and AI bot allowances (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
 * 2. Canonical sitemap URL consistency (www canonical)
 * 3. llms.txt and llms-full.txt presence and structure
 * 4. JSON-LD structured data and Schema.org @graph validity
 * 5. Layout metadata verification tags (Google Search Console)
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

let passed = 0
let failed = 0
const errors = []

function assert(condition, message) {
  if (condition) {
    passed++
    console.log(`  [PASS] ${message}`)
  } else {
    failed++
    errors.push(message)
    console.error(`  [FAIL] ${message}`)
  }
}

console.log('🔍 Running FrankX SEO / GEO / AEO Health Verification Suite...\n')

// 1. Check robots.ts
console.log('📋 1. Checking robots.ts configuration:')
const robotsPath = path.join(ROOT, 'app/robots.ts')
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8')
  assert(content.includes('https://www.frankx.ai/sitemap.xml'), 'robots.ts points to canonical www sitemap')
  assert(content.includes('GPTBot'), 'robots.ts allows GPTBot (OpenAI / SearchGPT)')
  assert(content.includes('ClaudeBot'), 'robots.ts allows ClaudeBot (Anthropic / Claude Search)')
  assert(content.includes('PerplexityBot'), 'robots.ts allows PerplexityBot')
  assert(content.includes('Google-Extended'), 'robots.ts allows Google-Extended')
} else {
  assert(false, 'app/robots.ts exists')
}

// 2. Check layout metadata & GSC verification
console.log('\n📋 2. Checking layout.tsx metadata & GSC verification support:')
const layoutPath = path.join(ROOT, 'app/layout.tsx')
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8')
  assert(content.includes('verification:'), 'layout.tsx defines metadata.verification block')
  assert(content.includes('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'), 'layout.tsx supports Google Search Console env token')
  assert(content.includes('OrganizationJsonLd'), 'layout.tsx includes OrganizationJsonLd component')
} else {
  assert(false, 'app/layout.tsx exists')
}

// 3. Check OrganizationJsonLd & entity triangulation
console.log('\n📋 3. Checking Schema.org Knowledge Graph & Entity Triangulation:')
const orgJsonLdPath = path.join(ROOT, 'components/seo/OrganizationJsonLd.tsx')
if (fs.existsSync(orgJsonLdPath)) {
  const content = fs.readFileSync(orgJsonLdPath, 'utf8')
  assert(content.includes('@graph'), 'OrganizationJsonLd uses unified @graph schema')
  assert(content.includes('@type\': \'Person\'') || content.includes('"@type": "Person"'), 'Defines Person entity for Frank Riemer')
  assert(content.includes('@type\': \'Organization\'') || content.includes('"@type": "Organization"'), 'Defines Organization entity for FrankX')
  assert(content.includes('sameAs: SCHEMA_SAME_AS'), 'Connects verified sameAs social profiles')
} else {
  assert(false, 'components/seo/OrganizationJsonLd.tsx exists')
}

// 4. Check llms.txt & llms-full.txt
console.log('\n📋 4. Checking Generative Engine Optimization (llms.txt standard):')
const llmsPath = path.join(ROOT, 'public/llms.txt')
const llmsFullPath = path.join(ROOT, 'public/llms-full.txt')

if (fs.existsSync(llmsPath)) {
  const content = fs.readFileSync(llmsPath, 'utf8')
  assert(content.startsWith('# FrankX'), 'public/llms.txt starts with H1 title')
  assert(content.includes('https://www.frankx.ai'), 'public/llms.txt contains canonical links')
} else {
  assert(false, 'public/llms.txt exists')
}

if (fs.existsSync(llmsFullPath)) {
  const content = fs.readFileSync(llmsFullPath, 'utf8')
  assert(content.includes('Arcanea Universe') && content.includes('ACOS'), 'public/llms-full.txt provides deep architecture reference')
} else {
  assert(false, 'public/llms-full.txt exists')
}

console.log(`\n======================================================`)
console.log(`Summary: ${passed} passed, ${failed} failed.`)
if (failed > 0) {
  console.error('\n❌ SEO Health Check failed with errors:')
  errors.forEach(e => console.error(`  - ${e}`))
  process.exit(1)
} else {
  console.log('✅ All SEO / GEO / AEO health checks passed cleanly!\n')
  process.exit(0)
}
