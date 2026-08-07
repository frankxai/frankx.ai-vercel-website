import { NextResponse } from 'next/server'
import leadMagnets from '@/data/lead-magnets.json'
import { addAudienceContact, sendEmail } from '@/lib/resend-audience'

const SITE = 'https://frankx.ai'

type LeadMagnet = {
  id: string
  title: string
  slug: string
  status: string
  pdfUrl?: string
}

function deliveryEmail(title: string, pdfUrl: string) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#16181d;">
      <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Here's your copy of <strong>${title}</strong>.</p>
      <p style="margin:0 0 28px;">
        <a href="${SITE}${pdfUrl}" style="display:inline-block;background:#16181d;color:#fff;font-weight:600;padding:12px 22px;text-decoration:none;border-radius:6px;">Download the PDF</a>
      </p>
      <p style="font-size:14px;line-height:1.6;color:#464c58;margin:0 0 24px;">
        If the button doesn't work, use this link:<br />
        <a href="${SITE}${pdfUrl}" style="color:#464c58;">${SITE}${pdfUrl}</a>
      </p>
      <p style="font-size:13px;color:#6a7180;border-top:1px solid #e4e7ec;padding-top:16px;margin:0;">
        Frank Riemer &middot; <a href="${SITE}" style="color:#6a7180;">frankx.ai</a>
      </p>
    </div>`
}

export async function POST(request: Request) {
  try {
    const { email, leadMagnetId, name } = await request.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const magnet = (leadMagnets as LeadMagnet[]).find((m) => m.id === leadMagnetId)
    if (!magnet) {
      return NextResponse.json({ error: 'Unknown lead magnet' }, { status: 404 })
    }
    const cleanEmail = email.toLowerCase().trim()
    const contact = await addAudienceContact(cleanEmail, name)
    if (!contact.ok) {
      console.error('[lead-ingest] Resend audience error:', contact.error)
      return NextResponse.json({ error: 'Could not complete signup. Please try again.' }, { status: 502 })
    }

    // A magnet whose asset is not built yet still captures the subscriber, but it
    // must not claim a download that does not exist.
    if (magnet.status !== 'published' || !magnet.pdfUrl) {
      return NextResponse.json({ success: true, pending: true })
    }

    // The download is already unlocked in the response; the email is the durable
    // copy, so a send failure must not fail the request.
    sendEmail(cleanEmail, `Your copy of ${magnet.title}`, deliveryEmail(magnet.title, magnet.pdfUrl)).catch(
      (err) => console.error('[lead-ingest] delivery email failed:', err)
    )

    return NextResponse.json({ success: true, pending: false, pdfUrl: magnet.pdfUrl })
  } catch (error) {
    console.error('[lead-ingest] error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}
