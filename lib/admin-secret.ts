import crypto from 'crypto'

/**
 * Timing-safe comparison for the ADMIN_SECRET header/body check used by
 * /api/admin/upload and /api/admin/verify. Hashing both sides first means
 * timingSafeEqual always compares equal-length buffers (avoids leaking the
 * secret's length) and a candidate of any length is safe to pass in.
 */
export function verifyAdminSecret(candidate: string, secret: string): boolean {
  const candidateHash = crypto.createHash('sha256').update(candidate).digest()
  const secretHash = crypto.createHash('sha256').update(secret).digest()
  return crypto.timingSafeEqual(candidateHash, secretHash)
}
