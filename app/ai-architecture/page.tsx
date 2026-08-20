import { OfficialArchitectureAtlas } from '@/components/ai-architecture/OfficialArchitectureAtlas'
import { PillarGuide, pillarFaqs } from '@/components/ai-architecture/pillar/PillarGuide'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'

const CANONICAL = 'https://www.frankx.ai/ai-architecture'

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
    <>
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
    </>
  )
}
