import { siteConfig } from '@/lib/seo'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'SIS — Starlight Intelligence System',
  description: 'Canonical alias for /starlight-intelligence-system/. Permanent redirect (308).',
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.url}/starlight-intelligence-system/` },
}

export default function SisAliasRedirect() {
  redirect('/starlight-intelligence-system/')
}
