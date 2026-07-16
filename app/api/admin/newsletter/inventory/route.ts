import { NextResponse } from 'next/server'
import { getNewsletterInventory } from '@/lib/newsletter/intelligence/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(getNewsletterInventory())
}
