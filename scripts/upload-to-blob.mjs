#!/usr/bin/env node
/**
 * Upload PDFs to Vercel Blob Storage
 *
 * Prerequisites:
 * 1. Generate PDFs first: node scripts/generate-pdfs.mjs
 * 2. Set BLOB_READ_WRITE_TOKEN in .env.local
 *
 * Usage: node scripts/upload-to-blob.mjs
 */

import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOWNLOADS_DIR = path.join(__dirname, '..', 'public', 'downloads')

// Files to upload with their blob keys (must match products.json)
const filesToUpload = [
  {
    localPath: 'soulbook-guide.pdf',
    blobKey: 'soulbook-guide.pdf',
    contentType: 'application/pdf',
  },
  {
    localPath: 'vibe-os-guide.pdf',
    blobKey: 'vibe-os-guide.pdf',
    contentType: 'application/pdf',
  },
  // Add more files as needed
  // {
  //   localPath: 'soulbook-vault.zip',
  //   blobKey: 'soulbook-vault.zip',
  //   contentType: 'application/zip',
  // },
]

async function uploadFile(file) {
  const filePath = path.join(DOWNLOADS_DIR, file.localPath)

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️ Skipped: ${file.localPath} (file not found)`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)
  const stats = fs.statSync(filePath)
  const fileSizeKB = (stats.size / 1024).toFixed(1)

  console.log(`\n📤 Uploading: ${file.localPath} (${fileSizeKB} KB)`)

  try {
    const blob = await put(file.blobKey, fileBuffer, {
      access: 'public',
      contentType: file.contentType,
      addRandomSuffix: false, // Keep exact filename
    })

    console.log(`  ✅ Uploaded: ${blob.url}`)
    return blob
  } catch (error) {
    console.error(`  ❌ Failed: ${error.message}`)
    return null
  }
}

async function main() {
  console.log('📦 Vercel Blob Uploader')
  console.log('======================\n')

  // Check for token
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN not set')
    console.log('\nTo set up Vercel Blob:')
    console.log('1. Go to Vercel Dashboard → Storage → Create Store')
    console.log('2. Copy the BLOB_READ_WRITE_TOKEN')
    console.log('3. Add to .env.local: BLOB_READ_WRITE_TOKEN=vercel_blob_...')
    process.exit(1)
  }

  // Check downloads directory
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    console.error(`❌ Error: Downloads directory not found: ${DOWNLOADS_DIR}`)
    console.log('Run: node scripts/generate-pdfs.mjs first')
    process.exit(1)
  }

  const results = []

  for (const file of filesToUpload) {
    const result = await uploadFile(file)
    if (result) {
      results.push(result)
    }
  }

  console.log('\n======================')
  console.log(`✨ Upload Complete! ${results.length}/${filesToUpload.length} files uploaded`)

  if (results.length > 0) {
    console.log('\nUploaded files:')
    results.forEach(blob => {
      console.log(`  • ${blob.url}`)
    })
  }

  console.log('\n📝 Next steps:')
  console.log('1. Verify files in Vercel Dashboard → Storage')
  console.log('2. Test download links on your product pages')
}

main().catch(console.error)
