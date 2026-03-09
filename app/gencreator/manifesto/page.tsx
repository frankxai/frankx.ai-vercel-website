import Script from 'next/script'
import { ArrowRight, Compass } from 'lucide-react'

import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { manifestoLines } from '@/lib/gencreator/gencreator-data'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The GenCreator Manifesto',
  description: 'A declaration of what it means to be a generative creator. Human taste. Machine scale. Permanent artifacts.',
  author: { '@type': 'Person', name: 'Frank Guzman', url: 'https://frankx.ai' },
  url: 'https://frankx.ai/gencreator/manifesto',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Full-bleed Manifesto ─── */}
      <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden py-20">
        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-[#02030b] to-teal-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(20,184,166,0.06),transparent_50%)]" />

        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.5em] text-emerald-300/60">
            Manifesto
          </div>

          <div className="space-y-6">
            {manifestoLines.map((line, i) => (
              <p
                key={i}
                className={
                  line.emphasis
                    ? 'text-2xl font-bold leading-relaxed text-white sm:text-3xl md:text-4xl'
                    : 'text-lg leading-relaxed text-white/60 sm:text-xl'
                }
              >
                {line.text}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-16 border-t border-white/[0.08] pt-8">
            <p className="text-sm text-white/30">
              Written by Frank Guzman &middot; frankx.ai &middot; 2026
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/principles">
              <Compass className="h-5 w-5" />
              Explore the Principles
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="manifesto-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
