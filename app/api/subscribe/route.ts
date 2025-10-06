import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple JSON file storage for MVP (replace with proper DB later)
const SUBSCRIBERS_FILE = join(process.cwd(), 'data', 'subscribers.json')

async function getSubscribers() {
  try {
    const data = await readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function saveSubscriber(email: string, name?: string, product?: string) {
  const subscribers = await getSubscribers()

  // Check if already subscribed
  if (subscribers.find((s: any) => s.email === email)) {
    return { alreadySubscribed: true }
  }

  subscribers.push({
    email,
    name: name || '',
    product: product || 'general',
    subscribedAt: new Date().toISOString(),
  })

  await writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, product } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Save to simple JSON file
    const result = await saveSubscriber(email, name, product)

    if (result.alreadySubscribed) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      )
    }

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Frank <hello@frankx.ai>',
          to: email,
          subject: 'Welcome to FrankX Intelligence Systems',
          html: `
            <h1>Welcome ${name || 'Creator'}!</h1>
            <p>Thanks for joining the FrankX community. You're now part of a growing movement of AI architects and conscious creators.</p>
            <h2>What's Next?</h2>
            <ul>
              <li><a href="https://frankx.ai/products/intelligence-systems">Explore Intelligence Systems</a> - Prompt packs, tool recommendations, and automation blueprints</li>
              <li><a href="https://frankx.ai/products/vibe-os">Check out Vibe OS</a> - Suno music workflows and consciousness tech</li>
              <li><a href="https://frankx.ai/music-lab">Listen to Frank's 500+ Songs</a> - Get inspired by AI-human collaboration</li>
            </ul>
            <p>I'll be in touch soon with your first intelligence pack.</p>
            <p>-Frank<br><em>Oracle AI Architect & Music Creator</em></p>
          `,
        })
      } catch (emailError) {
        console.error('Email send failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for next steps.',
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
