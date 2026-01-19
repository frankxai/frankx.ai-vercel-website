#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const files = [
  'app/achievements/page.tsx',
  'app/agentic-ai-center/page.tsx',
  'app/agent-team/page.tsx',
  'app/agents/page.tsx',
  'app/ai-assessment/page.tsx',
  'app/assessment/page.tsx',
  'app/assessment/creative/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/blog/intelligence-revolution-2025/page.tsx',
  'app/blog/soul-frequency-framework/page.tsx',
  'app/contact/page.tsx',
  'app/content-studio/page.tsx',
  'app/courses/conscious-ai-foundations/page.tsx',
  'app/enterprise/page.tsx',
  'app/founder-playbook/page.tsx',
  'app/goals/page.tsx',
  'app/guides/page.tsx',
  'app/guides/[slug]/page.tsx',
  'app/insights/page.tsx',
  'app/resources/templates/page.tsx',
  'app/soul-frequency-assessment/page.tsx',
  'app/soul-frequency-quiz/page.tsx',
  'app/templates/page.tsx',
  'app/thank-you/page.tsx',
  'app/tools/builder/page.tsx',
]

function fixFile(filePath) {
  const fullPath = path.resolve(filePath)
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - not found`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf8')
  let modified = false

  // Remove Navigation import
  const navImportRegex = /import\s+Navigation\s+from\s+['"]@\/components\/Navigation['"]\s*\n?/g
  if (navImportRegex.test(content)) {
    content = content.replace(navImportRegex, '')
    modified = true
  }

  // Remove Footer import
  const footerImportRegex = /import\s+Footer\s+from\s+['"]@\/components\/Footer['"]\s*\n?/g
  if (footerImportRegex.test(content)) {
    content = content.replace(footerImportRegex, '')
    modified = true
  }

  // Remove <Navigation /> component usage (with optional whitespace)
  const navUsageRegex = /\s*<Navigation\s*\/>\s*\n?/g
  if (navUsageRegex.test(content)) {
    content = content.replace(navUsageRegex, '\n')
    modified = true
  }

  // Remove <Footer /> component usage (with optional whitespace)
  const footerUsageRegex = /\s*<Footer\s*\/>\s*\n?/g
  if (footerUsageRegex.test(content)) {
    content = content.replace(footerUsageRegex, '\n')
    modified = true
  }

  // Clean up any double newlines that might have been created
  content = content.replace(/\n{3,}/g, '\n\n')

  if (modified) {
    fs.writeFileSync(fullPath, content)
    console.log(`Fixed: ${filePath}`)
  } else {
    console.log(`No changes needed: ${filePath}`)
  }
}

console.log('Fixing Navigation/Footer duplicates...\n')
files.forEach(fixFile)
console.log('\nDone!')
