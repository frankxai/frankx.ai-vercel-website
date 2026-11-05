import { siteConfig } from '@/lib/seo'
import type { Metadata } from 'next'
import { SocialCockpitDashboard } from '@/components/studio/SocialCockpitDashboard'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Social Swarm Cockpit — Starlight',
  description:
    'Sovereign Social Media Command Suite. Coordinate cognitive swarm node pipelines, audit hooks, and automate comment-to-DM routing loops locally without SaaS API fees.',
  alternates: { canonical: `${siteConfig.url}/studio/social` },
}

export default function StudioSocialPage() {
  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white pt-24 pb-16">
      <SocialCockpitDashboard />
    </main>
  )
}
