import { redirect } from 'next/navigation'

export const metadata = {
  title: 'AIS — Ana Intelligence System',
  description: 'Canonical alias for /ana-intelligence-system/. Permanent redirect (308).',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://frankx.ai/ana-intelligence-system/' },
}

export default function AisAliasRedirect() {
  redirect('/ana-intelligence-system/')
}
