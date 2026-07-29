import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { AcceleratorApplicationForm } from '@/components/accelerator/AcceleratorApplicationForm'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'
import { ACCELERATOR_FAQS } from '@/lib/accelerator-faqs'

export const metadata: Metadata = {
  title: 'FrankX Accelerator — Venture Fabric for AI-Native Programs',
  description:
    'The accelerator for accelerators: shared intelligence systems, diligence workflows, agent swarms, and Day-0 founder OS kits programs install across every portfolio company. Software and operations — humans approve capital.',
  alternates: { canonical: 'https://frankx.ai/accelerator' },
  openGraph: {
    title: 'FrankX Accelerator — Venture Fabric',
    description:
      'Equip accelerators and VCs with Portfolio OS: intelligence, swarms, and founder operating systems. No autonomous investing.',
    url: 'https://frankx.ai/accelerator',
    images: [
      {
        url: '/images/blog/agentic-os-family-hero.png',
        width: 1200,
        height: 675,
        alt: 'Agentic OS architecture — Venture Fabric metaphor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrankX Accelerator — Venture Fabric',
    description: 'Infrastructure for AI-native accelerators and portfolio operators.',
    images: ['/images/blog/agentic-os-family-hero.png'],
  },
}

const routes = [
  {
    title: 'Programs & funds',
    body: 'Install Portfolio OS: diligence fabric, program memory, agent swarms, and Day-0 kits for every company.',
    href: '/accelerator/portfolio-os',
    cta: 'Explore Portfolio OS',
    color: 'cyan' as const,
  },
  {
    title: 'Founders & operators',
    body: 'You need one business OS, not a multi-tenant fund stack. Start at the Foundry.',
    href: '/accelerator/founders',
    cta: 'Founder route',
    color: 'emerald' as const,
  },
  {
    title: 'Starlight thesis',
    body: 'Systems, agentic companies, CoE, and B2B infrastructure brands under Starlight.',
    href: '/accelerator/starlight',
    cta: 'Starlight track',
    color: 'violet' as const,
  },
  {
    title: 'Arcanea thesis',
    body: 'Creative intelligence, media, worldbuilding, and taste-heavy portfolio skins.',
    href: '/accelerator/arcanea',
    cta: 'Arcanea track',
    color: 'amber' as const,
  },
]

const layers = [
  {
    n: 'L1',
    title: 'Founder surface',
    body: 'Foundry installs one AI-native OS into one business — website, harness, gates, memory.',
    href: '/foundry',
  },
  {
    n: 'L2',
    title: 'Portfolio surface',
    body: 'Portfolio OS equips the whole program so amplification is software, not only office hours.',
    href: '/accelerator/portfolio-os',
  },
  {
    n: 'L3',
    title: 'Capital brands (later)',
    body: 'Starlight Accelerator and Arcanea Accelerator name capital theses when proof and structure exist — not day-one marketing claims.',
    href: '/accelerator/guide',
  },
]

const stack = [
  {
    name: 'Starlight Intelligence System',
    href: 'https://github.com/frankxai/Starlight-Intelligence-System',
    note: 'Substrate: memory, skills, governance, multi-harness fleets.',
  },
  {
    name: 'agentic-investor-os',
    href: 'https://github.com/frankxai/agentic-investor-os',
    note: 'Thesis → intake → diligence → memo → portfolio support (human gates).',
  },
  {
    name: 'agentic-business-os',
    href: 'https://github.com/frankxai/agentic-business-os',
    note: 'Day-0 business OS kits programs issue to startups.',
  },
  {
    name: 'agentic-creator-os',
    href: 'https://github.com/frankxai/agentic-creator-os',
    note: 'Creator-native packs for content, product, and media founders.',
  },
]

export default function AcceleratorHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Accelerator',
            item: 'https://frankx.ai/accelerator',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'FrankX Accelerator — Venture Fabric',
        url: 'https://frankx.ai/accelerator',
        provider: { '@type': 'Person', name: 'Frank', url: 'https://frankx.ai' },
        description:
          'Agentic infrastructure for accelerators and portfolio operators: shared intelligence, diligence workflows, agent swarms, and founder OS kits. Not automated investing.',
        areaServed: 'Worldwide',
      },
      {
        '@type': 'FAQPage',
        mainEntity: ACCELERATOR_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AcceleratorSubnav active="/accelerator" />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
          FrankX Accelerator · Venture Fabric
        </p>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          The accelerator for accelerators.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          Give every portfolio company a shared intelligence system, agent swarms, diligence
          workflows, and a Day-0 operating system — the same agentic architecture that runs frankx.ai,
          packaged so programs amplify startups without inventing a platform team from scratch.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#apply"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Apply for a program pilot
          </Link>
          <Link
            href="/accelerator/portfolio-os"
            className="px-2 py-3.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            Portfolio OS details
          </Link>
          <Link
            href="/foundry"
            className="px-2 py-3.5 text-sm font-semibold text-emerald-400/80 transition-colors hover:text-emerald-300"
          >
            I&apos;m a founder → Foundry
          </Link>
        </div>
        <p className="mt-8 font-mono text-xs text-white/45">
          Software + operations · human capital gates · no return promises · open-core modules on
          GitHub
        </p>
      </section>

      <section className="border-t border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
            Choose your route
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Connected surfaces. One fabric.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {routes.map((r) => (
              <GlowCard key={r.href} color={r.color} href={r.href} className="p-7">
                <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{r.body}</p>
                <p className="mt-4 text-sm font-semibold text-white/80">{r.cta} →</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
            Architecture
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Three layers. Don&apos;t collapse them.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {layers.map((l) => (
              <GlowCard key={l.n} color="white" href={l.href} className="p-7">
                <p className="font-mono text-xs text-cyan-400/70">{l.n}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{l.body}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
            Open modules
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Verify the stack. Then apply for the install.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stack.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
              >
                <a
                  href={s.href}
                  rel="noopener"
                  className="font-mono text-sm text-cyan-300 hover:underline"
                >
                  {s.name}
                </a>
                <p className="mt-2 text-sm text-white/55">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/50">
            Operating model write-up:{' '}
            <Link href="/accelerator/guide" className="text-cyan-400 hover:underline">
              /accelerator/guide
            </Link>
            . Single-business installs remain at{' '}
            <Link href="/foundry" className="text-emerald-400 hover:underline">
              /foundry
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="apply" className="border-t border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
            Apply
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Program pilots only. Read personally.
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/60">
            Tell us what you run and what a 90-day pilot should improve. Pricing follows evaluation.
            Founders who need one OS should{' '}
            <Link href="/foundry" className="text-emerald-400 hover:underline">
              apply to Foundry
            </Link>{' '}
            instead.
          </p>
          <div className="mt-10">
            <AcceleratorApplicationForm />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Straight answers.
          </h2>
          <div className="mt-12 space-y-10">
            {ACCELERATOR_FAQS.map((f) => (
              <div key={f.question}>
                <h3 className="text-base font-semibold text-white">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
