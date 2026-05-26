/**
 * BYOK (Bring Your Own Key) endpoint.
 *
 * POST   { apiKey } → validates against Google, encrypts, stores in KV (TTL 30d)
 * DELETE                → clears the stored key for this caller
 *
 * Keys are AES-256-GCM encrypted with BYOK_SECRET. Raw keys are never logged
 * or echoed back to the client. The encrypted ciphertext lives in Vercel KV.
 */

import { NextResponse } from 'next/server'
import { clearByokKey, loadByokKey, saveByokKey, validateGeminiKey } from '@/lib/ai/byok'
import { getClientIdentifier } from '@/lib/ratelimit'
import { auth as authFn } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type SessionLike = { user?: { id?: string; email?: string | null } | null } | null
const auth = authFn as unknown as () => Promise<SessionLike>

async function getCallerKeys(req: Request) {
  let session: SessionLike = null
  try {
    session = await auth()
  } catch {
    session = null
  }
  const userId = session?.user?.id || session?.user?.email || null
  const identifier = getClientIdentifier(req)
  return { userId, identifier }
}

export async function POST(req: Request) {
  let body: { apiKey?: string }
  try {
    body = (await req.json()) as { apiKey?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const apiKey = (body.apiKey || '').trim()
  if (!apiKey || apiKey.length < 20) {
    return NextResponse.json(
      { error: 'invalid_key', message: 'API key looks too short to be a valid Gemini key.' },
      { status: 400 }
    )
  }

  // Fail fast if BYOK is disabled on this deployment — do NOT round-trip the
  // visitor's key to Google when we have no way to store it. Sending it to
  // any external service before confirming we can act on it is an
  // unnecessary disclosure.
  if (!process.env.BYOK_SECRET) {
    return NextResponse.json(
      {
        error: 'byok_disabled',
        message:
          'BYOK is not configured on this deployment (missing BYOK_SECRET). Use the free tier or upgrade to Studio Pro.',
      },
      { status: 503 }
    )
  }

  const ok = await validateGeminiKey(apiKey)
  if (!ok) {
    return NextResponse.json(
      {
        error: 'rejected_by_google',
        message:
          "Google didn't accept that key. Double-check it on aistudio.google.com and try again.",
      },
      { status: 400 }
    )
  }

  const { userId, identifier } = await getCallerKeys(req)
  try {
    await saveByokKey(apiKey, userId, identifier)
  } catch (e) {
    return NextResponse.json(
      { error: 'storage_failed', message: e instanceof Error ? e.message : 'Could not store key.' },
      { status: 400 }
    )
  }

  return NextResponse.json({ ok: true, scope: userId ? 'user' : 'session' })
}

export async function GET(req: Request) {
  const { userId, identifier } = await getCallerKeys(req)
  let active = false
  try {
    active = !!(await loadByokKey(userId, identifier))
  } catch {
    active = false
  }
  return NextResponse.json({ active, scope: userId ? 'user' : 'session' })
}

export async function DELETE(req: Request) {
  const { userId, identifier } = await getCallerKeys(req)
  await clearByokKey(userId, identifier)
  return NextResponse.json({ ok: true })
}
