#!/usr/bin/env node

/**
 * ArcaneaVault Manifest Generator
 *
 * Scans public/images/ at build time and generates data/vault-manifest.json.
 * Merges auto-detected metadata with human-curated overrides from data/vault-overrides.json.
 */

import { readdir, stat, readFile, writeFile } from 'fs/promises'
import { join, extname, basename, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const IMAGES_DIR = join(ROOT, 'public', 'images')
const OVERRIDES_PATH = join(ROOT, 'data', 'vault-overrides.json')
const OUTPUT_PATH = join(ROOT, 'data', 'vault-manifest.json')

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'])
const SKIP_FILES = new Set(['CLAUDE.md', 'IMAGE_CATALOG.md', 'IMAGE_ORGANIZATION_FINAL.md', 'IMAGE_ASSIGNMENTS.md', 'QUALITY_AUDIT.md', 'CXO_IMAGE_AUDIT.md', 'IMAGE_INDEX.md', 'registry.json'])

// ── Helpers ──────────────────────────────────────────────────────────────────

function kebabToTitle(str) {
  // Strip UUID prefixes (8-4-4-4-12 pattern)
  const withoutUUID = str.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[-_]?/i, '')
  // Strip common suffixes
  const cleaned = withoutUUID.replace(/[-_](hero|thumb|thumbnail)$/i, '')

  return cleaned
    .split(/[-_]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function generateTags(filename, collection) {
  const name = basename(filename, extname(filename))
    .replace(/_thumb$/i, '')
    .replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[-_]?/i, '')

  const words = name.split(/[-_]+/).filter(w => w.length > 2)
  const tags = [...new Set([collection, ...words.map(w => w.toLowerCase())])]
  return tags.slice(0, 10)
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

async function getImageDimensions(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (ext === '.svg') return { width: null, height: null }

  try {
    const sharp = (await import('sharp')).default
    const metadata = await sharp(filePath).metadata()
    return { width: metadata.width || null, height: metadata.height || null }
  } catch {
    return { width: null, height: null }
  }
}

// ── Walk directory (recursive, handles nested like diagrams/blog/) ──────────

async function walkDir(dir, baseCollection = null) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      // For top-level dirs, the directory name is the collection
      // For nested dirs (like diagrams/blog/article/), flatten into parent collection
      const collection = baseCollection || entry.name
      const nested = await walkDir(fullPath, collection)
      results.push(...nested)
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase()
      if (!IMAGE_EXTENSIONS.has(ext)) continue
      if (SKIP_FILES.has(entry.name)) continue

      results.push({ fullPath, collection: baseCollection, filename: entry.name })
    }
  }

  return results
}

// ── Main Scanner ─────────────────────────────────────────────────────────────

async function generateManifest() {
  console.log('ArcaneaVault Scanner starting...')
  console.log(`Scanning: ${IMAGES_DIR}\n`)

  // Load overrides
  let overrides = { collections: {}, assets: {} }
  try {
    const raw = await readFile(OVERRIDES_PATH, 'utf-8')
    overrides = JSON.parse(raw)
  } catch (e) {
    console.warn('No overrides file found, using defaults')
  }

  // Scan top-level directories
  const topEntries = await readdir(IMAGES_DIR, { withFileTypes: true })
  const collectionDirs = topEntries.filter(e => e.isDirectory()).map(e => e.name)

  // Also handle root-level images
  const rootFiles = topEntries.filter(e =>
    e.isFile() && IMAGE_EXTENSIONS.has(extname(e.name).toLowerCase()) && !SKIP_FILES.has(e.name)
  )

  const collections = []
  const formatCounts = {}
  let totalAssets = 0
  let totalSize = 0

  for (const dirName of collectionDirs) {
    const dirPath = join(IMAGES_DIR, dirName)
    const files = await walkDir(dirPath, dirName)

    // Separate primary images from thumbnails
    const thumbnailMap = new Map()
    const primaryFiles = []

    for (const file of files) {
      const nameWithoutExt = basename(file.filename, extname(file.filename))
      if (nameWithoutExt.endsWith('_thumb')) {
        const originalName = nameWithoutExt.replace(/_thumb$/, '')
        thumbnailMap.set(originalName, file)
      } else {
        primaryFiles.push(file)
      }
    }

    if (primaryFiles.length === 0) continue

    const assets = []

    for (const file of primaryFiles) {
      const ext = extname(file.filename).toLowerCase().slice(1)
      const nameWithoutExt = basename(file.filename, extname(file.filename))
      const relPath = '/' + relative(join(ROOT, 'public'), file.fullPath).replace(/\\/g, '/')
      const fileStat = await stat(file.fullPath)
      const dims = await getImageDimensions(file.fullPath)

      // Find thumbnail
      const thumbFile = thumbnailMap.get(nameWithoutExt)
      const thumbPath = thumbFile
        ? '/' + relative(join(ROOT, 'public'), thumbFile.fullPath).replace(/\\/g, '/')
        : null

      const assetId = `${dirName}/${nameWithoutExt}`
      const assetOverride = overrides.assets?.[assetId] || {}

      const asset = {
        id: assetId,
        filename: file.filename,
        src: relPath,
        thumbnail: thumbPath,
        collection: dirName,
        format: ext,
        width: dims.width,
        height: dims.height,
        fileSize: fileStat.size,
        title: assetOverride.title || kebabToTitle(nameWithoutExt),
        tags: assetOverride.tags || generateTags(file.filename, dirName),
        ...(assetOverride.model && { model: assetOverride.model }),
        ...(assetOverride.featured && { featured: true }),
        ...(assetOverride.prompt && { prompt: assetOverride.prompt }),
        ...(fileStat.mtime && { createdAt: fileStat.mtime.toISOString().split('T')[0] }),
      }

      assets.push(asset)
      totalAssets++
      totalSize += fileStat.size
      formatCounts[ext] = (formatCounts[ext] || 0) + 1
    }

    // Sort assets by filename
    assets.sort((a, b) => a.filename.localeCompare(b.filename))

    const collOverride = overrides.collections?.[dirName] || {}

    collections.push({
      id: dirName,
      name: collOverride.name || kebabToTitle(dirName),
      description: collOverride.description || `Visual assets from the ${kebabToTitle(dirName)} collection.`,
      count: assets.length,
      coverImage: assets[0]?.src || '',
      accent: collOverride.accent || 'from-gray-500/20 to-slate-500/20',
      borderAccent: collOverride.borderAccent || 'border-gray-500/30',
      sortOrder: collOverride.sortOrder ?? 99,
      ...(collOverride.hidden && { hidden: true }),
      assets,
    })
  }

  // Handle root-level images (if any)
  if (rootFiles.length > 0) {
    const rootAssets = []
    for (const file of rootFiles) {
      const ext = extname(file.name).toLowerCase().slice(1)
      const nameWithoutExt = basename(file.name, extname(file.name))
      if (nameWithoutExt.endsWith('_thumb')) continue

      const fullPath = join(IMAGES_DIR, file.name)
      const fileStat = await stat(fullPath)
      const dims = await getImageDimensions(fullPath)
      const relPath = `/images/${file.name}`

      // Check for thumbnail
      const thumbName = `${nameWithoutExt}_thumb.jpeg`
      const hasThumb = rootFiles.some(f => f.name === thumbName)

      rootAssets.push({
        id: `root/${nameWithoutExt}`,
        filename: file.name,
        src: relPath,
        thumbnail: hasThumb ? `/images/${thumbName}` : null,
        collection: 'root',
        format: ext,
        width: dims.width,
        height: dims.height,
        fileSize: fileStat.size,
        title: kebabToTitle(nameWithoutExt),
        tags: generateTags(file.name, 'root'),
        createdAt: fileStat.mtime.toISOString().split('T')[0],
      })

      totalAssets++
      totalSize += fileStat.size
      formatCounts[ext] = (formatCounts[ext] || 0) + 1
    }

    if (rootAssets.length > 0) {
      collections.push({
        id: 'root',
        name: 'Root Assets',
        description: 'Top-level images including hero banners and profile assets.',
        count: rootAssets.length,
        coverImage: rootAssets[0]?.src || '',
        accent: 'from-slate-500/20 to-gray-500/20',
        borderAccent: 'border-slate-500/30',
        sortOrder: 0,
        hidden: true,
        assets: rootAssets,
      })
    }
  }

  // Sort collections by sortOrder
  collections.sort((a, b) => a.sortOrder - b.sortOrder)

  const manifest = {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    totalAssets,
    totalCollections: collections.length,
    totalSize,
    formats: formatCounts,
    collections,
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf-8')

  // Print summary
  console.log('ArcaneaVault Manifest Generated')
  console.log('═══════════════════════════════')
  console.log(`Total assets:      ${totalAssets}`)
  console.log(`Total collections: ${collections.length}`)
  console.log(`Total size:        ${formatBytes(totalSize)}`)
  console.log(`Formats:           ${Object.entries(formatCounts).map(([k, v]) => `${k}: ${v}`).join(', ')}`)
  console.log('')
  console.log('Collections:')
  for (const c of collections) {
    const hidden = c.hidden ? ' (hidden)' : ''
    const thumbCount = c.assets.filter(a => a.thumbnail).length
    console.log(`  ${c.name.padEnd(25)} ${String(c.count).padStart(4)} assets  ${String(thumbCount).padStart(3)} thumbs${hidden}`)
  }
  console.log(`\nOutput: ${OUTPUT_PATH}`)
}

generateManifest().catch(err => {
  console.error('Vault scanner failed:', err)
  process.exit(1)
})
