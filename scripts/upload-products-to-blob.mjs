#!/usr/bin/env node
/**
 * Bulk Upload Products to Vercel Blob
 *
 * Uploads all PDF products from public/products/ and public/pdfs/
 * to Vercel Blob storage with organized paths.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=... node scripts/upload-products-to-blob.mjs
 *
 * Or with secrets loaded:
 *   source ~/.secrets/load-secrets.sh && node scripts/upload-products-to-blob.mjs
 */

import { put, list } from '@vercel/blob'
import { readFileSync, statSync } from 'fs'
import { resolve } from 'path'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
if (!BLOB_TOKEN) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN not set')
  console.error('Run: source ~/.secrets/load-secrets.sh')
  process.exit(1)
}

// Map local files to blob paths with product slugs
const uploads = [
  // ─── ACOS Products ─────────────────────────────────
  {
    local: 'public/products/ACOS-Product-Guide-v2.pdf',
    blobPath: 'products/agentic-creator-os/ACOS-Product-Guide-v2.pdf',
    product: 'agentic-creator-os',
  },
  {
    local: 'public/products/ACOS-Complete-Reference.pdf',
    blobPath: 'products/agentic-creator-os/ACOS-Complete-Reference.pdf',
    product: 'agentic-creator-os',
  },
  {
    local: 'public/products/ACOS-Custom-Agent-Guide.pdf',
    blobPath: 'products/agentic-creator-os/ACOS-Custom-Agent-Guide.pdf',
    product: 'agentic-creator-os',
  },
  {
    local: 'public/products/ACOS-Quickstart-Guide.pdf',
    blobPath: 'products/agentic-creator-os/ACOS-Quickstart-Guide.pdf',
    product: 'agentic-creator-os',
  },
  // ─── Lead Magnets ──────────────────────────────────
  {
    local: 'public/pdfs/5-suno-prompts.pdf',
    blobPath: 'products/5-suno-prompts/5-suno-prompts.pdf',
    product: '5-suno-prompts',
  },
  {
    local: 'public/products/soulbook-7-pillars-framework.pdf',
    blobPath: 'products/soulbook/soulbook-7-pillars-framework.pdf',
    product: 'creators-soulbook',
  },
  // ─── Guides ────────────────────────────────────────
  {
    local: 'public/products/Vibe-OS-Guide.pdf',
    blobPath: 'products/vibe-os/Vibe-OS-Guide.pdf',
    product: 'vibe-os',
  },
  {
    local: 'public/products/GenCreator-OS-Guide.pdf',
    blobPath: 'products/generative-creator-os/GenCreator-OS-Guide.pdf',
    product: 'generative-creator-os',
  },
  // ─── Design Docs (internal, but useful as authority content) ──
  {
    local: 'public/products/Nature-Tech-Design-Guidelines.pdf',
    blobPath: 'products/design-system/Nature-Tech-Design-Guidelines.pdf',
    product: 'design-system',
  },
  {
    local: 'public/products/FrankX-AI-Character-Design-Brief.pdf',
    blobPath: 'products/design-system/FrankX-AI-Character-Design-Brief.pdf',
    product: 'design-system',
  },
]

async function main() {
  console.log('=== Vercel Blob Bulk Upload ===\n')

  // Check existing blobs first
  const existing = await list()
  const existingPaths = new Set(existing.blobs.map((b) => b.pathname))
  console.log(`Existing blobs: ${existingPaths.size}`)

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const item of uploads) {
    const fullPath = resolve(item.local)

    // Check if file exists locally
    try {
      statSync(fullPath)
    } catch {
      console.log(`  SKIP (not found): ${item.local}`)
      skipped++
      continue
    }

    // Check if already uploaded
    if (existingPaths.has(item.blobPath)) {
      console.log(`  SKIP (exists):    ${item.blobPath}`)
      skipped++
      continue
    }

    try {
      const fileBuffer = readFileSync(fullPath)
      const size = (fileBuffer.length / 1024 / 1024).toFixed(1)

      const blob = await put(item.blobPath, fileBuffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/pdf',
      })

      console.log(`  UPLOADED (${size}MB): ${item.blobPath}`)
      console.log(`    URL: ${blob.url}`)
      uploaded++
    } catch (err) {
      console.error(`  FAILED: ${item.blobPath} — ${err.message}`)
      failed++
    }
  }

  console.log(`\n=== Results ===`)
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped:  ${skipped}`)
  console.log(`Failed:   ${failed}`)

  // Print delivery config for products.json
  if (uploaded > 0) {
    console.log(`\n=== Blob Keys for products.json delivery config ===`)
    for (const item of uploads) {
      console.log(`"${item.product}": "${item.blobPath}"`)
    }
  }
}

main().catch(console.error)
