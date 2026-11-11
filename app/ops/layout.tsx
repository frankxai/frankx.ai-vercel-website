import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { verifyAdminSecret } from '@/lib/admin-secret'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const secret = process.env.ADMIN_SECRET
  const candidate = (await headers()).get('x-admin-secret')
  if (!secret || !candidate || !verifyAdminSecret(candidate, secret)) notFound()
  return children
}
