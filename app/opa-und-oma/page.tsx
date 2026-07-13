import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Privates Familienportal',
  description: 'Familieninhalte wurden in den geschützten Portalbereich verschoben.',
  robots: { index: false, follow: false, nocache: true },
}

export default function RetiredGrandparentsPage() {
  redirect('/familie')
}
