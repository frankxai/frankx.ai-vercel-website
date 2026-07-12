import type { ReactNode } from 'react'
import { requireFamilySession } from '@/lib/familie/require-family-session'

export const dynamic = 'force-dynamic'

export default async function PrivateEnglishFamilyTreeLayout({ children }: { children: ReactNode }) {
  await requireFamilySession()
  return children
}
