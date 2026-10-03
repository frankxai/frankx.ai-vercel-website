import Script from 'next/script'
import Link from 'next/link'

import products from '@/data/products.json'
import { createMetadata, siteConfig } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

// Premium Vibe OS Components
import VibeOSHero from './components/VibeOSHero'
import VibeOSModules from './components/VibeOSModules'
import VibeOSFAQ from './components/VibeOSFAQ'
import VibeOSFinalCTA from './components/VibeOSFinalCTA'

const product = products.find((entry) => entry.id === 'vibe-os') as ProductRecord

if (!product) {
  throw new Error('Vibe OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} concept | FrankX`,
  description: 'Preview the unreleased Vibe OS workspace concept and try a manual experiment.',
  path: `/products/${product.slug}`,
  keywords: [
    'vibe os',
    'creative state management',
    'energy tracking',
    'creative workflow',
    'productivity for creators',
    'focus management',
    'creative energy',
    'workflow optimization',
    'creative-state concept'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: product.name,
  description: 'A preview of the unreleased Vibe OS workspace concept.',
  url: `${siteConfig.url}/products/vibe-os`,
  image: 'https://frankx.ai/images/products/vibe-os-hero.jpg',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  }
}

export default function VibeOSPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(16,185,129,0.06),transparent_35%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <VibeOSHero productId={productId} product={product} />

        <VibeOSModules
          modules={product.modules}
        />

        {/* Use Cases Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-void via-space/50 to-void" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <span className="glow-badge glow-badge-cyan mb-4 inline-flex">
                Ways to test the idea
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Three places to start observing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                These are suggested experiments, not reported customer results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Writers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Note when focused writing feels easiest and compare that observation with your project schedule.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Musicians</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Record the conditions around music sessions and look for patterns worth testing later.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Designers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Separate observations about focus from project notes when planning studio and client work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <VibeOSFAQ faq={[
          {
            question: 'What is available now?',
            answer: 'The concept notes and manual experiment are available on this site. The web app and workspace template are not publicly available.',
          },
          {
            question: 'Can I try the idea without the app?',
            answer: 'Yes. The concept notes explain a manual experiment you can run in a private note or spreadsheet. It is not a Vibe OS app or template.',
          },
          {
            question: 'Is there a launch date or paid offer?',
            answer: 'No launch date, checkout, or paid Vibe OS offer is published on this page.',
          },
        ]} />

        <p className="mx-auto max-w-2xl px-6 pb-8 text-center text-sm leading-6 text-white/60">
          Looking for the separate music resource? The{' '}
          <Link href="/downloads/preview/vibe-os" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
            Vibe OS Music Guide
          </Link>{' '}
          remains available. It is not the creative-state workspace.
        </p>

        <VibeOSFinalCTA productId={productId} />
      </div>

      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </main>
  )
}
