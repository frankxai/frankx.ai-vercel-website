import { NextRequest, NextResponse } from 'next/server'

import { clientKey, rateLimited } from '@/lib/rate-limit'
import { TallinnInterestSchema } from '@/lib/tallinn-interest/schema'
import { captureTallinnInterest } from '@/lib/tallinn-interest/service'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 12_000
const REVIEW_EMAIL = /@example\.com$/i

type BodyReadResult =
  | { ok: true; value: unknown }
  | { ok: false; tooLarge: boolean }

async function readJsonWithinLimit(
  request: NextRequest,
  maxBytes: number,
): Promise<BodyReadResult> {
  if (!request.body) return { ok: false, tooLarge: false }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let byteLength = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue

      byteLength += value.byteLength
      if (byteLength > maxBytes) {
        await reader.cancel('Request body exceeds the configured limit.').catch(() => undefined)
        return { ok: false, tooLarge: true }
      }
      chunks.push(value)
    }

    const body = new Uint8Array(byteLength)
    let offset = 0
    for (const chunk of chunks) {
      body.set(chunk, offset)
      offset += chunk.byteLength
    }

    return { ok: true, value: JSON.parse(new TextDecoder().decode(body)) }
  } catch {
    return { ok: false, tooLarge: false }
  } finally {
    reader.releaseLock()
  }
}

function reviewMode() {
  return !(
    process.env.VERCEL_ENV === 'production' &&
    process.env.TALLINN_CAPTURE_MODE === 'live'
  )
}
export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get('content-length') || '0')
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Request is too large.' },
        { status: 413 },
      )
    }

    if (rateLimited('intake', clientKey(request))) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

    const bodyResult = await readJsonWithinLimit(request, MAX_BODY_BYTES)
    if (!bodyResult.ok) {
      if (bodyResult.tooLarge) {
        return NextResponse.json(
          { ok: false, error: 'Request is too large.' },
          { status: 413 },
        )
      }
      return NextResponse.json(
        { ok: false, error: 'Invalid request.' },
        { status: 400 },
      )
    }

    const body = bodyResult.value
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Invalid request.' },
        { status: 400 },
      )
    }

    const parsed = TallinnInterestSchema.safeParse(body)
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        {
          ok: false,
          error: firstIssue?.message ?? 'Validation failed.',
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: 'Thanks.' })
    }

    if (reviewMode()) {
      if (!REVIEW_EMAIL.test(parsed.data.email)) {
        return NextResponse.json(
          {
            ok: false,
            reviewMode: true,
            error:
              'This private preview stores no personal data. Use test@example.com to exercise the flow.',
          },
          { status: 409 },
        )
      }

      console.log(
        '[tallinn-interest-preview]',
        JSON.stringify({
          experienceSlug: parsed.data.experienceSlug,
          variantId: parsed.data.variantId,
          slotCount: parsed.data.slotIds.length,
          simulated: true,
        }),
      )
      return NextResponse.json({
        ok: true,
        reviewMode: true,
        receiptSent: false,
        duplicate: false,
        message: 'Preview simulation passed. No data was stored and no email was sent.',
      })
    }

    const notionToken = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY
    const notionDatabaseId = process.env.NOTION_INQUIRIES_DB_ID
    if (!notionToken || !notionDatabaseId) {
      console.error('[tallinn-interest] capture disabled: Notion configuration missing')
      return NextResponse.json(
        {
          ok: false,
          error: 'Interest capture is temporarily unavailable. Please email frank@frankx.ai.',
        },
        { status: 503 },
      )
    }

    const result = await captureTallinnInterest(parsed.data, {
      notionToken,
      notionDatabaseId,
      resendApiKey: process.env.RESEND_API_KEY,
      operatorEmail: process.env.OPERATOR_EMAIL || 'frank@frankx.ai',
    })

    console.log(
      '[tallinn-interest]',
      JSON.stringify({
        experienceSlug: parsed.data.experienceSlug,
        variantId: parsed.data.variantId,
        stored: result.stored,
        duplicate: result.duplicate,
        receiptSent: result.receiptSent,
        operatorNotified: result.operatorNotified,
        error: result.error,
      }),
    )

    if (!result.stored) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Your request was not stored. Please try again or email frank@frankx.ai.',
        },
        { status: 503 },
      )
    }

    return NextResponse.json({
      ok: true,
      reviewMode: false,
      receiptSent: result.receiptSent,
      duplicate: result.duplicate,
      message: result.duplicate
        ? 'This request was already recorded.'
        : 'Your interest is recorded. This is not a ticket or venue confirmation yet.',
    })
  } catch (error) {
    console.error('[tallinn-interest] unexpected error', error)
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
