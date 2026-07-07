import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { head, put } from '@vercel/blob'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..', '..')
const registryPath = path.join(repoRoot, 'data', 'admin', 'data-room-registry.json')
const defaultSourceRoot = path.resolve(repoRoot, '..', '_business-plans', 'starlight-agentic-venture-os-2026')

dotenv.config({ path: path.join(repoRoot, '.env.local'), quiet: true })
dotenv.config({ path: path.join(repoRoot, '.env'), quiet: true })

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const verifyOnly = args.includes('--verify')
const includeAll = args.includes('--all')
const overwrite = args.includes('--overwrite')

function collectIds() {
  const ids = []
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--id' && args[index + 1]) ids.push(args[index + 1])
    if (arg.startsWith('--id=')) ids.push(arg.slice('--id='.length))
  }
  return ids
}

function fail(message) {
  console.error(`\n[data-room] ${message}`)
  process.exitCode = 1
}

function assertInside(parent, child) {
  const relative = path.relative(parent, child)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to read outside DATA_ROOM_SOURCE_ROOT: ${child}`)
  }
}

async function sha256(filePath) {
  const buffer = await readFile(filePath)
  return createHash('sha256').update(buffer).digest('hex').toUpperCase()
}

async function verifyBlob(document) {
  try {
    const metadata = await head(document.blobPath)
    return {
      status: 'uploaded',
      size: metadata.size,
      uploadedAt: metadata.uploadedAt.toISOString(),
      contentType: metadata.contentType,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown storage error'
    return { status: message.toLowerCase().includes('not found') ? 'missing' : 'error', message }
  }
}

function usage() {
  console.log(`Data room private Blob uploader

Usage:
  npm run data-room:dry-run
  DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true npm run data-room:upload
  npm run data-room:verify
  node scripts/data-room/upload-data-room-docs.mjs --id internal-whitepaper-v3-pdf --dry-run

Safety:
  - Uploads use @vercel/blob access="private".
  - Uploads require DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true.
  - Source files must stay inside DATA_ROOM_SOURCE_ROOT.
  - SHA-256 must match the registry before upload.
`)
}

async function main() {
  const registry = JSON.parse(await readFile(registryPath, 'utf8'))
  const ids = collectIds()

  if (!includeAll && ids.length === 0) {
    usage()
    fail('Choose --all or at least one --id. No documents were uploaded.')
    return
  }

  const sourceRoot = path.resolve(process.env.DATA_ROOM_SOURCE_ROOT || defaultSourceRoot)
  const selected = includeAll
    ? registry.documents
    : registry.documents.filter((document) => ids.includes(document.id))

  const missingIds = ids.filter((id) => !registry.documents.some((document) => document.id === id))
  if (missingIds.length > 0) {
    fail(`Unknown document id(s): ${missingIds.join(', ')}`)
    return
  }

  if (!dryRun && !verifyOnly && process.env.DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD !== 'true') {
    fail('Set DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true to allow private Blob uploads.')
    return
  }

  if (!dryRun && !process.env.BLOB_READ_WRITE_TOKEN) {
    fail('BLOB_READ_WRITE_TOKEN is required for upload or verify.')
    return
  }

  console.log(`[data-room] Registry: ${path.relative(repoRoot, registryPath)}`)
  console.log(`[data-room] Source root: ${sourceRoot}`)
  console.log(`[data-room] Mode: ${verifyOnly ? 'verify' : dryRun ? 'dry-run' : 'upload private blobs'}`)
  console.log(`[data-room] Selected documents: ${selected.length}`)

  for (const document of selected) {
    if (document.publicSafe !== false || document.accessClass !== 'internal-private') {
      throw new Error(`Refusing unsafe registry entry: ${document.id}`)
    }

    const sourcePath = path.resolve(sourceRoot, document.sourcePath)
    assertInside(sourceRoot, sourcePath)

    if (verifyOnly) {
      const state = await verifyBlob(document)
      console.log(`[verify] ${document.id}: ${state.status}${state.size ? ` (${state.size} bytes)` : ''}`)
      continue
    }

    const fileStat = await stat(sourcePath)
    const actualHash = await sha256(sourcePath)
    if (actualHash !== document.sha256) {
      throw new Error(`SHA-256 mismatch for ${document.id}. Expected ${document.sha256}, got ${actualHash}`)
    }

    const multipart = fileStat.size > 8 * 1024 * 1024
    console.log(`[check] ${document.id}: ${fileStat.size} bytes, hash ok, ${multipart ? 'multipart' : 'single'} upload`)

    if (dryRun) continue

    const result = await put(document.blobPath, createReadStream(sourcePath), {
      access: 'private',
      allowOverwrite: overwrite,
      contentType: document.contentType,
      multipart,
    })

    console.log(`[upload] ${document.id}: ${result.pathname} (${result.contentType})`)
  }

  console.log('[data-room] Done.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
