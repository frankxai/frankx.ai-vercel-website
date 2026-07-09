import { type NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_SECRET) {
      return NextResponse.json({ error: 'Admin access not configured' }, { status: 503 })
    }

    const { password } = await request.json()

    if (password === ADMIN_SECRET) {
      return NextResponse.json({ success: true, token: ADMIN_SECRET })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
