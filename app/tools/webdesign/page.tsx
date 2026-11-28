import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import { WebdesignArchitectClient } from './WebdesignArchitectClient'

export const metadata = createMetadata({
  title: 'Self-Service Webdesign Architect — Export Static HTML, Tokens & AX Kit',
  description:
    'In-browser website architect for founders and creators. Choose a design system, inspect desktop and mobile views, run anti-slop & JSON-LD checks, and download a clean .zip bundle.',
  path: '/tools/webdesign',
})

export default function WebdesignToolPage() {
  return (
    <main className="min-h-screen bg-void pt-24 pb-20 text-white">
      <JsonLd
        type="WebPage"
        data={{
          name: 'FrankX Self-Service Webdesign Architect',
          description:
            'Browser-based static site and design-token generator emitting clean HTML, DESIGN.md, llms.txt, robots.txt, and Schema.org JSON-LD.',
          url: 'https://www.frankx.ai/tools/webdesign',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Webdesign Architect', href: '/tools/webdesign' },
          ]}
        />

        <header className="mb-12 max-w-3xl">
          <p className="font-mono text-xs text-emerald-300">Instrument 05 · Zero Account Required</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Self-Service Webdesign Architect
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Configure a clean site archetype, test four high-contrast design token systems at desktop and
            mobile sizes, verify editorial quality, and download a standalone static bundle.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-400">
            <Link href="/tools/skill-composer" className="text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              Pair this with AI Skill &amp; Stack Composer →
            </Link>
            <Link href="/tools" className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              All studio instruments
            </Link>
          </div>
        </header>

        <WebdesignArchitectClient />
      </div>
    </main>
  )
}
