import { NextRequest, NextResponse } from 'next/server'
import { getAllAccounts, getActiveAccounts, getAccountsByPlatform } from '@/lib/content-studio/posts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const platform = searchParams.get('platform')

    let accounts

    if (active === 'true') {
      accounts = getActiveAccounts()
    } else if (platform) {
      accounts = getAccountsByPlatform(platform)
    } else {
      accounts = getAllAccounts()
    }

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error('[Content Studio API] GET accounts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    )
  }
}
