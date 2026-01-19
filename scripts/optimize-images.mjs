#!/usr/bin/env node
/**
 * Image Optimization Script for FrankX.AI
 *
 * Converts large PNG images to optimized WebP format using Sharp.
 * Maintains originals as backups and updates references in codebase.
 *
 * Usage: node scripts/optimize-images.mjs
 *
 * @author FrankX Build System
 */

import sharp from 'sharp'
import { readdir, stat, rename, writeFile, readFile } from 'fs/promises'
import { join, basename, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')

// Configuration
const CONFIG = {
  // Directories to scan for images
  imageDirs: [
    'public/images/blog',
    'public/images',
  ],
  // Size threshold in bytes (1MB = 1048576)
  sizeThreshold: 500 * 1024, // 500KB
  // WebP quality (0-100)
  webpQuality: 85,
  // Also create AVIF for modern browsers
  createAvif: true,
  avifQuality: 80,
  // Keep original files with .backup extension
  keepBackups: true,
}

// Logging helpers
const log = {
  info: (msg) => console.log(`\x1b[34mℹ\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m✓\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m⚠\x1b[0m ${msg}`),
  error: (msg) => console.log(`\x1b[31m✗\x1b[0m ${msg}`),
  dim: (msg) => console.log(`\x1b[90m  ${msg}\x1b[0m`),
}

/**
 * Get all PNG files in a directory that exceed size threshold
 */
async function getLargePngs(dir) {
  const fullPath = join(ROOT_DIR, dir)
  const largePngs = []

  try {
    const files = await readdir(fullPath)

    for (const file of files) {
      if (!file.toLowerCase().endsWith('.png')) continue

      const filePath = join(fullPath, file)
      const stats = await stat(filePath)

      if (stats.size >= CONFIG.sizeThreshold) {
        largePngs.push({
          path: filePath,
          relativePath: join(dir, file),
          name: file,
          size: stats.size,
        })
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      log.warn(`Could not scan ${dir}: ${err.message}`)
    }
  }

  return largePngs
}

/**
 * Convert a single image to optimized formats
 */
async function optimizeImage(imageInfo) {
  const { path: inputPath, name, size, relativePath } = imageInfo
  const nameWithoutExt = basename(name, extname(name))
  const outputDir = dirname(inputPath)

  const results = {
    original: { path: relativePath, size },
    webp: null,
    avif: null,
    savings: 0,
  }

  try {
    // Read the image
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    log.info(`Processing: ${name}`)
    log.dim(`Original: ${(size / 1024 / 1024).toFixed(2)}MB (${metadata.width}x${metadata.height})`)

    // Convert to WebP
    const webpPath = join(outputDir, `${nameWithoutExt}.webp`)
    await image
      .webp({ quality: CONFIG.webpQuality, effort: 6 })
      .toFile(webpPath)

    const webpStats = await stat(webpPath)
    results.webp = {
      path: webpPath.replace(ROOT_DIR, '').replace(/^\//, ''),
      size: webpStats.size,
    }
    log.dim(`WebP: ${(webpStats.size / 1024).toFixed(1)}KB (${((1 - webpStats.size / size) * 100).toFixed(1)}% smaller)`)

    // Optionally create AVIF
    if (CONFIG.createAvif) {
      const avifPath = join(outputDir, `${nameWithoutExt}.avif`)
      await sharp(inputPath)
        .avif({ quality: CONFIG.avifQuality, effort: 6 })
        .toFile(avifPath)

      const avifStats = await stat(avifPath)
      results.avif = {
        path: avifPath.replace(ROOT_DIR, '').replace(/^\//, ''),
        size: avifStats.size,
      }
      log.dim(`AVIF: ${(avifStats.size / 1024).toFixed(1)}KB (${((1 - avifStats.size / size) * 100).toFixed(1)}% smaller)`)
    }

    // Backup original if configured
    if (CONFIG.keepBackups) {
      const backupPath = `${inputPath}.backup`
      await rename(inputPath, backupPath)
      log.dim(`Backup: ${basename(backupPath)}`)
    }

    // Calculate total savings (using WebP as primary)
    results.savings = size - results.webp.size

    log.success(`Optimized: ${name} → Saved ${(results.savings / 1024 / 1024).toFixed(2)}MB`)

  } catch (err) {
    log.error(`Failed to optimize ${name}: ${err.message}`)
    return null
  }

  return results
}

/**
 * Generate a report of all optimizations
 */
async function generateReport(results) {
  const reportPath = join(ROOT_DIR, 'IMAGE_OPTIMIZATION_REPORT.md')

  const totalOriginal = results.reduce((sum, r) => sum + r.original.size, 0)
  const totalOptimized = results.reduce((sum, r) => sum + (r.webp?.size || 0), 0)
  const totalSavings = totalOriginal - totalOptimized

  const report = `# Image Optimization Report
*Generated: ${new Date().toISOString()}*

## Summary
- **Images Optimized:** ${results.length}
- **Original Size:** ${(totalOriginal / 1024 / 1024).toFixed(2)} MB
- **Optimized Size:** ${(totalOptimized / 1024 / 1024).toFixed(2)} MB
- **Total Savings:** ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${((totalSavings / totalOriginal) * 100).toFixed(1)}% reduction)

## Files Optimized

| Original | Size | WebP | AVIF | Savings |
|----------|------|------|------|---------|
${results.map(r => `| ${r.original.path} | ${(r.original.size / 1024 / 1024).toFixed(2)}MB | ${r.webp ? (r.webp.size / 1024).toFixed(0) + 'KB' : 'N/A'} | ${r.avif ? (r.avif.size / 1024).toFixed(0) + 'KB' : 'N/A'} | ${(r.savings / 1024 / 1024).toFixed(2)}MB |`).join('\n')}

## Next Steps

1. Update image references in codebase to use \`.webp\` extension
2. Use Next.js Image component for automatic format negotiation
3. Consider removing backup files after verification: \`find . -name "*.backup" -delete\`

## Usage in Components

\`\`\`tsx
// Next.js automatically serves WebP/AVIF when supported
import Image from 'next/image'

<Image
  src="/images/blog/your-image.webp"
  alt="Description"
  width={1200}
  height={630}
  priority // for above-the-fold images
/>
\`\`\`
`

  await writeFile(reportPath, report)
  log.success(`Report saved: IMAGE_OPTIMIZATION_REPORT.md`)
}

/**
 * Main execution
 */
async function main() {
  console.log('\n\x1b[1m🖼️  FrankX Image Optimization\x1b[0m\n')

  // Collect all large PNGs
  const allLargePngs = []

  for (const dir of CONFIG.imageDirs) {
    const pngs = await getLargePngs(dir)
    allLargePngs.push(...pngs)
  }

  if (allLargePngs.length === 0) {
    log.info('No images found exceeding size threshold')
    return
  }

  log.info(`Found ${allLargePngs.length} images to optimize:`)
  for (const img of allLargePngs) {
    log.dim(`${img.relativePath} (${(img.size / 1024 / 1024).toFixed(2)}MB)`)
  }
  console.log('')

  // Optimize each image
  const results = []
  for (const img of allLargePngs) {
    const result = await optimizeImage(img)
    if (result) results.push(result)
  }

  // Generate report
  if (results.length > 0) {
    await generateReport(results)

    const totalSavings = results.reduce((sum, r) => sum + r.savings, 0)
    console.log(`\n\x1b[1m✨ Optimization Complete\x1b[0m`)
    console.log(`   Total savings: \x1b[32m${(totalSavings / 1024 / 1024).toFixed(2)} MB\x1b[0m\n`)
  }
}

main().catch(console.error)
