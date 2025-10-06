#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Converts PNG hero images to WebP format for better performance
 * Target: Reduce 1.1-1.3MB PNGs to <200KB WebPs
 *
 * Usage: node scripts/optimize-images.mjs
 */

import { readdir, stat } from 'fs/promises'
import { join, parse } from 'path'
import sharp from 'sharp'

const PUBLIC_DIR = 'public'
const QUALITY = 85 // WebP quality (0-100)
const MAX_WIDTH = 1920 // Max width for hero images

async function optimizeImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    return {
      success: true,
      originalSize: (await stat(inputPath)).size,
      newSize: info.size,
      width: info.width,
      height: info.height,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

async function findHeroImages() {
  const files = await readdir(PUBLIC_DIR)
  return files.filter(file => file.startsWith('hero-') && file.endsWith('.png'))
}

async function main() {
  console.log('🖼️  FrankX.ai Image Optimization Script\n')
  console.log('Searching for hero images...\n')

  const heroImages = await findHeroImages()

  if (heroImages.length === 0) {
    console.log('❌ No hero images found in /public directory')
    return
  }

  console.log(`Found ${heroImages.length} hero images:\n`)

  let totalOriginalSize = 0
  let totalNewSize = 0
  let successCount = 0

  for (const image of heroImages) {
    const { name } = parse(image)
    const inputPath = join(PUBLIC_DIR, image)
    const outputPath = join(PUBLIC_DIR, `${name}.webp`)

    process.stdout.write(`Converting ${image}... `)

    const result = await optimizeImage(inputPath, outputPath)

    if (result.success) {
      const originalMB = (result.originalSize / 1024 / 1024).toFixed(2)
      const newKB = (result.newSize / 1024).toFixed(0)
      const savings = (((result.originalSize - result.newSize) / result.originalSize) * 100).toFixed(1)

      console.log(`✅ ${originalMB}MB → ${newKB}KB (${savings}% smaller)`)
      console.log(`   Dimensions: ${result.width}×${result.height}`)

      totalOriginalSize += result.originalSize
      totalNewSize += result.newSize
      successCount++
    } else {
      console.log(`❌ Failed: ${result.error}`)
    }

    console.log('')
  }

  // Summary
  console.log('─'.repeat(60))
  console.log('\n📊 Summary:\n')
  console.log(`✅ Successfully converted: ${successCount}/${heroImages.length} images`)
  console.log(`📦 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`📦 Total new size: ${(totalNewSize / 1024).toFixed(0)} KB`)
  console.log(`💾 Total savings: ${(((totalOriginalSize - totalNewSize) / totalOriginalSize) * 100).toFixed(1)}%`)

  console.log('\n✨ WebP images created successfully!')
  console.log('\n💡 Next steps:')
  console.log('   1. Update Next.js Image components to use WebP files')
  console.log('   2. Keep PNG files as fallback for older browsers')
  console.log('   3. Test with Lighthouse to verify LCP improvements')
}

main().catch(console.error)
