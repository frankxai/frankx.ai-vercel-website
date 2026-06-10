import { type NextRequest, NextResponse } from 'next/server'
import { getAdminSecret, safeEqual } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const secret = getAdminSecret()
    if (!secret) {
      return NextResponse.json(
        { error: 'Admin access is not configured (ADMIN_SECRET unset).' },
        { status: 503 }
      )
    }

    const { password } = await request.json()

    // The admin supplied this password; returning it as the session token is the
    // existing contract (command-center stores it and replays it as x-admin-secret).
    if (typeof password === 'string' && safeEqual(password, secret)) {
      return NextResponse.json({ success: true, token: secret })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
