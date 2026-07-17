import { NextRequest, NextResponse } from 'next/server'
import auctions from '@/data/auctions.json'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || process.env.RESEND_FROM_EMAIL || 'frank@frankx.ai'

export async function POST(request: NextRequest) {
  try {
    const { name, email, auctionId, bidAmount, proposal } = await request.json()

    // Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!auctionId || typeof auctionId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid auction identifier.' },
        { status: 400 }
      )
    }

    const parsedBid = parseFloat(bidAmount)
    if (isNaN(parsedBid) || parsedBid <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid bid amount greater than 0.' },
        { status: 400 }
      )
    }

    if (!proposal || typeof proposal !== 'string' || proposal.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please share a brief description of your needs and situation (at least 20 characters).' },
        { status: 400 }
      )
    }

    // Resolve the auction item
    const auction = auctions.find(a => a.id === auctionId)
    if (!auction) {
      return NextResponse.json(
        { error: 'The specified auction item could not be found.' },
        { status: 404 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    // 1. Add applicant/bidder to Resend audience
    const contactResponse = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          first_name: name.trim(),
          unsubscribed: false,
        }),
      }
    )

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json()
      console.error('Resend contact creation error:', errorData)
      // 409 Conflict = already exists, which is acceptable
      if (contactResponse.status !== 409) {
        return NextResponse.json(
          { error: 'Failed to process contact details. Please try again.' },
          { status: 500 }
        )
      }
    }

    // 2. Email Frank with bid & proposal details
    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 24px; color: #ffffff;">New Silent Bid / Proposal Received</h1>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; width: 120px; vertical-align: top;">Item</td>
        <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${auction.title}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Name</td>
        <td style="padding: 8px 0; color: #ffffff;">${name.trim()}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Email</td>
        <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email.trim()}" style="color: #AB47C7;">${email.trim()}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Bid Amount</td>
        <td style="padding: 8px 0; color: #22c55e; font-size: 18px; font-weight: bold;">$${parsedBid}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Proposal / Needs</td>
        <td style="padding: 8px 0; color: #ffffff; white-space: pre-wrap;">${proposal.trim()}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="mailto:${email.trim()}" style="display: inline-block; background: linear-gradient(to right, #AB47C7, #43BFE3); color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600;">Reply to Bidder</a>
    </div>
  </div>
</body>
</html>`

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `Silent Bid: ${name.trim()} — $${parsedBid} on ${auction.title}`,
        html: emailHtml,
        reply_to: email.trim(),
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Resend notify email error:', errorData)
    }

    // 3. Send confirmation email to bidder
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 24px; margin: 0 0 16px; color: #ffffff;">Proposal Received</h1>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 16px;">
      Hi ${name.trim().split(' ')[0]}, thanks for submitting your proposal and silent bid of $${parsedBid} for <strong>${auction.title}</strong>.
    </p>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 24px;">
      I review every proposal personally to ensure we are aligned. If your proposal is selected, I'll get back to you with the next steps to coordinate.
    </p>
    <p style="color: #64748b; font-size: 14px; margin: 0;">
      — Frank Riemer
    </p>
  </div>
</body>
</html>`

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email.trim(),
        subject: `Your proposal for ${auction.title} has been received`,
        html: confirmationHtml,
      }),
    }).catch((err) => console.error('Confirmation email error:', err))

    return NextResponse.json({
      success: true,
      message: 'Bid and proposal submitted successfully.',
    })
  } catch (error) {
    console.error('Silent bid submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
