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
  console.log('=== COMPARING FILES EXISTING IN BOTH REPOS ===')
  const prodFiles = getFilesRecursively(prodRepo, prodRepo)
  const devFiles = new Set(getFilesRecursively(devRepo, devRepo))
  
  let count = 0
  for (const relPath of prodFiles) {
    if (devFiles.has(relPath)) {
      const srcPath = path.join(prodRepo, relPath)
      const destPath = path.join(devRepo, relPath)
      
      const prodContent = fs.readFileSync(srcPath)
      const devContent = fs.readFileSync(destPath)
      
      if (!prodContent.equals(devContent)) {
        console.log(`[!] Different file content: ${relPath}`)
        // Let's copy the prod version to dev
        fs.copyFileSync(srcPath, destPath)
        count++
      }
    }
  }
  
  console.log(`\n✓ Synced ${count} modified files from prod repo to dev repo.`)
} catch (err) {
  console.error('Error reconciling:', err.message)
}
