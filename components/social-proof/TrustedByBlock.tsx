'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { brandLogos } from '@/data/brand-logos'
import { LogoStrip } from '@/components/ui/LogoStrip'

// Domain-specific accent colors for each platform
const platformAccents: Record<string, { gradient: string; iconBg: string; text: string }> = {
  openai: { gradient: 'from-emerald-500/10 to-teal-500/5', iconBg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  anthropic: { gradient: 'from-orange-500/10 to-amber-500/5', iconBg: 'bg-orange-500/10', text: 'text-orange-400' },
  suno: { gradient: 'from-violet-500/10 to-purple-500/5', iconBg: 'bg-violet-500/10', text: 'text-violet-400' },
  midjourney: { gradient: 'from-blue-500/10 to-indigo-500/5', iconBg: 'bg-blue-500/10', text: 'text-blue-400' },
  perplexity: { gradient: 'from-cyan-500/10 to-teal-500/5', iconBg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  'hugging-face': { gradient: 'from-yellow-500/10 to-amber-500/5', iconBg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  elevenlabs: { gradient: 'from-pink-500/10 to-rose-500/5', iconBg: 'bg-pink-500/10', text: 'text-pink-400' },
  'stability-ai': { gradient: 'from-purple-500/10 to-violet-500/5', iconBg: 'bg-purple-500/10', text: 'text-purple-400' },
  google: { gradient: 'from-blue-500/10 to-green-500/5', iconBg: 'bg-blue-500/10', text: 'text-blue-400' },
  meta: { gradient: 'from-blue-500/10 to-indigo-500/5', iconBg: 'bg-blue-500/10', text: 'text-blue-400' },
}

const defaultAccent = { gradient: 'from-emerald-500/10 to-cyan-500/5', iconBg: 'bg-emerald-500/10', text: 'text-emerald-400' }

export default function TrustedByBlock() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.4em] text-emerald-300/70">
            Built with the leading AI stack
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-3 sm:mt-4">
            Real tools. Real workflows. Real outputs.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 mt-3 sm:mt-4">
            Every logo below links to a dedicated guide showing how the tool fits into our creator
            and intelligence systems.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <LogoStrip
            logos={brandLogos}
            variant="marquee"
            size="md"
            speed={45}
            linkMode="case-study"
          />
        </div>

        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {brandLogos.map((logo) => {
            const accent = platformAccents[logo.slug] || defaultAccent
            return (
              <Link
                key={logo.slug}
                id={logo.caseStudy.anchor}
                href={logo.caseStudy.href}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
              >
                {/* Glassmorphic gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Subtle glow effect on hover */}
                <div className="absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />

                <div className="relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Enhanced logo container with platform-specific accent */}
                    <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 ${accent.iconBg} backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/20`}>
                      <Image
                        src={logo.logo}
                        alt={`${logo.name} logo`}
                        width={64}
                        height={32}
                        className={`h-6 sm:h-7 w-auto object-contain ${
                          logo.treatment === 'mono' ? 'opacity-90' : 'opacity-95'
                        } transition-opacity group-hover:opacity-100`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50 mb-1">
                        {logo.name}
                      </p>
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-white transition-colors">
                        {logo.caseStudy.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/55 leading-relaxed group-hover:text-white/70 transition-colors">
                    {logo.caseStudy.summary}
                  </p>

                  {/* Enhanced CTA with arrow animation */}
                  <div className={`mt-4 sm:mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${accent.text} transition-all duration-300`}>
                    <span className="group-hover:underline underline-offset-2">{logo.caseStudy.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
