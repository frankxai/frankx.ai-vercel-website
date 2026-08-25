import { OfficialArchitectureAtlas } from '@/components/ai-architecture/OfficialArchitectureAtlas'
import RunItCta from '@/components/ai-architecture/RunItCta'
import { PillarGuide, pillarFaqs } from '@/components/ai-architecture/pillar/PillarGuide'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'

const CANONICAL = 'https://www.frankx.ai/ai-architecture'

// Article-shaped metadata belongs to the hub alone. Kept off the segment layout
// so the client-rendered catalog children do not inherit og:type=article and the
// hub's modified date.
export const metadata = createMetadata({
  title: 'AI Architecture: The Field Guide to Production Agent Systems',
  description:
    'How to structure a system that calls a language model: the seven planes, choosing between workflow and agent, the 2026-07-28 MCP revision, the OWASP GenAI LLM Top 10 2026, and where these systems actually break.',
  path: '/ai-architecture',
  type: 'article',
  updatedTime: '2026-08-25',
})

const CONTENTS = [
  { href: '#what-is-ai-architecture', label: 'What it is' },
  { href: '#reference-stack', label: 'The seven planes' },
  { href: '#choosing-a-shape', label: 'Workflow or agent' },
  { href: '#protocol-layer', label: 'Protocol layer' },
  { href: '#security-baseline', label: 'Security baseline' },
  { href: '#failure-modes', label: 'Failure modes' },
  { href: '#contested', label: 'Contested ground' },
  { href: '#faq', label: 'FAQ' },
  { href: '#keep-reading', label: 'Reading path' },
]

export default function AIArchitecturePage() {
  return (
    <main>
      <JsonLd
        type="BreadcrumbList"
        id="ai-architecture-breadcrumbs"
        data={{
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'FrankX', item: 'https://www.frankx.ai' },
            { '@type': 'ListItem', position: 2, name: 'AI architecture', item: CANONICAL },
          ],
        }}
      />
      <FAQPageJsonLd faqs={pillarFaqs} id="ai-architecture-faq" />

      <OfficialArchitectureAtlas />

      <nav
        aria-label="Field guide contents"
        className="border-t border-white/5 px-6 py-10"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
            The field guide
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CONTENTS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="surface-2 inline-block rounded-full border border-white/[0.1] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-emerald-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <PillarGuide />

      {/*
        The field guide gives readers a seven-plane system map. The review is the
        next action: it asks four explicit questions about the hardest decisions to
        reverse and turns the answers into a fix-first verdict.
      */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs text-emerald-300">Run it</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Seven planes map the system. Four decisions produce a verdict.
          </h2>
          <p className="mt-5 leading-7 text-slate-400">
            The architecture review asks four questions about the decisions that are expensive to
            reverse. Answer them for your own system and you get a report naming which are made,
            which are still open, and which to close first — or install the same rubric into the
            coding agent that already has the repository open, and let it grep for the evidence
            instead of asking you.
          </p>
          <RunItCta />
        </div>
      </section>
    </main>
  )
}
