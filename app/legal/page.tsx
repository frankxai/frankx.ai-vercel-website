import Link from 'next/link'
import { FileText, Shield, Scale, Accessibility, Heart, Cookie } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Legal | FrankX.ai',
  description: 'Legal information including privacy policy, terms of service, and compliance disclosures.',
  path: '/legal',
})

const legalPages = [
  {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information.',
    href: '/privacy',
    icon: Shield,
  },
  {
    title: 'Terms of Service',
    description: 'Terms and conditions for using FrankX.ai and purchasing products.',
    href: '/terms',
    icon: FileText,
  },
  {
    title: 'Affiliate Disclosure',
    description: 'Our affiliate partnerships and how they work.',
    href: '/legal/affiliate-disclosure',
    icon: Heart,
  },
  {
    title: 'DMCA & Copyright',
    description: 'How to report copyright infringement and our takedown process.',
    href: '/legal/dmca',
    icon: Scale,
  },
  {
    title: 'Accessibility',
    description: 'Our commitment to making FrankX.ai accessible to everyone.',
    href: '/legal/accessibility',
    icon: Accessibility,
  },
  {
    title: 'Cookie Policy',
    description: 'What cookies we use and how to manage your preferences.',
    href: '/privacy#cookies',
    icon: Cookie,
  },
]

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Legal</h1>
        <p className="mb-10 text-sm text-white/50">
          Transparency matters. Here you&apos;ll find all our legal documents and compliance disclosures.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {legalPages.map((page) => {
            const Icon = page.icon
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-base font-semibold text-white">{page.title}</h2>
                <p className="mt-1 text-sm text-white/50">{page.description}</p>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-2 text-base font-semibold text-white">AI-Generated Content Notice</h2>
          <p className="text-sm text-white/60">
            Some content on FrankX.ai is created with AI assistance — including music (Suno AI),
            images (AI generation models), and written content (AI writing tools). All AI-generated
            content is reviewed and curated by humans. Third-party trademarks referenced on this
            site belong to their respective owners and do not imply endorsement or affiliation.
          </p>
        </div>

        <p className="mt-8 text-xs text-white/30">
          For legal inquiries, contact{' '}
          <a href="mailto:hello@frankx.ai" className="text-white/50 underline hover:text-white/70">
            hello@frankx.ai
          </a>
        </p>
      </div>
    </main>
  )
}
