import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { welcomeEmail2, welcomeEmail3 } from '@/lib/email-templates-welcome'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CRON_SECRET = process.env.CRON_SECRET

interface WelcomeQueueEntry {
  email: string
  name: string
  subscribedAt: string // ISO timestamp
  step1SentAt: string
  step2SentAt?: string
  step3SentAt?: string
}

/**
 * Welcome Sequence Cron Job
 *
 * Runs every 6 hours via Vercel Cron.
 * Checks KV for subscribers due for Day 2 and Day 5 follow-up emails.
 *
 * Queue key: welcome:queue (sorted set, score = subscribedAt timestamp)
 * Entry key: welcome:{email} (hash with sequence state)
 */
export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this header)
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const now = Date.now()
  const TWO_DAYS = 2 * 24 * 60 * 60 * 1000
  const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000

  // Get all active welcome queue entries
  const queueKeys = await kv.keys('welcome:*')
  const entries: { key: string; entry: WelcomeQueueEntry }[] = []

  for (const key of queueKeys) {
    if (key === 'welcome:queue') continue
    const entry = await kv.get<WelcomeQueueEntry>(key)
    if (entry) entries.push({ key, entry })
  }

  let step2Sent = 0
  let step3Sent = 0
  let completed = 0

  for (const { key, entry } of entries) {
    const subscribedAt = new Date(entry.subscribedAt).getTime()
    const age = now - subscribedAt

    // Day 2: send step 2
    if (age >= TWO_DAYS && !entry.step2SentAt) {
      const template = welcomeEmail2({ recipientName: entry.name || 'Creator' })
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Frank <frank@mail.frankx.ai>',
          to: entry.email,
          subject: template.subject,
          html: template.html,
        }),
      })

      if (res.ok) {
        entry.step2SentAt = new Date().toISOString()
        await kv.set(key, entry)
        step2Sent++
      }
    }

    // Day 5: send step 3
    if (age >= FIVE_DAYS && entry.step2SentAt && !entry.step3SentAt) {
      const template = welcomeEmail3({ recipientName: entry.name || 'Creator' })
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Frank <frank@mail.frankx.ai>',
          to: entry.email,
          subject: template.subject,
          html: template.html,
        }),
      })

      if (res.ok) {
        entry.step3SentAt = new Date().toISOString()
        await kv.set(key, entry)
        step3Sent++
      }
    }

    // Completed: all 3 steps sent, remove from queue after 7 days
    if (entry.step3SentAt && age >= 7 * 24 * 60 * 60 * 1000) {
      await kv.del(key)
      completed++
    }
  }

  console.log(`[welcome-sequence] Processed ${entries.length} entries: ${step2Sent} step2, ${step3Sent} step3, ${completed} completed`)

  return NextResponse.json({
    processed: entries.length,
    step2Sent,
    step3Sent,
    completed,
    timestamp: new Date().toISOString(),
  })
}
