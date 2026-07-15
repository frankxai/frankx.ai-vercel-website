import fs from 'fs'
import path from 'path'

const devRepo = 'c:\\Users\\frank\\starlight\\repos\\FrankX'
const prodRepo = 'c:\\Users\\frank\\starlight\\repos\\frankx.ai-vercel-website'

function getFilesRecursively(dir, baseDir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const fullPath = path.join(dir, file)
    const relPath = path.relative(baseDir, fullPath)
    
    // Ignore folders
    if (
      relPath.startsWith('.git') ||
      relPath.startsWith('.next') ||
      relPath.includes('.worktrees') ||
      relPath.startsWith('node_modules') ||
      relPath.startsWith('.claude') ||
      relPath.startsWith('.grok') ||
      relPath.startsWith('.antigravity') ||
      relPath.endsWith('.log')
    ) {
      return
    }
    
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir))
    } else {
      results.push(relPath)
    }
  })
  return results
}

try {
  console.log('=== RECONCILING ALL FILES FROM PROD TO DEV ===')
  const prodFiles = getFilesRecursively(prodRepo, prodRepo)
  const devFiles = new Set(getFilesRecursively(devRepo, devRepo))
  
  let count = 0
  for (const relPath of prodFiles) {
    if (!devFiles.has(relPath)) {
      const srcPath = path.join(prodRepo, relPath)
      const destPath = path.join(devRepo, relPath)
      
      console.log(`[+] Copying missing file: ${relPath}`)
      const destDir = path.dirname(destPath)
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      fs.copyFileSync(srcPath, destPath)
      count++
    }
  }
  
  console.log(`\n✓ Copied ${count} missing files from prod repo to dev repo.`)
} catch (err) {
  console.error('Error reconciling:', err.message)
}
