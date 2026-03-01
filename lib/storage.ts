import { put, list, del, head } from '@vercel/blob'

/**
 * Vercel Blob Storage Utility
 *
 * Manages file uploads and retrieval for products, PDFs, images, and downloads.
 * Uses the Vercel Blob store already configured (BLOB_READ_WRITE_TOKEN in env).
 *
 * Directory structure in Blob:
 *   products/{slug}/{filename}     — Product downloads (PDFs, ZIPs)
 *   books/{slug}/{filename}        — Book PDFs and EPUBs
 *   images/blog/{slug}/{filename}  — Blog hero images
 *   images/social/{filename}       — Generated social cards
 *   templates/{filename}           — n8n workflow templates for sale
 */

export const BLOB_BASE_URL =
  'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

// ─── Upload ──────────────────────────────────────────────────────

export async function uploadFile(
  path: string,
  file: Buffer | Blob | ReadableStream,
  options?: {
    contentType?: string
    access?: 'public'
    addRandomSuffix?: boolean
  }
) {
  const blob = await put(path, file, {
    access: options?.access ?? 'public',
    contentType: options?.contentType,
    addRandomSuffix: options?.addRandomSuffix ?? false,
  })
  return blob
}

export async function uploadProductFile(
  productSlug: string,
  filename: string,
  file: Buffer | Blob | ReadableStream,
  contentType?: string
) {
  return uploadFile(`products/${productSlug}/${filename}`, file, {
    contentType: contentType ?? guessMimeType(filename),
  })
}

export async function uploadBookPdf(
  bookSlug: string,
  file: Buffer | Blob | ReadableStream
) {
  return uploadFile(`books/${bookSlug}/${bookSlug}.pdf`, file, {
    contentType: 'application/pdf',
  })
}

export async function uploadBlogImage(
  blogSlug: string,
  filename: string,
  file: Buffer | Blob | ReadableStream
) {
  return uploadFile(`images/blog/${blogSlug}/${filename}`, file, {
    contentType: guessMimeType(filename),
  })
}

export async function uploadTemplate(
  filename: string,
  file: Buffer | Blob | ReadableStream
) {
  return uploadFile(`templates/${filename}`, file, {
    contentType: 'application/zip',
  })
}

// ─── List & Query ────────────────────────────────────────────────

export async function listFiles(prefix?: string) {
  const result = await list({ prefix })
  return result.blobs
}

export async function listProductFiles(productSlug: string) {
  return listFiles(`products/${productSlug}/`)
}

export async function listBookFiles(bookSlug: string) {
  return listFiles(`books/${bookSlug}/`)
}

export async function getFileInfo(url: string) {
  return head(url)
}

// ─── Delete ──────────────────────────────────────────────────────

export async function deleteFile(url: string) {
  await del(url)
}

// ─── Helpers ─────────────────────────────────────────────────────

function guessMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const mimeMap: Record<string, string> = {
    pdf: 'application/pdf',
    zip: 'application/zip',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    json: 'application/json',
    md: 'text/markdown',
  }
  return mimeMap[ext ?? ''] ?? 'application/octet-stream'
}

/**
 * Convert a local public/ path to a Blob key.
 * e.g., "public/products/ACOS-Product-Guide-v2.pdf"
 *     → "products/acos/ACOS-Product-Guide-v2.pdf"
 */
export function localPathToBlobKey(
  localPath: string,
  productSlug?: string
): string {
  const filename = localPath.split('/').pop() ?? localPath
  if (productSlug) {
    return `products/${productSlug}/${filename}`
  }
  // Strip "public/" prefix if present
  return localPath.replace(/^public\//, '')
}
