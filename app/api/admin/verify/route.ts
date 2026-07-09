import { type NextRequest, NextResponse } from 'next/server'
import { verifyAdminSecret } from '@/lib/admin-secret'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_SECRET) {
      return NextResponse.json({ error: 'Admin access not configured' }, { status: 503 })
    }

    const { password } = await request.json()
    const candidate = typeof password === 'string' ? password : ''

    if (verifyAdminSecret(candidate, ADMIN_SECRET)) {
      return NextResponse.json({ success: true, token: ADMIN_SECRET })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
