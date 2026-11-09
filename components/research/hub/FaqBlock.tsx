import { researchHubFaqs } from '@/lib/research/hubs'

/**
 * About the research. The same three entries feed the FAQPage JSON-LD in
 * app/research/page.tsx; keep both reading from the registry.
 */
export default function FaqBlock() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 border-b border-white/[0.08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">About</p>
          <h2
            id="faq-title"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            About the research
          </h2>
        </div>
        <dl className="mt-8 grid gap-8 md:grid-cols-3">
          {researchHubFaqs.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-sm font-semibold text-white">{item.q}</dt>
              <dd className="mt-3 text-sm leading-6 text-white/60">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
