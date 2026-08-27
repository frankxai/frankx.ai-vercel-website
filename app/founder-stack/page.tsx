import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { FounderStackAssessment } from '@/components/founder-stack/FounderStackAssessment'
import JsonLd from '@/components/seo/JsonLd'
import { founderLayers } from '@/lib/founder-stack'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Founder Stack Map',
  description:
    'A private, ten-question map for founders. Identify the constraint across State, Signal, Systems, Scale, and Stewardship, then choose the next useful move.',
  path: '/founder-stack',
  keywords: [
    'founder assessment',
    'founder operating system',
    'founder stack',
    'AI founder systems',
    'solopreneur operating system',
    'founder performance',
  ],
})

const founderStackSchema = {
  '@id': `${siteConfig.url}/founder-stack#page`,
  name: 'Founder Stack Map',
  description:
    'A ten-question self-assessment across State, Signal, Systems, Scale, and Stewardship.',
  url: `${siteConfig.url}/founder-stack`,
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': `${siteConfig.url}/#frank-riemer` },
}

export default function FounderStackPage() {
  return (
    <main tabIndex={-1} className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd
        type="WebPage"
        data={founderStackSchema}
        id="founder-stack-schema"
      />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_14%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_12%_0%,rgba(6,182,212,0.06),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 lg:pb-20 lg:pt-32">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              Founder Stack Map · Private by default
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Find the constraint.
              <span className="block text-white/55">
                Then make the next move count.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
              Ten questions map your current operating reality across five
              founder layers. The result appears in your browser. Nothing is
              stored unless you choose to join the field notes afterward.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/55">
              <span>About four minutes</span>
              <span>No account</span>
              <span>No medical or personality diagnosis</span>
              <span>Immediate result</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" aria-labelledby="assessment-title">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 id="assessment-title" className="sr-only">
            Founder Stack assessment
          </h2>
          <FounderStackAssessment />
        </div>
      </section>

      <section
        className="border-t border-white/[0.07] bg-[#0c0e0e] py-20"
        aria-labelledby="layers-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-300/70">
                The model
              </p>
              <h2
                id="layers-title"
                className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Five layers. One operating reality.
              </h2>
              <p className="mt-6 text-base leading-7 text-white/65">
                Founder is the avatar. Entrepreneur, solopreneur, and coach
                describe the company shape—not a different person to write for.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {founderLayers.map((layer) => (
                <article
                  key={layer.key}
                  className="grid gap-3 py-5 sm:grid-cols-[70px_1fr]"
                >
                  <p className="font-mono text-[10px] text-emerald-300/75">
                    {layer.number}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {layer.name}{' '}
                      <span className="font-normal text-white/42">
                        — {layer.short}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {layer.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300"
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-white">
                A decision aid, not a diagnosis.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                The map organizes reflection and routes you to relevant FrankX
                work. It does not assess mental health, predict business
                outcomes, or replace medical, financial, or legal advice.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/human-layer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/70 underline decoration-white/25 underline-offset-8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Read how the Human Layer is governed
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
