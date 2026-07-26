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
  console.log('=== SYNCING FROM PRODUCTION REPO (diff against main) ===')
  
  // Get files changed in prod repo relative to main branch
  const output = execSync('git diff --name-only main', { cwd: prodRepo, encoding: 'utf8' })
  const relPaths = output.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  
  let count = 0
  
  for (const relPath of relPaths) {
    // Ignore patterns (especially meta/doc/log files)
    if (
      relPath.startsWith('.claude/') ||
      relPath.startsWith('.grok/') ||
      relPath.startsWith('.antigravity/') ||
      relPath.startsWith('.git/') ||
      relPath.endsWith('.log') ||
      relPath === 'link-checker-report.json' ||
      relPath === 'link-checker-report.txt'
    ) {
      continue
    }
    
    const srcPath = path.join(prodRepo, relPath)
    const destPath = path.join(devRepo, relPath)
    
    if (fs.existsSync(srcPath) && fs.statSync(srcPath).isFile()) {
      console.log(`[+] Syncing: ${relPath}`)
      copyFile(srcPath, destPath)
      count++
    } else if (!fs.existsSync(srcPath)) {
      // File was deleted on the branch in prod, let's delete in dev too if it exists
      if (fs.existsSync(destPath)) {
        console.log(`[-] Deleting: ${relPath}`)
        fs.unlinkSync(destPath)
        count++
      }
    }
  }
  
  console.log(`\n✓ Synced ${count} files from ${prodRepo} to dev repository.`)
} catch (err) {
  console.error('Error syncing:', err.message)
}
