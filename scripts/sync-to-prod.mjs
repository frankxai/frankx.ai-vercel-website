import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const devRepo = 'c:\\Users\\frank\\starlight\\repos\\FrankX'
const prodRepo = 'c:\\Users\\frank\\starlight\\repos\\frankx.ai-vercel-website'

// Helper to copy file recursively
function copyFile(src, dest) {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.copyFileSync(src, dest)
}

try {
  // Get git status porcelain output
  const output = execSync('git status --porcelain', { cwd: devRepo, encoding: 'utf8' })
  const lines = output.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  
  console.log('=== SYNCING TO PRODUCTION REPO ===')
  let count = 0
  
  for (const line of lines) {
    // line is like "M content/blog/file.mdx" or "?? public/images/blog/img.png"
    const parts = line.split(/\s+/)
    const status = parts[0]
    const relPath = parts.slice(1).join(' ')
    
    // Ignore patterns
    if (
      relPath.startsWith('.claude/') ||
      relPath.startsWith('.grok/') ||
      relPath.startsWith('.antigravity/') ||
      relPath.startsWith('docs/ops/') ||
      relPath.startsWith('docs/planning/') ||
      relPath.includes('task_plan.md') ||
      relPath.includes('findings.md') ||
      relPath.includes('progress.md') ||
      relPath.includes('task.md') ||
      relPath.includes('audit-blog-images.mjs') ||
      relPath.includes('sync-to-prod.mjs') ||
      relPath.endsWith('.log') ||
      relPath === 'link-checker-report.json' ||
      relPath === 'link-checker-report.txt'
    ) {
      continue
    }
    
    const srcPath = path.join(devRepo, relPath)
    const destPath = path.join(prodRepo, relPath)
    
    if (fs.existsSync(srcPath) && fs.statSync(srcPath).isFile()) {
      console.log(`[+] Syncing: ${relPath}`)
      copyFile(srcPath, destPath)
      count++
    }
  }
  
  console.log(`\n✓ Synced ${count} files to ${prodRepo}`)
} catch (err) {
  console.error('Error syncing:', err.message)
}
