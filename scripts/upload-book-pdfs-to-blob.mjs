#!/usr/bin/env node
/**
 * Upload Book PDFs to Vercel Blob
 *
 * Uploads generated book PDFs from public/books/ to Vercel Blob.
 *
 * Usage:
 *   source ~/.secrets/load-secrets.sh && node scripts/upload-book-pdfs-to-blob.mjs
 */

import { put, list } from '@vercel/blob'
import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
if (!BLOB_TOKEN) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN not set')
  console.error('Run: source ~/.secrets/load-secrets.sh')
  process.exit(1)
}

const BOOKS_DIR = resolve('public/books')

async function main() {
  console.log('=== Upload Book PDFs to Vercel Blob ===\n')

  const existing = await list()
  const existingPaths = new Set(existing.blobs.map((b) => b.pathname))
  console.log(`Existing blobs: ${existingPaths.size}`)

  const pdfs = readdirSync(BOOKS_DIR).filter((f) => f.endsWith('.pdf'))
  console.log(`Book PDFs found: ${pdfs.length}\n`)

  let uploaded = 0
  let skipped = 0

  for (const file of pdfs) {
    const localPath = join(BOOKS_DIR, file)
    const slug = file.replace('.pdf', '')
    const blobPath = `books/${slug}/${file}`

    if (existingPaths.has(blobPath)) {
      console.log(`  SKIP (exists): ${blobPath}`)
      skipped++
      continue
    }

    const buffer = readFileSync(localPath)
    const size = (buffer.length / 1024 / 1024).toFixed(1)

    const blob = await put(blobPath, buffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/pdf',
    })

    console.log(`  UPLOADED (${size}MB): ${blobPath}`)
    console.log(`    URL: ${blob.url}`)
    uploaded++
  }

  console.log(`\n=== Results ===`)
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped:  ${skipped}`)

  if (uploaded > 0) {
    console.log(`\n=== Blob Keys for products.json ===`)
    for (const file of pdfs) {
      const slug = file.replace('.pdf', '')
      console.log(`  "${slug}": "books/${slug}/${file}"`)
    }
  }
}

main().catch(console.error)
