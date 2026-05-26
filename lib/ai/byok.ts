/**
 * BYOK (Bring Your Own Key) — AES-256-GCM encrypted storage of visitor API keys.
 *
 * Server-only. Never log raw keys. Ciphertext lives in Vercel KV with a 30-day TTL.
 */

import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto'
import { kv } from '@vercel/kv'

const KEY_PREFIX_USER = 'byok:user:'
const KEY_PREFIX_IP = 'byok:ip:'
const TTL_SECONDS = 60 * 60 * 24 * 30 // 30 days
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

/**
 * BYOK is only safe to store when we can scope the ciphertext to a real
 * identity. Without it, all anonymous visitors share `byok:ip:anonymous`
 * (the literal fallback string from getClientIdentifier) — meaning one
 * visitor's key would be readable and overwritable by every other visitor.
 *
 * Returns true if we have either:
 *  - a signed-in userId (most reliable)
 *  - a real IP-derived identifier (anything other than the 'anonymous'
 *    fallback string)
 */
export function canStoreByok(userId: string | null, identifier: string): boolean {
  if (userId) return true
  if (!identifier) return false
  if (identifier === 'anonymous') return false
  return true
}

function getSecretKey(): Buffer {
  const secret = process.env.BYOK_SECRET
  if (!secret) {
    throw new Error('BYOK_SECRET env var is required to use BYOK encryption')
  }
  // Derive a 32-byte key from whatever the operator put in env.
  return createHash('sha256').update(secret).digest()
}

export interface EncryptedKey {
  ciphertext: string // base64
  iv: string // base64
  tag: string // base64
}

export function encryptKey(plaintext: string): string {
  const key = getSecretKey()
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  const payload: EncryptedKey = {
    ciphertext: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
  }
  return JSON.stringify(payload)
}

export function decryptKey(serialized: string): string | null {
  try {
    const payload = JSON.parse(serialized) as EncryptedKey
    const key = getSecretKey()
    const iv = Buffer.from(payload.iv, 'base64')
    const tag = Buffer.from(payload.tag, 'base64')
    const ciphertext = Buffer.from(payload.ciphertext, 'base64')
    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
    return decrypted.toString('utf8')
  } catch {
    return null
  }
}

function storageKey(userId: string | null, identifier: string): string {
  return userId ? `${KEY_PREFIX_USER}${userId}` : `${KEY_PREFIX_IP}${identifier}`
}

export async function saveByokKey(
  plaintextApiKey: string,
  userId: string | null,
  identifier: string
): Promise<void> {
  if (!KV_AVAILABLE) {
    throw new Error('KV is not configured on this deployment — BYOK storage unavailable.')
  }
  if (!canStoreByok(userId, identifier)) {
    throw new Error(
      'Cannot scope BYOK key to a stable identity. Sign in first, or visit from a deployment where your IP is forwarded.'
    )
  }
  const ciphertext = encryptKey(plaintextApiKey)
  await kv.set(storageKey(userId, identifier), ciphertext, { ex: TTL_SECONDS })
}

export async function loadByokKey(
  userId: string | null,
  identifier: string
): Promise<string | null> {
  if (!KV_AVAILABLE) return null
  // Refuse to read from a shared bucket (e.g. `byok:ip:anonymous`) — that
  // would let one visitor's key be served to another. This must match
  // saveByokKey's guard so reads and writes use the same identity surface.
  if (!canStoreByok(userId, identifier)) return null
  try {
    const ciphertext = await kv.get<string>(storageKey(userId, identifier))
    if (!ciphertext) return null
    return decryptKey(ciphertext)
  } catch {
    return null
  }
}

export async function clearByokKey(userId: string | null, identifier: string): Promise<void> {
  if (!KV_AVAILABLE) return
  if (!canStoreByok(userId, identifier)) return
  try {
    await kv.del(storageKey(userId, identifier))
  } catch {
    // best-effort
  }
}

/**
 * Validate a Gemini API key by hitting the public models endpoint.
 * Returns true if the key is accepted by Google.
 *
 * Uses the `x-goog-api-key` header (not the `?key=` query string) so the
 * key never appears in HTTP access logs, Vercel runtime traces, or fetch
 * error stacks that surface URLs.
 */
export async function validateGeminiKey(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      method: 'GET',
      headers: { 'x-goog-api-key': apiKey },
    })
    return res.ok
  } catch {
    return false
  }
}
