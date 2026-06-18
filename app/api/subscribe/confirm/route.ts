import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL, updateResendContact, verifyEmailToken } from '@/lib/email-config'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email') || ''
  const token = url.searchParams.get('token') || ''
  const redirectUrl = new URL('/newsletter/confirm', SITE_URL)

  if (!email || !verifyEmailToken(email, 'confirm', token)) {
    redirectUrl.searchParams.set('status', 'invalid')
    return NextResponse.redirect(redirectUrl)
  }

  const result = await updateResendContact(email, false)
  redirectUrl.searchParams.set('status', result.ok ? 'confirmed' : 'error')

  if (!result.ok) {
    redirectUrl.searchParams.set('reason', result.reason)
  }

  return NextResponse.redirect(redirectUrl)
}
